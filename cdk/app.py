from aws_cdk import App, Environment

from portfolio_cdk.existing_resources import AWS_ACCOUNT_ID, AWS_REGION
from portfolio_cdk.stack import PortfolioStack


app = App()
PortfolioStack(
    app,
    "PortfolioStack",
    env=Environment(account=AWS_ACCOUNT_ID, region=AWS_REGION),
)
app.synth()
