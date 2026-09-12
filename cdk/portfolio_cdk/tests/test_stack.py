from aws_cdk.assertions import Template


def test_application(stacks):
    Template.from_stack(stacks.repository_stack).resource_count_is("AWS::ECR::Repository", 1)
    app = Template.from_stack(stacks.portfolio_stack)
    app.has_resource_properties("AWS::ECS::Service", {"DesiredCount": 1})
    app.resource_count_is("AWS::AutoScaling::AutoScalingGroup", 1)


def test_media(stacks):
    Template.from_stack(stacks.portfolio_stack).has_resource("AWS::S3::Bucket", {"DeletionPolicy": "Retain"})
    Template.from_stack(stacks.delivery).resource_count_is("AWS::CloudFront::Distribution", 1)
    assert stacks.portfolio_stack in stacks.delivery.dependencies
