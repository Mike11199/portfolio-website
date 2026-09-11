import json

from aws_cdk.assertions import Match, Template


def test_video_storage_is_private_and_in_us_west_1(stacks):
    assert stacks["storage"].region == "us-west-1"
    template = Template.from_stack(stacks["storage"])
    template.resource_count_is("AWS::S3::Bucket", 1)
    template.has_resource("AWS::S3::Bucket", {
        "DeletionPolicy": "Retain",
        "Properties": Match.object_like({"PublicAccessBlockConfiguration": {
            "BlockPublicAcls": True, "BlockPublicPolicy": True,
            "IgnorePublicAcls": True, "RestrictPublicBuckets": True,
        }}),
    })


def test_cloudfront_uses_west_bucket_https_and_free_plan(stacks):
    assert stacks["media"].region == "us-east-1"
    assert stacks["storage"] in stacks["media"].dependencies
    template = Template.from_stack(stacks["media"])
    template.resource_count_is("AWS::S3::Bucket", 0)
    template.has_resource_properties("AWS::PricingPlanManager::Subscription", {"PlanTier": "FREE"})
    distribution = next(iter(template.find_resources("AWS::CloudFront::Distribution").values()))["Properties"]["DistributionConfig"]
    assert "s3.us-west-1" in json.dumps(distribution["Origins"])
    assert distribution["Aliases"] == ["assets.michael-iwanek-portfolio.com"]
    assert distribution["DefaultCacheBehavior"]["ViewerProtocolPolicy"] == "redirect-to-https"
    policy = template.to_json()["Resources"]["RegionalMediaBucketPolicy"]["Properties"]["PolicyDocument"]["Statement"]
    assert policy[0]["Principal"] == {"Service": "cloudfront.amazonaws.com"}
    assert "AWS:SourceArn" in policy[0]["Condition"]["StringEquals"]
    assert policy[1]["Effect"] == "Deny"
    assert policy[1]["Condition"] == {"Bool": {"aws:SecureTransport": "false"}}
