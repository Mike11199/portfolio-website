import json

from aws_cdk.assertions import Match, Template


def test_repository_is_retained_and_keeps_recent_images(stacks):
    template = Template.from_stack(stacks["repository"])
    repository = template.to_json()["Resources"]["PortfolioRepository"]
    assert repository["DeletionPolicy"] == "Retain"
    assert repository["UpdateReplacePolicy"] == "Retain"
    rules = json.loads(repository["Properties"]["LifecyclePolicy"]["LifecyclePolicyText"])["rules"]
    assert rules[0]["selection"]["countNumber"] == 3
    assert rules[1]["selection"]["countNumber"] == 1
    template.has_output("RepositoryUri", {"Export": {"Name": "PortfolioRepositoryUri"}})


def test_application_runs_one_small_spot_host(stacks):
    assert stacks["repository"] in stacks["application"].dependencies
    template = Template.from_stack(stacks["application"])
    template.has_resource_properties("AWS::ECS::Service", {"DesiredCount": 1})
    template.has_resource_properties("AWS::EC2::LaunchTemplate", {
        "LaunchTemplateData": {"InstanceType": "t3.micro"},
    })
    template.has_resource_properties("AWS::AutoScaling::AutoScalingGroup", {
        "MinSize": "1", "MaxSize": "1",
        "MixedInstancesPolicy": {"InstancesDistribution": {"OnDemandPercentageAboveBaseCapacity": 0}},
    })
    template.has_resource_properties("AWS::ECS::TaskDefinition", {
        "ContainerDefinitions": [Match.object_like({
            "Name": "NginxContainer",
            "Image": {"Fn::Join": ["", [{"Fn::ImportValue": "PortfolioRepositoryUri"}, ":", {"Ref": "ImageTag"}]]},
            "PortMappings": [Match.object_like({"ContainerPort": 80})],
        })],
    })


def test_application_reuses_shared_routing(stacks):
    template = Template.from_stack(stacks["application"])
    template.resource_count_is("AWS::EC2::VPC", 0)
    template.resource_count_is("AWS::ElasticLoadBalancingV2::LoadBalancer", 0)
    template.has_resource_properties("AWS::ElasticLoadBalancingV2::ListenerRule", {
        "ListenerArn": {"Fn::ImportValue": "SharedHttpsListenerArn"},
        "Conditions": [{"Field": "host-header", "HostHeaderConfig": {"Values": ["michael-iwanek-portfolio.com"]}}],
    })
    template.has_resource_properties("AWS::ElasticLoadBalancingV2::TargetGroup", {
        "HealthCheckPath": "/health", "TargetType": "ip",
    })
    for kind in ("AWS::Route53::RecordSet", "AWS::ElasticLoadBalancingV2::ListenerRule", "AWS::ElasticLoadBalancingV2::TargetGroup"):
        template.has_resource(kind, {"DeletionPolicy": "Retain", "UpdateReplacePolicy": "Retain"})
