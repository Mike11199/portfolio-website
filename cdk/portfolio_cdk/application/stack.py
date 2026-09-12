"""Compose the ECS application and the retained storage constructs."""

from aws_cdk import CfnCondition, CfnOutput, CfnParameter, Fn, Stack
from constructs import Construct

from .constructs.media_storage import MediaStorage
from .constructs.shared_network import SharedNetwork
from .constructs.application_service import ApplicationService
from .constructs.web_routing import WebRouting
from .constructs.spot_capacity import SpotCapacity


class PortfolioStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        media_storage = MediaStorage(self, "MediaStorage")

        image_tag = CfnParameter(self, "ImageTag", default="latest").value_as_string
        hosting_mode = CfnParameter(
            self,
            "HostingMode",
            default="static",
            allowed_values=["ecs", "static"],
            description="Serve the root site through ECS or S3/CloudFront.",
        ).value_as_string
        static_hosting = CfnCondition(
            self, "StaticHosting", expression=Fn.condition_equals(hosting_mode, "static")
        )
        website_domain = CfnParameter(self, "WebsiteDomainName", default="").value_as_string
        # On first deployment, Actions supplies the CloudFront domain in a second pass.
        static_routing = CfnCondition(self, "StaticRouting", expression=Fn.condition_and(
            Fn.condition_equals(hosting_mode, "static"),
            Fn.condition_not(Fn.condition_equals(website_domain, "")),
        ))

        network = SharedNetwork(self, "Network")
        application = ApplicationService(
            self, "Application", vpc=network.vpc,
            alb_security_group=network.alb_security_group,
            image_tag=image_tag,
            static_hosting=static_hosting,
        )
        routing = WebRouting(
            self,
            "Routing",
            vpc=network.vpc,
            service=application.service,
            static_hosting=static_routing,
            website_domain=website_domain,
        )
        capacity = SpotCapacity(
            self,
            "Capacity",
            vpc=network.vpc,
            cluster=application.cluster,
            static_hosting=static_hosting,
        )

        # ECS creation waits for listener attachment and available host capacity.
        service = application.service.node.default_child
        service.add_resource_dependency(routing.listener_rule)
        service.add_resource_dependency(capacity.auto_scaling_group.node.default_child)
        CfnOutput(self, "WebsiteBucketName", value=media_storage.bucket.bucket_name)
