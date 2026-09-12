from aws_cdk.assertions import Match, Template


def test_application(stacks):
    Template.from_stack(stacks.repository_stack).resource_count_is("AWS::ECR::Repository", 1)
    app = Template.from_stack(stacks.portfolio_stack)
    app.has_parameter("HostingMode", {"Default": "static"})
    app.has_condition("StaticHosting", {"Fn::Equals": [{"Ref": "HostingMode"}, "static"]})
    app.has_resource_properties("AWS::ECS::Service", {
        "DesiredCount": {"Fn::If": ["StaticHosting", 0, 1]},
    })
    app.has_resource_properties("AWS::AutoScaling::AutoScalingGroup", {
        "MinSize": {"Fn::If": ["StaticHosting", "0", "1"]},
        "DesiredCapacity": {"Fn::If": ["StaticHosting", "0", "1"]},
    })


def test_media(stacks):
    Template.from_stack(stacks.portfolio_stack).has_resource("AWS::S3::Bucket", {"DeletionPolicy": "Retain"})
    media = Template.from_stack(stacks.delivery)
    media.resource_count_is("AWS::CloudFront::Distribution", 1)
    media.has_resource_properties("AWS::CloudFront::Distribution", {
        "DistributionConfig": {
            "Aliases": ["assets.michael-iwanek-portfolio.com", "michael-iwanek-portfolio.com"],
            "WebACLId": Match.any_value(),
        },
    })
    media.has_resource_properties("AWS::PricingPlanManager::Subscription", {"PlanTier": "FREE"})
    assert stacks.portfolio_stack in stacks.delivery.dependencies
