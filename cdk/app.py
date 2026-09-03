from aws_cdk import App

from portfolio_cdk.repository_stack import RepositoryStack
from portfolio_cdk.stack import PortfolioStack


app = App()
repository_stack = RepositoryStack(
    app, "PortfolioRepositoryStack", analytics_reporting=False
)
portfolio_stack = PortfolioStack(app, "PortfolioStack")
portfolio_stack.add_stack_dependency(repository_stack)
app.synth()
