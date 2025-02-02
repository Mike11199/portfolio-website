import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { alpinePeakClimbingSkiShopImages } from "../../images/imageData.json";
import CustomTextCarousel from "../CustomTextCarousel";
import { useWindowWidth } from "@react-hook/window-size";

const AlpinePeakClimbingSkiShop = () => {
  const AlpinePeakProjectDescriptionText = [
    `A complex full-stack website (e.g - REI/Amazon clone) where users can
          search for and review products, add them to a cart, and submit/pay for
          an order with a mock PayPal account. An admin dashboard allows for
          CRUD operations on users, products, and orders without directly
          editing the PostgreSQL database.`,
    `Implemented TypeScript and Redux for global state management on the
          front end. A .NET/C# API uses Entity Framework Core and JWT
          authentication to communicate with a PostgreSQL relational database
          hosted on AWS RDS. A secondary Express.js API/microservice uses
          Socket.io to enable bi-directional communication between admins and
          clients - for order help via a chat button.`,
    `Deployed on an AWS Elastic Container Service (ECS) cluster via
          serverless AWS Fargate. Implemented a CI/CD pipeline via a GitHub
          Actions .yml file which re-builds and deploys three docker images to
          ECR/ECS for the front end/.NET backend/express.js microservice. This runs
          whenever new commits are pushed to the default branch.`,
    `Deployed Python
          AWS Lambda Crons with EventBridge rules to shut the site down between
          1AM-6AM (to save hosting costs). Added an EventBridge Lambda
          which publishes to an SNS Topic, to notify me via email if a container
          crashes.`,
    `Added an EC2 load balancer to redirect HTTP traffic on port 80 to
          HTTPS port 443. The front-end is served by a Nginx reverse proxy,
          which is defined in a nginx.conf file ran by the docker container. AWS
          Route 53 and the AWS Certificate Manager provide an SSL certificate to
          the domain name backed with 2048 bit RSA encryption.`,
    `Used the PayPal SDK and sandbox accounts to simulate live payments of
          orders by the website, sending order info to PayPal and marking an
          order as paid in the PostgreSQL database depending on the external API
          response.`,
    `Modeled complicated database relationships between products, orders,
          and users with intersection tables and many-to-many (M:N) relationships in
          PostgreSQL. For example, products have a (M:N) relationship
          with orders. A product also has a one-to-many (1:M) relationship with
          reviews, and a user has a (1:M) relationship with orders.`,
    `Managed the PostgreSQL database via both code first and database first
         approaches.  Initially used Entity Framework (EF core) via commands such as db-scaffold
        to generate C# models and classes from tables (database first).
         Then later used EF core database migrations to dynamically generate SQL to make
         database table updates, after only editing C# models (code first).`,
    `Implemented resource based authorization via C# JSON web token (JWT)
          middleware in the API, so that users can only access their own data. The
          JWT contains user data in its payload, which is hashed via the
          HmacSha256Signature cryptographic algorithm - using a symmetric key
          only known by the API. This allows the API to pull information from
          the JWT with confidence that it is not spoofed, as any spoofing would
          lead to a different JWT signature than what the API would expect from
          a certain payload.`,
      `Google OAuth2.0 is also incorporated into the
          application using JWT security, allowing a user to login conveniently
          with their google account after being registered.`,
  ];

  const windowWidth = useWindowWidth();

  return (
    <>
      <section className="ski_shop_section">
        <h2 className="projectHeaderText">
          Ski & Rock Climbing E-Commerce Store (.NET/ C#/ TypeScript/
          PostgreSQL)
        </h2>

        {/* Buttons */}
        <div className="projectButtons">
          <GitHubButton
            URL={
              "https://github.com/Mike11199/rock-climbing-and-ski-shop-mern-stack"
            }
          />
          <ButtonLink
            URL={"https://alpine-peak-climbing-ski-gear.com/"}
            variant={"blue"}
            buttonText={"Live Link - AWS ECS"}
          />
        </div>

        {/* Image Carousel */}
        <div className="project_card_ski_shop">
          <div className="carousel_ski_shop">
            <Carousel
              swipeable={false}
              emulateTouch={false}
              width="100%"
              infiniteLoop={true}
              showIndicators={false}
              dynamicHeight={true}
              showThumbs={windowWidth > 600}
            >
              {ImagesList(alpinePeakClimbingSkiShopImages)}
            </Carousel>
          </div>

          {/* Text Description */}
          <CustomTextCarousel
            descriptionList={AlpinePeakProjectDescriptionText}
            heightProp={"62vh"}
          />
        </div>
      </section>
    </>
  );
};

export default AlpinePeakClimbingSkiShop;
