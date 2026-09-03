"""Portfolio website on one Spot EC2 instance managed by ECS."""

from aws_cdk import (
    CfnParameter,
    Duration,
    Fn,
    RemovalPolicy,
    Stack,
    Tags,
    aws_autoscaling as autoscaling,
    aws_ec2 as ec2,
    aws_ecs as ecs,
    aws_elasticloadbalancingv2 as elbv2,
    aws_iam as iam,
    aws_route53 as route53,
)
from constructs import Construct

from . import existing_resources


class PortfolioStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        image_tag = CfnParameter(self, "ImageTag", default="latest").value_as_string

        alias_record = route53.CfnRecordSet(
            self,
            "PortfolioAliasRecordResource",
            hosted_zone_id=Fn.import_value("SharedPortfolioHostedZoneId"),
            name=f"{existing_resources.PRODUCTION_HOST}.",
            type="A",
            alias_target=route53.CfnRecordSet.AliasTargetProperty(
                dns_name=Fn.join(
                    "",
                    [
                        "dualstack.",
                        Fn.import_value("SharedLoadBalancerDnsName"),
                        ".",
                    ],
                ),
                hosted_zone_id=Fn.import_value(
                    "SharedLoadBalancerCanonicalHostedZoneId"
                ),
                evaluate_target_health=True,
            ),
        )
        alias_record.override_logical_id("PortfolioAliasRecord")
        alias_record.apply_removal_policy(RemovalPolicy.RETAIN)

        vpc = ec2.Vpc.from_vpc_attributes(
            self,
            "SharedVpc",
            vpc_id=Fn.import_value("SharedVpcId"),
            availability_zones=[
                Fn.import_value("SharedPublicSubnet1AvailabilityZone")
            ],
            public_subnet_ids=[Fn.import_value("SharedPublicSubnet1Id")],
        )

        cluster = ecs.Cluster(
            self,
            "PortfolioCluster",
            vpc=vpc,
            container_insights_v2=ecs.ContainerInsights.DISABLED,
        )

        execution_role = iam.Role(
            self,
            "TaskExecutionRole",
            assumed_by=iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AmazonECSTaskExecutionRolePolicy"
                )
            ],
        )
        task_definition = ecs.Ec2TaskDefinition(
            self,
            "TaskDefinition",
            execution_role=execution_role,
            network_mode=ecs.NetworkMode.AWS_VPC,
        )

        image_uri = Fn.join(
            "", [Fn.import_value("PortfolioRepositoryUri"), ":", image_tag]
        )
        task_definition.add_container(
            "NginxContainer",
            image=ecs.ContainerImage.from_registry(image_uri),
            cpu=128,
            memory_limit_mib=256,
            essential=True,
            port_mappings=[ecs.PortMapping(container_port=80)],
            logging=ecs.LogDrivers.aws_logs(stream_prefix="portfolio"),
        )

        service = ecs.Ec2Service(
            self,
            "PortfolioService",
            cluster=cluster,
            task_definition=task_definition,
            desired_count=1,
            min_healthy_percent=0,
            max_healthy_percent=100,
            circuit_breaker=ecs.DeploymentCircuitBreaker(rollback=True),
        )

        alb_security_group = ec2.SecurityGroup.from_security_group_id(
            self,
            "SharedAlbSecurityGroup",
            Fn.import_value("SharedAlbSecurityGroupId"),
            mutable=False,
        )
        service.connections.allow_from(
            alb_security_group,
            ec2.Port.tcp(80),
            "Allow the shared ALB to reach Nginx",
        )

        target_group = elbv2.ApplicationTargetGroup(
            self,
            "PortfolioTargetGroup",
            vpc=vpc,
            port=80,
            protocol=elbv2.ApplicationProtocol.HTTP,
            target_type=elbv2.TargetType.IP,
            targets=[
                service.load_balancer_target(
                    container_name="NginxContainer", container_port=80
                )
            ],
            health_check=elbv2.HealthCheck(
                path="/health",
                interval=Duration.seconds(30),
                timeout=Duration.seconds(10),
            ),
        )
        target_group.node.default_child.apply_removal_policy(RemovalPolicy.RETAIN)

        listener_rule = elbv2.CfnListenerRule(
            self,
            "PortfolioListenerRule",
            listener_arn=Fn.import_value("SharedHttpsListenerArn"),
            priority=existing_resources.LISTENER_RULE_PRIORITY,
            conditions=[
                {
                    "field": "host-header",
                    "hostHeaderConfig": {
                        "values": [existing_resources.PRODUCTION_HOST]
                    },
                }
            ],
            actions=[
                {"type": "forward", "targetGroupArn": target_group.target_group_arn}
            ],
        )
        listener_rule.apply_removal_policy(RemovalPolicy.RETAIN)

        instance_role = iam.Role(
            self,
            "InstanceRole",
            assumed_by=iam.ServicePrincipal("ec2.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AmazonEC2ContainerServiceforEC2Role"
                ),
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "AmazonSSMManagedInstanceCore"
                ),
            ],
        )
        launch_template = ec2.LaunchTemplate(
            self,
            "EcsLaunchTemplate",
            instance_type=ec2.InstanceType("t3.micro"),
            machine_image=ecs.EcsOptimizedImage.amazon_linux2023(),
            role=instance_role,
            user_data=ec2.UserData.for_linux(),
        )
        capacity = autoscaling.AutoScalingGroup(
            self,
            "PortfolioCapacity",
            vpc=vpc,
            min_capacity=1,
            max_capacity=1,
            desired_capacity=1,
            mixed_instances_policy=autoscaling.MixedInstancesPolicy(
                launch_template=launch_template,
                instances_distribution=autoscaling.InstancesDistribution(
                    spot_allocation_strategy=(
                        autoscaling.SpotAllocationStrategy.CAPACITY_OPTIMIZED
                    ),
                    on_demand_base_capacity=0,
                    on_demand_percentage_above_base_capacity=0,
                    # No max_price cap = uses On-Demand price as ceiling (~$0.011/hr for t3.micro).
                    # Safer than $0.02 bid: no artificial evictions during demand spikes; still cheap since Spot market stays well below On-Demand most of the time.
                ),
            ),
        )
        capacity_provider = ecs.AsgCapacityProvider(
            self,
            "PortfolioCapacityProvider",
            auto_scaling_group=capacity,
            enable_managed_scaling=False,
            enable_managed_termination_protection=False,
        )
        cluster.add_asg_capacity_provider(capacity_provider)

        cfn_service = service.node.default_child
        cfn_service.add_resource_dependency(listener_rule)
        cfn_service.add_resource_dependency(capacity.node.default_child)

        Tags.of(capacity).add("Project", "portfolio-website")
        Tags.of(capacity).add("PurchaseOption", "spot")
