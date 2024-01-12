import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { PyTorchImages } from "../../images/imageData.json";
import  styles  from "../styles/PyTorchApp.module.css"

const PyTorchApp = () => {
  return (
    <>
      <section className={styles.pyTorchOuterContainer}>
        <div id="projectsDivScrollToSection"></div>
        <h1 className={styles.projectsHeader}> Projects </h1>
        <p className={styles.projectsParagraph}>
          Please see full-stack Computer Science projects I've completed below,
          in various programming languages.
        </p>
        <h2 className="projectHeaderTagText">PyTorch Image Classification Website</h2>

        {/* Buttons */}
        <div className="projectButtons">
          <GitHubButton
            URL={
              "https://github.com/Mike11199/PyTorch-Image-Classification-TypeScript"
            }
          />
          <ButtonLink
            URL={"https://www.youtube.com/watch?v=abtdBPFu_yM"}
            variant={"blue"}
            buttonText={"Video"}
          />
          <ButtonLink
            URL={
              "https://pytorch-image-model-aws-app-727fe8e23222.herokuapp.com/"
            }
            variant={"red"}
            buttonText={"Live Website"}
          />
        </div>

        {/* Image Carousel */}
        <div className={styles.pyTorchCarouselAndDescriptionContainer}>
          <div className={styles.pyTorchCarouselContainer}>
            <Carousel
              showIndicators={false}
              width="100%"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
            >
              {ImagesList(PyTorchImages)}
            </Carousel>
          </div>

          {/* Text Description */}
          <div className="textWrapper">
            <ul>
              <li>
                A full stack project involving a deployed PyTorch
                fasterrcnn_resnet50_fpn_v2 computer vision model. A TypeScript
                website/server can be used to upload images or provide the URL
                of an image to run computer vision analytics on.
              </li>
              <li>
                The model is deployed to an AWS SageMaker endpoint which allows
                it to accept HTTP requests and process images according to a
                custom inference.py script I've written. This script loads an
                image as a NumPy array into the Torch model and returns its
                predictions as a JSON object.
              </li>
              <li>
                The model is invoked by an AWS Lambda which directly sends the
                image as Base64 encoded data. The Lambda is in turn invoked by
                an AWS API Gateway, which is configured to directly accept
                binary image data from an Axios post request.
              </li>
              <li>
                The Express.js server takes the image as form data with the help
                of multer Node.js middleware to upload to the AWS API Gateway.
                On the front end, a user can upload an URL of an image which is
                downloaded and converted to a blob, then appended to the form
                data. An image file can also be uploaded from their
                computer/phone with a file explorer pop up, or by dragging and
                dropping the file onto the web page.
              </li>
              <li>
                After receiving data from the PyTorch model, the front end uses
                the JavaScript Canvas to plot the bounding boxes and accuracy of
                the models predictions onto the image provided by the user. The
                model is capable of analyzing multiple objects in an image and
                can plot each of these bounding boxes on a supplied image. If an
                image URL is preferred over an image upload, a user has the
                option of choosing images I've pre-selected from a drop down, or
                copying and pasting their own image URL they've found on the
                internet.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PyTorchApp;
