import pytest


@pytest.fixture(scope="session")
def stacks():
    # Importing the entry points also synthesizes both CDK apps once.
    import app
    import media_app

    return {
        "application": app.portfolio_stack,
        "repository": app.repository_stack,
        "storage": media_app.storage,
        "media": media_app.delivery,
    }
