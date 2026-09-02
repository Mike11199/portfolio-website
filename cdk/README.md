# Portfolio CDK

- Shared CDK owns the hosted zone, certificates, ALB, and listeners.
- `PortfolioStack` owns its alias, listener rule, target group, and ECS application.
- Shared CDK deploys first; Portfolio CDK deploys second. There is no circular dependency.
- No old target groups remain.
- No Portfolio DNS changes were required.
- No Route 53 or ALB resources are orphaned.
- In a new environment, update the registered domain's name servers manually; ACM creates its validation CNAME automatically.
