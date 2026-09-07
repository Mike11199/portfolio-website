import ProjectHeader from "../components/project-header/ProjectHeader";
import { useState } from "react";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import ButtonLink from "../../utils/buttons/ButtonLink";
import ImagesList from "../../utils/project-image-carousel/ImageList";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import { PyTorchImages } from "../../../images/imageData.json";
import styles from "./PyTorchApp.module.css";
import ProjectSection from "../components/project-section/ProjectSection";
import { useWindowWidth } from "@react-hook/window-size";

const PyTorchApp = () => {
  const pyTorchProjectDescriptionText = [
    `A full stack machine learning project involving multiple deployed PyTorch
    computer vision models.  A user can choose between a mask-rcnn (Instance Segmentation)
    model, giving near pixel accurate detection, or fast-rcnn (only bounding boxes). A TypeScript
    site can be used to upload images or provide the URL
    of an image to run computer vision analytics on.  Bounding boxes and masks
    produced by the neural network can be dynamically resized by the user.`,

    `The entire architecture has been reworked to be deployed via CI/CD using
    a GitHub actions workflow (pipeline).  This uses AWS CDK to update a CloudFormation
    stack for the app on code changes.  I run ECS on an EC2 spot instance, allowing me to containerize for cheap compared
    to Fargate.  Previously, I would SSH manually into the EC2 and git clone, run linux commands
    to build and restart the services.  The CDK also defines all the manual set up I had originally done
    to get this working, such as Route 53 records, adding HTTP/HTTPS listener rules to a load balancer, etc.`,

    `A Java Spring Boot API handles requests from the front end and sends binary image data to a
    Flask microservice.  The Flask app runs a custom inference.py script I've
    written which invokes the model. This script loads an
    image as a NumPy array into the Torch model and returns its
    predictions as a JSON object.  Masks are returned as an array of binary values.`,

    `The Java Spring Boot API takes multi-part-form data from the front end to
    route to the Flask microservice. From the UI, a user can upload an URL of an image
    which is downloaded and converted to a blob, then appended to the form
    data. An image file can also be uploaded from their
    computer/phone with a file explorer pop up, or by dragging and
    dropping the file onto the web page.`,

    `After receiving data from the PyTorch model, the front end uses
    the JavaScript Canvas to plot the bounding boxes and accuracy of
    the models predictions onto the image provided by the user. The
    model is capable of analyzing multiple objects in an image and
    can plot each of these bounding boxes on a supplied image. If an
    image URL is preferred over an image upload, a user has the
    option of choosing images I've pre-selected from a drop down, or
    copying and pasting their own image URL they've found on the
    internet.`,
  ];

  const windowWidth = useWindowWidth();
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
          title={"PyTorch Image Classification Website - Java Spring Boot/ Flask/ TypeScript"}
          className={styles.header}
          icons={
            <>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg"
                alt="java logo"
                style={{ width: "3.5rem", height: "auto" }}
              />
              <img
                style={{ width: "3.5rem", height: "auto" }}
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                alt="aws logo"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg"
                alt="python logo"
                style={{ width: "3.5rem", height: "auto" }}
              />
              <img
                alt="nginx logo"
                style={{ width: "3.5rem", height: "auto" }}
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
                alt="typescript logo"
                style={{ width: "3.5rem", height: "auto" }}
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg"
                alt="spring boot logo"
                style={{ width: "3.5rem", height: "auto" }}
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-plain-wordmark.svg"
                alt="pytorch logo"
                style={{ width: "3.5rem", height: "auto" }}
              />
            </>
          }
          actions={
            <>
              <RepositoryActions
                repositoryUrl={repositoryUrl}
                showCode={showCode}
                onToggleCode={() => setShowCode((visible) => !visible)}
              />
              <ButtonLink
                URL={
                  "https://machine-learning-projects.com/image-classification-mask-resnet"
                }
                variant={"blue"}
                buttonText={"Live Link - AWS EC2"}
              />
            </>
          }
        />

        <ProjectSection
          media={
            showCode && windowWidth > 600 ? (
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="PyTorch-Image-Classification-Java-Flask-TypeScript"
                branch="backend-v3"
              />
            ) : (
              <Carousel
                fixedHeight="var(--project-panel-height)"
                mobilePadding={false}
                showIndicators={false}
                width="100%"
                infiniteLoop={true}
                showArrows={true}
                showThumbs={windowWidth > 600}
              >
                {ImagesList(PyTorchImages)}
              </Carousel>
            )
          }
          description={pyTorchProjectDescriptionText}
        />
      </section>
    </>
  );
};

export default PyTorchApp;
