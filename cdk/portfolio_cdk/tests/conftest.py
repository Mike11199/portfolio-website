import pytest


@pytest.fixture(scope="session")
def stacks():
    import app
    return app
