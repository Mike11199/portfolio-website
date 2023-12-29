import GitHubLogo from "../../images/github_button_logo.png";
import { Carousel } from "react-responsive-carousel";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const PyTorchApp = () => {
  return (
    <>
      <section id="hash_map_section">
        <div id="projects_section"></div>
        <h1 style={{ margin: "0px" }}> Projects </h1>
        <p style={{ height: "auto", marginBottom: "100px" }}>
          Please see full-stack Computer Science projects I've completed below,
          in various programming languages.
        </p>
        <h2 className="project_header">PyTorch Image Classification Website</h2>

        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick(
                "https://github.com/Mike11199/PyTorch-Image-Classification-TypeScript/tree/main"
              )
            }
          >
            <img
              className="github_logo"
              src={GitHubLogo}
              alt="github logo"
            ></img>
            GitHub Repo
          </button>

          <button
            className="website_button"
            onClick={() =>
              handleClick("https://www.youtube.com/watch?v=abtdBPFu_yM")
            }
          >
            Video
          </button>

          <button
            className="video_button"
            onClick={() =>
              handleClick(
                "https://pytorch-image-model-aws-app-727fe8e23222.herokuapp.com/"
              )
            }
          >
            Live Website
          </button>
        </div>

        <div className="project_card_hash_map">
          <div className="hash_map_carousel">
            <Carousel
              width="100%"
              infiniteLoop="true"
              dynamicHeight="true"
              showArrows="true"
            >
              <div>
                <img
                  alt="cats_and_dogs_image"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703822238/cats_and_dogs_lnwfi9.png"
                />
              </div>

              <div>
                <img
                  alt="nat_geo_collage"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703823645/nat_geo_collage_analysis_tpnipt.png"
                />
              </div>

              <div>
                <img
                  alt="pytorch_doggo"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703828564/labrador_new_ogez0w.png"
                />
              </div>

              <div>
                <img
                  alt="christmas_cat"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703829374/christmas_cat_analysis_pe8sny.png"
                />
              </div>

              <div>
                <img
                  alt="drag_and_drop_image"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703648977/upload_files_image_xbbnoy.png"
                />
              </div>

              <div>
                <img
                  alt="crosswalk_multi_bbox"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703648993/cross_walk_xg7nsw.png"
                />
              </div>

              <div>
                <img
                  alt="aws_lambda_model_invoker"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703649641/lambda_invoke_model_vwiqbd.png"
                />
              </div>

              <div>
                <img
                  alt="jupyterlab_test_of_model"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703649641/jupyter_notebook_cgnrea.png"
                />
              </div>

              <div>
                <img
                  alt="jupyterlab_inference_custom_script"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703649642/inference_rfjxd4.png"
                />
              </div>

              <div>
                <img
                  alt="front_end_and_server_code"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703657488/front_end_and_server_tpasn8.png"
                />
              </div>
            </Carousel>
          </div>

          <div className="hash_map_text">
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
                image as a NumPy array into the torch model and returns its
                predictions as a JSON object.
              </li>
              <li>
                The model is invoked by an AWS Lambda which directly sends the
                image as base64 encoded data. The lambda is in turn invoked by
                an AWS API Gateway which is configured to directly accept binary
                image data from an Axios post request.
              </li>
              <li>
                The express server takes the image as FormData with the help of
                multer node.js middleware to upload to the AWS API Gateway. On
                the front end, a user can upload an URL of an image, which is
                downloaded and coverted to a blob, then appended to the form
                data. Or the user can upload an image with a drag and drop, or
                choose file box, using a custom component.
              </li>
              <li>
                After receiving data from the PyTorch model, the front end uses
                the JavaScript Canvas to plot the boundary boxes and accuracy of
                the models predictions onto the image provided by the user. The
                model is capable of analyzing multiple objects in an image and
                can plot each of these boundary boxes on a supplied image. If a
                user wants to use an URL, they have the option of selecting
                images I've pre-selected from a drop down, or copying and
                pasting their own image URL they've found on the internet. This
                URL should end with .jpg to work correctly.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PyTorchApp;
