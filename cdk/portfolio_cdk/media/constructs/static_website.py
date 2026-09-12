"""Route main-domain requests to the website prefix without changing media URLs."""

from aws_cdk import aws_cloudfront as cloudfront
from constructs import Construct

from ...existing_resources import PRODUCTION_HOST


class StaticWebsite(Construct):
    def __init__(self, scope: Construct, construct_id: str) -> None:
        super().__init__(scope, construct_id)
        self.function = cloudfront.Function(self, "Routing",
            code=cloudfront.FunctionCode.from_inline("""
function handler(event) {
    var request = event.request;
    if (request.headers.host.value === "HOST") {
        var path = request.uri;
        if (path.endsWith("/") || path.substring(path.lastIndexOf("/") + 1).indexOf(".") === -1) {
            path = "/index.html";
        }
        request.uri = "/website" + path;
    }
    return request;
}
""".replace("HOST", PRODUCTION_HOST)),
        )
