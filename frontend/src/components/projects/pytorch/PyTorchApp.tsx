import { JavaIcon, AwsIcon, PythonIcon, NginxIcon, TypeScriptIcon, SpringIcon, PyTorchIcon, LangChainIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import { useState } from "react";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import ButtonLink from "../../utils/buttons/ButtonLink";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import { PyTorchImages } from "../../../images/imageData.json";
import styles from "./PyTorchApp.module.css";
import ProjectSection from "../components/project-section/ProjectSection";

const PyTorchApp = () => {
  const pyTorchProjectDescriptionText = [
    `A full stack computer vision project which combines PyTorch image and video
    analysis with a locally hosted LLM. LangChain and LangGraph connect the
    LLM to tools for interacting with the results. A user can ask it to filter
    detected objects, change overlay colors, or navigate to a point in a video.
    Videos are processed asynchronously on AWS, with progress
    previews and cached results. Model switching and prompt caching is used
    to run the vision models and LLM on a server with limited memory.`,

    `The LLM is Qwen3-0.6B, a 600 million parameter model running locally on the
    server's CPU through llama.cpp. I run a GGUF version with Q4_K_M quantization
    to reduce the memory needed for the model weights. A user can ask it to
    "make cars purple and people red" instead of changing each setting manually.
    LangGraph and LangChain connect the LLM to functions for filtering detections,
    changing the overlays, and navigating video results. The Python code checks
    the function calls before applying any changes. If a call is invalid, the
    error is sent back to the LLM so it can try to correct it.`,

    `Since the server doesn't have enough memory to keep all of these models loaded
    at once, I switch between Qwen and the PyTorch models depending on the request.
    Reloading the LLM would normally mean processing the same instructions and
    function definitions again. To avoid repeating this work, I save its prompt
    KV cache to disk and restore it when the model is loaded again. This keeps the
    already computed part of the prompt available across model switches, without
    having to keep the LLM itself in memory.`,

    `For images, a user can upload an image file or provide an
    image URL for processing with either Faster R-CNN or Mask R-CNN.
    Both produce bounding boxes, while Mask R-CNN also returns masks outlining
    each object. Video processing uses Mask R-CNN and accepts uploaded videos,
    direct video URLs, or YouTube links. The results are
    drawn over the video and stay in sync with playback.`,

    `A Java Spring Boot API handles requests from the front end and sends them to a
    Flask microservice, which runs the PyTorch models. Since processing a video can
    take a while, these requests are handled asynchronously through a job queue.
    The video files and generated results are stored in AWS S3, while DynamoDB keeps
    track of each job's status and progress. The front end checks this progress and
    displays previews as frames are processed, so the user can see results before
    the entire video is finished.`,

    `Video jobs can be retried if processing is interrupted, and completed results
    are cached so the same video doesn't need to go through the model again.
    The front end uses the JavaScript Canvas to plot the model's predictions,
    keeping the bounding boxes and masks in sync with video playback. A user can
    filter which objects are shown, change their colors, or hide the masks and
    bounding boxes without having to rerun the model.`,

    `The entire architecture is deployed via CI/CD using a GitHub Actions workflow.
    This builds the Docker images, pushes them to Amazon ECR, and uses AWS CDK to
    update a CloudFormation stack for the app on code changes. I run ECS on an EC2
    Spot instance to keep hosting costs down. Previously, I would SSH manually into
    the EC2 and run Linux commands to build and restart the services. The CDK now
    defines the setup I originally did manually, such as Route 53 records and
    HTTP/HTTPS listener rules on the load balancer.`,
  ];
  const [showCode, setShowCode] = useState(false);
  const repositoryUrl = "https://github.com/Mike11199/PyTorch-Image-Classification-Java-Flask-TypeScript";

  return (
    <>
      <section className={`portfolio-project ${styles.pyTorchOuterContainer}`}>
        <div id="projects"></div>
        <h1 className={styles.projectsHeader}> Projects </h1>
        <p className={styles.projectsParagraph}>
          Please see full-stack Computer Science projects I've completed below,
          in various programming languages.
        </p>
        <ProjectHeader
          title={"PyTorch Computer Vision & Tool-Enabled LLM App (Java/ Python/ TypeScript/ LangChain)"}
          className={styles.header}
          icons={
            <>
              <JavaIcon />
              <AwsIcon />
              <PythonIcon />
              <NginxIcon />
              <TypeScriptIcon />
              <SpringIcon />
              <PyTorchIcon />
              <LangChainIcon />
            </>
          }
          actions={
            <>
              <RepositoryActions
                repositoryUrl={repositoryUrl}
              />
              <ButtonLink
                URL={
                  "https://machine-learning-projects.com/video-mask-rcnn"
                }
                variant={"blue"}
                buttonText={"Live Link - AWS EC2"}
              />
            </>
          }
        />

        <ProjectSection
          showCode={showCode}
          onToggleCode={() => setShowCode((visible) => !visible)}
          code={
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="PyTorch-Image-Classification-Java-Flask-TypeScript"
                branch="backend-v3"
                defaultFile="backend-flask-pytorch/inference_mask.py"
                defaultOpenFiles={[
                  ".github/workflows/deploy-cdk-aws.yml",
                  "backend-java-spring-boot/src/main/java/pytorchAPI/services/ImageService.java",
                  "frontend/src/assets/components/Dropzone.tsx",
                ]}
              />
          }
          media={
              <Carousel items={PyTorchImages} />
          }
          description={pyTorchProjectDescriptionText}
        />
      </section>
    </>
  );
};

export default PyTorchApp;
