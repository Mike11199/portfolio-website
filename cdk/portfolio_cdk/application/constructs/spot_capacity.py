"""Set up the reversible one-host Spot capacity for ECS."""

from aws_cdk import (
    CfnCondition,
    Fn,
    Tags,
    aws_autoscaling as autoscaling,
    aws_ec2 as ec2,
    aws_ecs as ecs,
    aws_iam as iam,
)
from constructs import Construct


class SpotCapacity(Construct):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        *,
        vpc: ec2.IVpc,
        cluster: ecs.Cluster,
        static_hosting: CfnCondition,
    ) -> None:
        super().__init__(scope, construct_id)
        # Preserve deployed resource paths while separating their implementation.

        instance_role = iam.Role(
            scope,
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
            scope,
            "EcsLaunchTemplate",
            instance_type=ec2.InstanceType("t3.micro"),
            machine_image=ecs.EcsOptimizedImage.amazon_linux2023(),
            role=instance_role,
            user_data=ec2.UserData.for_linux(),
        )

        capacity = autoscaling.AutoScalingGroup(
            scope,
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
                ),
            ),
        )

        capacity_provider = ecs.AsgCapacityProvider(
            scope,
            "PortfolioCapacityProvider",
            auto_scaling_group=capacity,
            enable_managed_scaling=False,
            enable_managed_termination_protection=False,
        )

        cluster.add_asg_capacity_provider(capacity_provider)

        # Cached images can fill the disk and cause deployment image pulls to fail.
        # Shorten ECS cleanup delays to reclaim stopped containers and unused images.
        launch_template.user_data.add_commands(
            "echo ECS_ENGINE_TASK_CLEANUP_WAIT_DURATION=1m >> /etc/ecs/ecs.config",
            "echo ECS_IMAGE_MINIMUM_CLEANUP_AGE=1m >> /etc/ecs/ecs.config",
            "echo ECS_IMAGE_CLEANUP_INTERVAL=10m >> /etc/ecs/ecs.config",
            "echo ECS_NUM_IMAGES_DELETE_PER_CYCLE=100 >> /etc/ecs/ecs.config",
        )
        capacity.node.default_child.add_override(
            "Properties.MinSize",
            Fn.condition_if(static_hosting.logical_id, "0", "1"),
        )
        capacity.node.default_child.add_override(
            "Properties.DesiredCapacity",
            Fn.condition_if(static_hosting.logical_id, "0", "1"),
        )

        Tags.of(capacity).add("Project", "portfolio-website")

        Tags.of(capacity).add("PurchaseOption", "spot")
        self.auto_scaling_group = capacity
