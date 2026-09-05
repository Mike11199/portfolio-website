export const gitlabExample = {
    language: "GitLab CI", file: ".gitlab-ci.yml", command: "git push origin HEAD",
    code: `# Shell runner has Docker, AWS CLI, CDK and project dependencies.
# Configure AWS credentials, AWS_REGION and ECR_REGISTRY in CI.
stages: [build, deploy]

default:
  tags: [aws-shell]

variables:
  IMAGE: "$ECR_REGISTRY/portfolio-website:$CI_COMMIT_SHA"

build:
  stage: build
  script:
    - |
      aws ecr get-login-password --region "$AWS_REGION" |
        docker login --username AWS --password-stdin "$ECR_REGISTRY"
    - docker build -f frontend/Dockerfile -t "$IMAGE" .
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
