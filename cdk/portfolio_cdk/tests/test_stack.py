from unittest.mock import patch

from aws_cdk import App, Fn

from portfolio_cdk.repository_stack import RepositoryStack
from portfolio_cdk.stack import PortfolioStack


def template() -> dict:
    app = App()
    stack = PortfolioStack(app, "TestPortfolioStack")
    return app.synth().get_stack_by_name(stack.stack_name).template


def repository_template() -> dict:
    app = App()
    stack = RepositoryStack(app, "TestRepositoryStack")
    return app.synth().get_stack_by_name(stack.stack_name).template


def resources(cloudformation: dict, resource_type: str) -> list[dict]:
    return [
        resource
        for resource in cloudformation["Resources"].values()
        if resource["Type"] == resource_type
    ]


def test_application_stack_depends_on_repository_stack():
    import app as cdk_app

    assert cdk_app.repository_stack in cdk_app.portfolio_stack.dependencies


def test_repository_stack_retains_live_repository_and_exports_uri():
    cloudformation = repository_template()

    repository = cloudformation["Resources"]["PortfolioRepository"]
    assert repository["Type"] == "AWS::ECR::Repository"
    assert repository["DeletionPolicy"] == "Retain"
    assert repository["UpdateReplacePolicy"] == "Retain"
    assert repository["Properties"] == {
        "RepositoryName": "portfolio-website",
        "ImageTagMutability": "MUTABLE",
        "ImageScanningConfiguration": {"ScanOnPush": False},
        "EncryptionConfiguration": {"EncryptionType": "AES256"},
    }
    assert cloudformation["Outputs"]["RepositoryUri"] == {
        "Value": {"Fn::GetAtt": ["PortfolioRepository", "RepositoryUri"]},
        "Export": {"Name": "PortfolioRepositoryUri"},
    }


def import_values(value) -> list[str]:
    if isinstance(value, dict):
        imports = (
            [value["Fn::ImportValue"]] if "Fn::ImportValue" in value else []
        )
        return imports + [
            item
            for child in value.values()
            for item in import_values(child)
        ]
    if isinstance(value, list):
        return [item for child in value for item in import_values(child)]
    return []


def test_imports_shared_network_listener_and_repository_values():
    cloudformation = template()

    assert {
        "SharedVpcId",
        "SharedPublicSubnet1Id",
        "SharedAlbSecurityGroupId",
        "SharedHttpsListenerArn",
        "PortfolioRepositoryUri",
    }.issubset(set(import_values(cloudformation)))

    task_definition = resources(cloudformation, "AWS::ECS::TaskDefinition")[0]
    image = task_definition["Properties"]["ContainerDefinitions"][0]["Image"]
    assert image == {
        "Fn::Join": [
            "",
            [
                {"Fn::ImportValue": "PortfolioRepositoryUri"},
                ":",
                {"Ref": "ImageTag"},
            ],
        ]
    }


def test_imports_shared_public_subnet_availability_zone():
    with patch(
        "portfolio_cdk.stack.Fn.import_value", wraps=Fn.import_value
    ) as import_value:
        app = App()
        PortfolioStack(app, "TestPortfolioStack")

    import_value.assert_any_call("SharedPublicSubnet1AvailabilityZone")


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
    listener_rule_id, listener_rule = next(
        (logical_id, resource)
        for logical_id, resource in cloudformation["Resources"].items()
        if resource["Type"] == "AWS::ElasticLoadBalancingV2::ListenerRule"
    )
    target_group_id, target_group = next(
        (logical_id, resource)
        for logical_id, resource in cloudformation["Resources"].items()
        if resource["Type"] == "AWS::ElasticLoadBalancingV2::TargetGroup"
    )

    assert listener_rule["Properties"]["ListenerArn"] == {
        "Fn::ImportValue": "SharedHttpsListenerArn"
    }
    assert listener_rule["Properties"]["Priority"] == 2
    assert listener_rule["Properties"]["Conditions"][0]["HostHeaderConfig"]["Values"] == [
        "michael-iwanek-portfolio.com"
    ]
    assert target_group["Properties"]["HealthCheckPath"] == "/health"
    assert target_group["Properties"]["TargetType"] == "ip"
    for logical_id in (listener_rule_id, target_group_id):
        resource = cloudformation["Resources"][logical_id]
        assert resource["DeletionPolicy"] == "Retain"
        assert resource["UpdateReplacePolicy"] == "Retain"


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
