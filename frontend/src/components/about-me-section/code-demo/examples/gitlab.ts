export const gitlabExample = {
    language: "GitLab CI", file: ".gitlab-ci.yml", command: "git push origin HEAD",
    code: `# build - build app's docker image and push it to ecr
# deploy - deploy image to ecs using cdk

stages:
  - build
  - deploy

default:
  tags:
    - default-gitlab-runner

variables:
  IMAGE: >-
    $ECR_REGISTRY/portfolio-website:$CI_COMMIT_SHA

# - command = one script command
# > = wrap one command across lines
# | = preserve lines, useful for several commands/block scripts
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
      cdk deploy PortfolioStack
      --exclusively
      --require-approval never
      --parameters ImageTag="$CI_COMMIT_SHA"`,
    output: "build   passed: image pushed to ECR\ndeploy  passed: ECS service updated",
  };
