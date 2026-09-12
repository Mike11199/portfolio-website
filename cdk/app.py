from aws_cdk import App, Environment
from portfolio_cdk.media.stack import MediaStack

from portfolio_cdk.repository.stack import RepositoryStack
from portfolio_cdk.application.stack import PortfolioStack


app = App()
repository_stack = RepositoryStack(
    app, "PortfolioRepositoryStack", analytics_reporting=False
)
portfolio_stack = PortfolioStack(app, "PortfolioStack")
portfolio_stack.add_stack_dependency(repository_stack)
delivery = MediaStack(
    app, "PortfolioMediaStack", env=Environment(region="us-east-1"),
    analytics_reporting=False,
)
delivery.add_stack_dependency(portfolio_stack)
app.synth()
