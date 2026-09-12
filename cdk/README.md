# Portfolio CDK

React/Nginx runs as one ECS task on one Spot `t3.micro` EC2 host. Deployments run through GitHub Actions.

## Structure and ownership

```text
app.py                                  # connects the three stacks
portfolio_cdk/
+-- existing_resources.py                # application constants
+-- application/
|   +-- stack.py                         # PortfolioStack
|   \-- constructs/
|       +-- application_service.py       # ECS cluster, container, and service
|       +-- shared_network.py            # imports shared networking
|       +-- web_routing.py               # Route 53 alias, ALB rule, and target group
|       +-- spot_capacity.py             # EC2 launch template and one-host Spot ASG
|       \-- media_storage.py             # retained private S3 bucket
+-- media/
|   \-- stack.py                         # PortfolioMediaStack (us-east-1)
\-- repository/
    \-- stack.py                         # PortfolioRepositoryStack: retained portfolio-website ECR
```

The application stack owns the S3 bucket in `us-west-1`. The media stack owns CloudFront with a FREE-plan subscription, WAF, origin access control, the bucket policy, an ACM certificate, and Route 53 A/AAAA records for `assets.michael-iwanek-portfolio.com`. Its certificate and CloudFront-scoped WAF require `us-east-1`.

Shared infrastructure owns the VPC, subnets, ALB security group, hosted zone, ALB certificate, load balancer, and listeners. This application imports their CloudFormation exports.

## Deployment

Deploy shared infrastructure first; its workflow bootstraps missing CDK environments in both regions. The [site workflow](../.github/workflows/deploy-cdk-ecs-ec2.yml) then deploys the repository, builds and pushes the image, and deploys the application and media stacks together. It reads the hosted-zone ID from shared exports.

A fresh account needs GitHub AWS credentials and the region configured, plus domain registration/name-server delegation. Media files must be copied into S3 separately; deploying CDK creates the resources, not their content.

## Runtime

The ASG keeps exactly one host. Releases stop the old task before starting its replacement; releases and Spot interruptions can cause brief downtime. The ALB checks Nginx `/health`, and ECS service creation waits for the listener rule and host capacity.
