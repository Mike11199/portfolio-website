import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { alpinePeakClimbingSkiShopImages } from '../../images/imageData.json';

const AlpinePeakClimbingSkiShop = () => {
  return (
    <>
      <section className="ski_shop_section">
        <h2 className="project_header">Ski & Rock Climbing E-Commerce Store</h2>

        {/* Buttons */}
        <div className="project_buttons">
          <GitHubButton
            URL={
              "https://github.com/Mike11199/rock-climbing-and-ski-shop-mern-stack"
            }
          />
          <ButtonLink
            URL={"https://alpine-peak-climbing-ski-gear.com/"}
            variant={"blue"}
            buttonText={"Link - AWS ECS Domain"}
          />
          <ButtonLink
            URL={"https://recreational-equipment-shop.herokuapp.com/"}
            variant={"red"}
            buttonText={"Alt Link - Heroku (Old)"}
          />
        </div>

        {/* Image Carousel */}
        <div className="project_card_ski_shop">
          <div className="carousel_ski_shop">
            <Carousel width="100%" infiniteLoop={true}>
              {ImagesList(alpinePeakClimbingSkiShopImages)}
            </Carousel>
          </div>

          {/* Text Description */}
          <div className="text_description_ski_shop">
            <ul>
              <li>
                A complex full-stack website (e.g - REI/Amazon clone) where
                users can search for products, add them to a cart, and
                submit/pay for an order with a mock PayPal account. An Admin
                dashboard allows for product/inventory management, and real-time
                user chats with Socket.IO. Implemented TypeScript on the
                front-end, Express.js/Node.js for the server, and MongoDB
                (NoSQL) for the database.
              </li>
              <li>
                Deployed on an AWS Elastic Container Service (ECS) cluster via
                serverless AWS Fargate. Implemented a CI/CD pipeline via a
                GitHub Actions .yml file which re-builds and deploys new docker
                images to ECR/ECS for the front/back end. This runs whenever new
                commits are pushed to the docker branch (main runs on Heroku).
                Deployed AWS Lambda Crons with EventBridge rules to shut the
                site down between 1AM-6AM (to save hosting costs). Added another
                EventBridge Lambda which publishes to an SNS Topic, to notify me
                via email if a container crashes.
              </li>
              <li>
                Added an EC2 load balancer to redirect HTTP traffic on port 80
                to HTTPS port 443. The front-end is served by a Nginx reverse
                proxy, which is defined in a nginx.conf file ran by the docker
                container. AWS Route 53 and the AWS Certificate Manager provide
                an SSL certificate to the domain name backed with 2048 bit RSA
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
