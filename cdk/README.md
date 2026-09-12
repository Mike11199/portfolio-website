# Portfolio CDK

The Vite frontend defaults to S3/CloudFront hosting. GitHub Actions can switch back to React/Nginx on one Spot `t3.micro` EC2 host with `hosting_mode=ecs`.

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
|       +-- web_routing.py               # Route 53 aliases, ALB rule, and target group
|       +-- spot_capacity.py             # EC2 launch template and optional Spot host
|       \-- media_storage.py             # retained private S3 bucket
+-- media/
|   +-- stack.py                         # PortfolioMediaStack (us-east-1)
|   \-- constructs/
|       \-- static_website.py            # main-domain requests use the website prefix
\-- repository/
    \-- stack.py                         # PortfolioRepositoryStack: retained portfolio-website ECR
```

The application stack owns the S3 bucket in `us-west-1`. The media stack owns CloudFront with a FREE-plan subscription, WAF, origin access control, the bucket policy, an ACM certificate, and Route 53 A/AAAA records for `assets.michael-iwanek-portfolio.com`. The same distribution serves the main site from the bucket's `website/` prefix. Its certificate and CloudFront-scoped WAF require `us-east-1`.

Shared infrastructure owns the VPC, subnets, ALB security group, hosted zone, ALB certificate, load balancer, and listeners. This application imports their CloudFormation exports.

## Deployment

Deploy shared infrastructure first; its workflow bootstraps missing CDK environments in both regions. The [site workflow](../.github/workflows/deploy-cdk-ecs-ec2.yml) then deploys the repository and the application and media stacks. Docker images are built and pushed only in ECS mode. It reads the hosted-zone ID from shared exports.

Actions uploads the Vite build to S3, invalidates CloudFront, then deploys the application stack again with CloudFront's domain for the root DNS alias. Pushes select `static`; workflow dispatch can select `ecs`. Switching modes can cause downtime.

A fresh account needs GitHub AWS credentials and the region configured, plus domain registration/name-server delegation. Media files must be copied into S3 separately; the workflow uploads the website build automatically.

## Runtime

Static mode scales ECS tasks and EC2 hosts to zero; the host's root EBS disk is deleted on termination. The retained media bucket, ECR repository, and shared ALB remain.

In ECS mode, the ASG keeps exactly one host. Releases stop the old task before starting its replacement; releases and Spot interruptions can cause brief downtime. The ALB checks Nginx `/health`, and ECS service creation waits for the listener rule and host capacity.

New hosts make stopped containers and unused images eligible for cleanup after one minute, checking images every ten minutes. Existing hosts need a one-time ECS configuration update; disk sizes and ECR retention are unchanged.
