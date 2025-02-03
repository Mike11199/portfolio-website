import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { PyTorchImages } from "../../images/imageData.json";
import styles from "../styles/PyTorchApp.module.css";
import CustomTextCarousel from "../CustomTextCarousel";
import { useWindowWidth } from "@react-hook/window-size";

const PyTorchApp = () => {
  const pyTorchProjectDescriptionText = [
    `A full stack machine learning project involving multiple deployed PyTorch
    computer vision models.  A user can choose between a mask-rcnn (Instance Segmentation)
    model, giving near pixel accurate detection, or fast-rcnn (only bounding boxes). A TypeScript
    site can be used to upload images or provide the URL
    of an image to run computer vision analytics on.  Bounding boxes and masks
    produced by the neural network can be dynamically resized by the user.`,

    `The model is deployed to to an AWS EC2 instance, where a Java Spring Boot
    API handles requests from the front end and sends binary image data to a
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
    `
    The model was developed using a Sagemaker/Jupyter Lab Notebook in Python.
    It was first deployed to an AWS SageMaker endpoint and invoked by an AWS Lambda
    which directly sends the image as Base64 encoded data to the endpoint. The Lambda is in turn invoked
    by an AWS API Gateway, which is configured to directly accept binary image data from an
    Axios post request. Going forward this and Heroku will likely be a backup or turned off due to high
    costs - and only ran on the EC2 version.`,
  ];

  const windowWidth = useWindowWidth();

  return (
    <>
      <section className={styles.pyTorchOuterContainer}>
        <div id="projectsDivScrollToSection"></div>
        <h1 className={styles.projectsHeader}> Projects </h1>
        <p className={styles.projectsParagraph}>
          Please see full-stack Computer Science projects I've completed below,
          in various programming languages.
        </p>
        <div className={styles.projectHeaderTextContainer}>
          <h3 className={styles.projectHeaderText}>
            PyTorch Image Classification Website - Java Spring
            Boot/ Flask/ TypeScript
          </h3>
          <div className={styles.devIconsContainer}>
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
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
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
          </div>
          <div className="projectButtons">
            <GitHubButton
              URL={
                "https://github.com/Mike11199/PyTorch-Image-Classification-Java-Flask-TypeScript"
              }
            />
            <ButtonLink
              URL={
                "https://machine-learning-projects.com/image-classification-mask-resnet"
              }
              variant={"blue"}
              buttonText={"Live Link - AWS EC2"}
            />
          </div>
        </div>

        {/* Buttons */}

        {/* Image Carousel */}
        <div className={styles.pyTorchCarouselAndDescriptionContainer}>
          <div className={styles.pyTorchCarouselContainer}>
            <Carousel
              swipeable={false}
              emulateTouch={false}
              showIndicators={false}
              width="100%"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
              showThumbs={windowWidth > 600}
            >
              {ImagesList(PyTorchImages)}
            </Carousel>
          </div>

          {/* Text Description */}
          <CustomTextCarousel
            descriptionList={pyTorchProjectDescriptionText}
            heightProp={"62vh"}
          />
        </div>
      </section>
    </>
  );
};

export default PyTorchApp;
