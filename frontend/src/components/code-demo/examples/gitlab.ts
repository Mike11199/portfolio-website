export const gitlabExample = {
    language: "GitLab CI", file: ".gitlab-ci.yml", command: "git push origin HEAD",
    code: `# Build and push a Docker image to AWS ECR.
# Deploy the default branch to ECS with CDK.

# Shell runner: Docker, AWS CLI, CDK,
# and project dependencies installed.
# Set AWS credentials, AWS_REGION,
# and ECR_REGISTRY in CI.
stages: [build, deploy]

default:
  tags: [aws-shell]

variables:
  IMAGE: >-
    $ECR_REGISTRY/portfolio-website:$CI_COMMIT_SHA

build:
  stage: build
  script:
    - >
      aws ecr get-login-password
      --region "$AWS_REGION" |
      docker login --username AWS
      --password-stdin "$ECR_REGISTRY"
    - >
      docker build -f frontend/Dockerfile
      -t "$IMAGE" frontend
    - docker push "$IMAGE"

deploy:
  stage: deploy
  resource_group: production
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  script:
    - cd cdk
    - >
      cdk deploy PortfolioStack --exclusively
      --require-approval never
      --parameters ImageTag="$CI_COMMIT_SHA"`,
    output: "build   passed: image pushed to ECR\ndeploy  passed: ECS service updated",
  };
