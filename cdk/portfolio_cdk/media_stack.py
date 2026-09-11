"""Private media storage and CloudFront delivery on the free pricing plan."""
from aws_cdk import (
    CfnOutput, CfnParameter, CfnResource, RemovalPolicy, Stack,
    aws_certificatemanager as acm,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_route53 as route53,
    aws_route53_targets as targets,
    aws_s3 as s3,
    aws_wafv2 as waf,
)
from constructs import Construct

from .existing_resources import PRODUCTION_HOST

MEDIA_HOST = f"assets.{PRODUCTION_HOST}"
MEDIA_REGION = "us-west-1"


def media_bucket_name(stack: Stack) -> str:
    return f"portfolio-media-{stack.account}-{MEDIA_REGION}"


class MediaStorageStack(Stack):
    """Video data lives in the user's preferred region, in the same account."""
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        bucket = s3.Bucket(
            self, "MediaBucket", bucket_name=media_bucket_name(self),
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            encryption=s3.BucketEncryption.S3_MANAGED,
            removal_policy=RemovalPolicy.RETAIN,
        )
        # The east-region stack owns the complete policy, including TLS enforcement.
        CfnOutput(self, "BucketName", value=bucket.bucket_name)


class MediaStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        zone_id = CfnParameter(self, "HostedZoneId", type="AWS::Route53::HostedZone::Id")
        zone = route53.HostedZone.from_hosted_zone_attributes(
            self, "ExistingZone", hosted_zone_id=zone_id.value_as_string,
            zone_name=PRODUCTION_HOST,
        )
        bucket = s3.Bucket.from_bucket_attributes(
            self, "MediaBucket", bucket_name=media_bucket_name(self),
            region=MEDIA_REGION,
        )
        certificate = acm.Certificate(
            self, "MediaCertificate", domain_name=MEDIA_HOST,
            validation=acm.CertificateValidation.from_dns(zone),
        )
        web_acl = waf.CfnWebACL(
            self, "MediaWebAcl", scope="CLOUDFRONT",
            default_action=waf.CfnWebACL.DefaultActionProperty(allow={}),
            visibility_config=waf.CfnWebACL.VisibilityConfigProperty(
                cloud_watch_metrics_enabled=False, sampled_requests_enabled=False,
                metric_name="portfolioMedia",
            ),
        )
        distribution = cloudfront.Distribution(
            self, "MediaDistribution", domain_names=[MEDIA_HOST],
            certificate=certificate, web_acl_id=web_acl.attr_arn,
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3BucketOrigin.with_origin_access_control(bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                allowed_methods=cloudfront.AllowedMethods.ALLOW_GET_HEAD,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
            ),
            comment="Portfolio media",
        )
        # CloudFormation supports cross-region S3 bucket policies from us-east-1.
        # Keep permissions with the distribution to avoid cross-region exports or
        # granting access to other distributions in this account.
        s3.CfnBucketPolicy(
            self, "RegionalMediaBucketPolicy", bucket=bucket.bucket_name,
            policy_document={
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {"Service": "cloudfront.amazonaws.com"},
                        "Action": "s3:GetObject",
                        "Resource": bucket.arn_for_objects("*"),
                        "Condition": {"StringEquals": {"AWS:SourceArn": distribution.distribution_arn}},
                    },
                    {
                        "Effect": "Deny", "Principal": {"AWS": "*"},
                        "Action": "s3:*",
                        "Resource": [bucket.bucket_arn, bucket.arn_for_objects("*")],
                        "Condition": {"Bool": {"aws:SecureTransport": "false"}},
                    },
                ],
            },
        )
        # Use the CloudFormation resource so the pinned CDK need not expose a new L2.
        plan = CfnResource(
            self, "FreeMediaPlan", type="AWS::PricingPlanManager::Subscription",
            properties={
                "PlanFamily": "CloudFront", "PlanTier": "FREE", "UsageLevel": "DEFAULT",
                "ResourceArns": [distribution.distribution_arn, web_acl.attr_arn],
            },
        )
        for record_type in (route53.ARecord, route53.AaaaRecord):
            record = record_type(
                self, record_type.__name__, zone=zone, record_name="assets",
                target=route53.RecordTarget.from_alias(targets.CloudFrontTarget(distribution)),
            )
            record.node.add_dependency(plan)
        CfnOutput(self, "BucketName", value=bucket.bucket_name)
        CfnOutput(self, "DistributionId", value=distribution.distribution_id)
        CfnOutput(self, "SubscriptionArn", value=plan.ref)
        CfnOutput(self, "MediaBaseUrl", value=f"https://{MEDIA_HOST}")
