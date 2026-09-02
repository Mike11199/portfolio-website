from aws_cdk import App

from portfolio_cdk.stack import PortfolioStack


def template() -> dict:
    app = App()
    stack = PortfolioStack(app, "TestPortfolioStack")
    return app.synth().get_stack_by_name(stack.stack_name).template


def resources(cloudformation: dict, resource_type: str) -> list[dict]:
    return [
        resource
        for resource in cloudformation["Resources"].values()
        if resource["Type"] == resource_type
    ]


def test_runs_one_nginx_task():
    cloudformation = template()
    services = resources(cloudformation, "AWS::ECS::Service")
    task_definitions = resources(cloudformation, "AWS::ECS::TaskDefinition")

    assert services[0]["Properties"]["DesiredCount"] == 1
    containers = task_definitions[0]["Properties"]["ContainerDefinitions"]
    assert [container["Name"] for container in containers] == ["NginxContainer"]
    assert containers[0]["PortMappings"][0]["ContainerPort"] == 80


def test_uses_one_t3_micro_spot_instance():
    cloudformation = template()
    launch_template = resources(cloudformation, "AWS::EC2::LaunchTemplate")[0]
    auto_scaling_group = resources(
        cloudformation, "AWS::AutoScaling::AutoScalingGroup"
    )[0]

    assert launch_template["Properties"]["LaunchTemplateData"]["InstanceType"] == "t3.micro"
    properties = auto_scaling_group["Properties"]
    assert properties["MinSize"] == "1"
    assert properties["MaxSize"] == "1"
    assert properties["MixedInstancesPolicy"]["InstancesDistribution"]["OnDemandPercentageAboveBaseCapacity"] == 0


def test_routes_portfolio_host_through_shared_listener():
    cloudformation = template()
    listener_rule = resources(
        cloudformation, "AWS::ElasticLoadBalancingV2::ListenerRule"
    )[0]["Properties"]
    target_group = resources(
        cloudformation, "AWS::ElasticLoadBalancingV2::TargetGroup"
    )[0]["Properties"]

    assert listener_rule["ListenerArn"] == (
        "arn:aws:elasticloadbalancing:us-west-1:456461478565:listener/app/"
        "consolidated-load-balancer/cebd4e468e9c8526/119a0202f44da309"
    )
    assert listener_rule["Priority"] == 2
    assert listener_rule["Conditions"][0]["HostHeaderConfig"]["Values"] == [
        "michael-iwanek-portfolio.com"
    ]
    assert target_group["HealthCheckPath"] == "/health"
    assert target_group["TargetType"] == "ip"


def test_owns_retained_root_alias_using_shared_exports():
    cloudformation = template()
    records = resources(cloudformation, "AWS::Route53::RecordSet")

    assert len(records) == 1
    alias = cloudformation["Resources"]["PortfolioAliasRecord"]
    assert alias["DeletionPolicy"] == "Retain"
    assert alias["UpdateReplacePolicy"] == "Retain"
    assert alias["Properties"] == {
        "Name": "michael-iwanek-portfolio.com.",
        "Type": "A",
        "HostedZoneId": {"Fn::ImportValue": "SharedPortfolioHostedZoneId"},
        "AliasTarget": {
            "DNSName": {
                "Fn::Join": [
                    "",
                    [
                        "dualstack.",
                        {"Fn::ImportValue": "SharedLoadBalancerDnsName"},
                        ".",
                    ],
                ]
            },
            "HostedZoneId": {
                "Fn::ImportValue": "SharedLoadBalancerCanonicalHostedZoneId"
            },
            "EvaluateTargetHealth": True,
        },
    }
