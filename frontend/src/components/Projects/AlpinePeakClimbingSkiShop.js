import Docker_Screenshot from "../../images/docker_screenshot.png";
import AWS_ECR from "../../images/AWS_ECR.png";
import AWS_CI_CD from "../../images/github_actions_yml.png";
import LOAD_BALANCER from "../../images/load_balancer.png";
import lambda_cron from "../../images/lambda_cron.png";
import { Carousel } from "react-responsive-carousel";
import GitHubLogo from "../../images/github_1.png";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const AlpinePeakClimbingSkiShop = () => {
  return (
    <>
      {/* SECTION FOR PROJECT #1 */}
      <div id="projects_section"></div>
      <section className="ski_shop_section">
        <h1 style={{ margin: "0px" }}> Projects </h1>
        <p style={{ height: "auto", marginBottom: "100px" }}>
          Please see full-stack Computer Science projects I've completed below,
          in various programming languages.
        </p>
        <h2 className="project_header">Ski & Rock Climbing E-Commerce Store</h2>
        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick(
                "https://github.com/Mike11199/rock-climbing-and-ski-shop-mern-stack"
              )
            }
          >
            <img
              className="github_logo"
              src={GitHubLogo}
              alt="github logo"
            ></img>
            GitHub Link
          </button>
          <button
            className="website_button"
            onClick={() =>
              handleClick("https://alpine-peak-climbing-ski-gear.com/")
            }
          >
            Link - AWS ECS Domain
          </button>
          <button
            className="video_button"
            onClick={() =>
              handleClick("https://recreational-equipment-shop.herokuapp.com/")
            }
          >
            Alt Link - Heroku (Old)
          </button>
        </div>
        <div className="project_card_ski_shop">
          <div className="carousel_ski_shop">
            <Carousel width="100%" infiniteLoop="true">
              <div>
                <img alt="login_page_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702441524/SkiShopLoginPage_ywkwjn.png' />
              </div>
              <div>
                <img alt="home_page_gif" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702441670/SkiShopHomePage_si8vkz.gif' />
              </div>
              <div>
                <img alt="register_page_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702441747/SkiShopRegisterPage_v9osuo.png' />
              </div>
              <div>
                <img alt="plant_trees_pledge_and_snow_satellite_tracker_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442507/ski_shop_pledge_and_sat_image_xseiqy.png' />
              </div>
              <div>
                <img alt="home_page_static_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442203/ski_shop_static_home_page_photo_u4f4vl.png' />
              </div>
              <div>
                <img alt="shopping_cart_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442304/ski_shop_shopping_cart_photo_ov8zr3.png' />
              </div>
              <div>
                <img alt="admin_dashboard_product_management_page_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442370/ski_shop_admin_products_dashboard_efynls.png' />
              </div>
              <div>
                <img alt="order_details_payment_paypal_buttons_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442428/ski_shop_paypal_order_details_page_elbfo1.png' />
              </div>
              <div>
                <img alt="editing_ski_mountaineering_login_page_photo" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702441833/SkiShopPhotoEditProcessGimp_jkrj7l.gif' />
              </div>
              <div>
                <img alt="nginx_dockerfile_docker.yml_docker_containers_screenshot_photo" src={Docker_Screenshot} />
              </div>
              <div>
                <img alt="aws_ecs_cluster_container_task_screenshot_photo" src={AWS_ECR} />
              </div>
              <div>
                <img alt="aws_ci_cd_github_actions_yml_file_task_json_aws_screenshot_photo" src={AWS_CI_CD} />
              </div>
              <div>
                <img alt="aws_load_balancer_ecs_photo" src={LOAD_BALANCER} />
              </div>
              <div>
                <img alt="aws_lambda_cron_screenshots_to_stop_and_restart_site_every_night_photo" src={lambda_cron} />
              </div>
            </Carousel>
          </div>

          <div className="text_description_ski_shop">
            <ul>
              <li>
                A complex full-stack website (REI/Amazon clone) where users can
                search for products, add them to a cart, and submit/pay for an
                order with PayPal. An Admin dashboard allows for
                product/inventory management, and real-time statistics/user
                chats. Implemented TypeScript on the front-end,
                Express.js/Node.js for the server, and MongoDB (NoSQL) for the
                database.
              </li>
              <li>
                Deployed on an AWS Elastic Container Service (ECS) cluster via
                serverless AWS Fargate. Implemented a CI/CD pipeline via a
                GitHub Actions .yml file which re-builds and deploys new docker
                images to ECR/ECS for the front/back end. This runs whenever new
                commits are pushed to the docker branch (main runs on Heroku).
                Deployed AWS Lambdas Crons with EventBridge rules to shut the
                site down at midnight and restart it at 6AM (to save hosting
                costs).
              </li>
              <li>
                Added an EC2 load balancer which reroutes traffic to the ECS
                cluster even when the IP address of it changes. The IP address
                can change as a new task is created by the GitHub actions
                pipeline on each push. The load balancer also redirects HTTP
                traffic on port 80 to HTTPS port 443. The front-end is served by
                a Nginx reverse proxy capable of supporting 1024 threads, which
                is defined in a nginx.conf file ran by the docker container. AWS
                Route 53 and the AWS Certificate Manager provide an SSL
                certificate to the domain name backed with 2048 bit RSA
                encryption.
              </li>
              <li>
                Used the PayPal SDK and sandbox accounts to simulate live
                payments of orders by the website, sending order info to PayPal
                and marking an order as paid in the MongoDB database depending
                on the external API response.
              </li>
              <li>
                Implemented Socket.IO to allow for bi-directional client and
                server communication, to enable real-time messaging between a
                logged in admin and user. Used Redux for global state management
                and Bootstrap to develop React components.
              </li>
              <li>
                Modeled complicated database relationships between products,
                orders, and users using embedded MongoDB documents. For example,
                products have a many to many relationship with orders. A product
                also has a one to many relationship with reviews, and a user has
                a one-to-many relationship with orders.
              </li>
              <li>
                Added Google OAuth2.0 Log In, decoding JWT credentials from
                Google, and locating the user by email in MongoDB to verify the
                user. JWT also allows for authorized/protected routes in the
                application so users can only access their own data.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AlpinePeakClimbingSkiShop;