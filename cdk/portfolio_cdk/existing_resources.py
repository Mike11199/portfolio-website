"""Existing shared AWS resources imported by the portfolio stack.

These resources are referenced by ID or ARN and are not owned by this stack.
"""

AWS_ACCOUNT_ID = "456461478565"
AWS_REGION = "us-west-1"

VPC_ID = "vpc-031a34e2307900372"
AVAILABILITY_ZONES = ("us-west-1b",)
PUBLIC_SUBNET_IDS = ("subnet-0069d564c7d9784e5",)

SHARED_ALB_SECURITY_GROUP_ID = "sg-0190e299544ca1711"
SHARED_HTTPS_LISTENER_ARN = (
    "arn:aws:elasticloadbalancing:us-west-1:456461478565:listener/app/"
    "consolidated-load-balancer/cebd4e468e9c8526/119a0202f44da309"
)
PRODUCTION_HOST = "michael-iwanek-portfolio.com"
# Priority 15: sits above pytorch rules (10/11) but below existing EC2 portfolio rule (2).
LISTENER_RULE_PRIORITY = 15

ECR_REPOSITORY = "portfolio-website"
