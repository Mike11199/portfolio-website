"""Media storage in us-west-1; global CloudFront configuration in us-east-1."""
from aws_cdk import App, BootstraplessSynthesizer, Environment

from portfolio_cdk.media_stack import MediaStack, MediaStorageStack, MEDIA_REGION

app = App()
storage = MediaStorageStack(
    app,
    "PortfolioMediaStorageStack",
    env=Environment(region=MEDIA_REGION),
    synthesizer=BootstraplessSynthesizer(),
    analytics_reporting=False,
)
delivery = MediaStack(
    app,
    "PortfolioMediaStack",
    env=Environment(region="us-east-1"),
    synthesizer=BootstraplessSynthesizer(),
    analytics_reporting=False,
)
delivery.add_stack_dependency(storage)
app.synth()
