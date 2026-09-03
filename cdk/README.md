# Portfolio CDK

The retained-resource migration is complete. The deployment workflow is active for normal repository, image, and application deployments.

## Ownership

```text
PortfolioRepositoryStack
└── retained ECR repository: portfolio-website

PortfolioStack
├── retained root A-alias
├── listener rule and target group
├── ECS cluster and service
├── one-host Spot Auto Scaling Group
└── application security group
```

- Shared CDK owns the VPC, public subnets, ALB security group, hosted zone, certificates, ALB, and listeners.
- `PortfolioStack` imports shared IDs through stable CloudFormation exports. No production network or listener IDs are stored in source.
- `PortfolioRepositoryStack` exports `PortfolioRepositoryUri`; the application uses that URI for immutable image tags.
- Dependencies are one-way: shared infrastructure, then repository, image push, then application.

## Existing account

- The existing ECR repository, listener rule, and target group were retained and imported without changing physical IDs.
- Shared identifiers now come from CloudFormation exports.
- Drift detection reports `IN_SYNC`; the final CDK diff is empty; target health and HTTPS are healthy.
- Do not rerun retained-resource import steps.

## Fresh environment

1. Deploy shared infrastructure.
2. Deploy `PortfolioRepositoryStack`.
3. Build and push the image.
4. Deploy `PortfolioStack`.
5. Verify target health and HTTPS.

Domain registration and name-server delegation remain manual. ACM creates its validation CNAME automatically.
