"""Set up the ECS cluster, application container, and reversible service."""

from aws_cdk import CfnCondition, Duration, Fn, aws_ec2 as ec2, aws_ecs as ecs, aws_iam as iam
from constructs import Construct


class ApplicationService(Construct):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        *,
        vpc: ec2.IVpc,
        alb_security_group: ec2.ISecurityGroup,
        image_tag: str,
        static_hosting: CfnCondition,
    ) -> None:
        super().__init__(scope, construct_id)
        # Preserve deployed resource paths while separating their implementation.

        cluster = ecs.Cluster(
            scope,
            "PortfolioCluster",
            vpc=vpc,
            container_insights_v2=ecs.ContainerInsights.DISABLED,
        )

        execution_role = iam.Role(
            scope,
            "TaskExecutionRole",
            assumed_by=iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AmazonECSTaskExecutionRolePolicy"
                )
            ],
        )

        task_definition = ecs.Ec2TaskDefinition(
            scope,
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
            scope,
            "PortfolioService",
            cluster=cluster,
            task_definition=task_definition,
            desired_count=1,
            min_healthy_percent=0,
            max_healthy_percent=100,
            circuit_breaker=ecs.DeploymentCircuitBreaker(rollback=True),
            bake_time=Duration.minutes(5),
        )

        service.connections.allow_from(
            alb_security_group,
            ec2.Port.tcp(80),
            "Allow the shared ALB to reach Nginx",
        )
        service.node.default_child.add_override(
            "Properties.DesiredCount",
            Fn.condition_if(static_hosting.logical_id, 0, 1),
        )
        self.cluster = cluster
        self.service = service
