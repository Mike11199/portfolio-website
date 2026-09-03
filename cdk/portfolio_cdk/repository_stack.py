"""Retained ECR repository owned separately from the application stack."""

from aws_cdk import CfnOutput, RemovalPolicy, Stack, aws_ecr as ecr
from constructs import Construct

from . import existing_resources


class RepositoryStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        repository = ecr.CfnRepository(
            self,
            "PortfolioRepositoryResource",
            repository_name=existing_resources.ECR_REPOSITORY,
            image_tag_mutability="MUTABLE",
            image_scanning_configuration=ecr.CfnRepository.ImageScanningConfigurationProperty(
                scan_on_push=False
            ),
            encryption_configuration=ecr.CfnRepository.EncryptionConfigurationProperty(
                encryption_type="AES256"
            ),
        )
        repository.override_logical_id("PortfolioRepository")
        repository.apply_removal_policy(RemovalPolicy.RETAIN)

        CfnOutput(
            self,
            "RepositoryUri",
            value=repository.attr_repository_uri,
            export_name="PortfolioRepositoryUri",
        )
