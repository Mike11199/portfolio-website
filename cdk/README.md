# Portfolio CDK

Runs the React/nginx image as one ECS task on one `t3.micro` Spot EC2 instance.

## Files

- `portfolio_cdk/stack.py` — ECS service, Spot capacity, target group, and listener rule.
- `portfolio_cdk/existing_resources.py` — IDs and ARNs for the existing VPC and consolidated load balancer.
- `portfolio_cdk/tests/test_stack.py` — small synthesized-template tests.

The service uses listener priority `15` (pytorch uses 10/11); the existing priority-2 rule for this domain on EC2 takes precedence until cutover. ECS replaces failed tasks, and the Auto Scaling group replaces an interrupted Spot instance.
