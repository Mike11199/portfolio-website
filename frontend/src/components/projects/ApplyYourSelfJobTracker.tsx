import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { applyYourSelfImages } from "../../images/imageData.json";
import CustomTextCarousel from "../CustomTextCarousel";
import { useWindowWidth } from "@react-hook/window-size";

const ApplyYourSelfJobTracker = () => {
  const ApplyYourSelfProjectDescriptionText = [
    `Full-stack MERN web application that allows multiple users to
    track their job application history on one convenient website
    from anywhere. Allows jobs to be searched, sorted by date, name,
    and categorized by application status with full CRUD
    functionality.`,

    `A dashboard shows statistical data visually via a Bar chart and
    Sankey chart, showing which jobs led to subsequent interviews
    and applications per month. Detailed notes can also be added to
    each job's history.`,

    `Features are implemented by several REST APIs, allowing user
    registration and login via Express.js routes, such as google
    OAuth 2.0. Back-end is run on Node.js connected to a MongoDB
    NoSQL database, with collections mapped to various Mongoose
    schema for Users/Jobs.`,

    `Uses JWT bearer-tokens to access restricted pages, password
    hashing (brypt.js), and private API routes using Axios
    interceptors so users can only access their own data.`,
    `Added various controllers to the APIs for jobs/user routes to
    implement error handling, user authentication, and not-found
    middleware. Used Postman to test HTTP requests made with Axios
    by the front-end to the server and check JSON responses.
    Features React.js reducers/actions to update the global state
    (React Context) and various statistics used to generate charts
    (Sankey, Bar Chart, etc.).`,
  ];

  const windowWidth = useWindowWidth();

  return (
    <>
      <section className="apply_yourself_section">
        <h2 className="projectHeaderText">
          applyYourSelf Job Application Tracker - MERN
        </h2>

        {/* Buttons */}
        <div className="projectButtons">
          <GitHubButton
            URL={"https://github.com/Mike11199/applyYourSelf-Job-Tracker"}
          />
          <ButtonLink
            URL={"https://applyyourself-tracker-prod.herokuapp.com"}
            variant={"blue"}
            buttonText={"Live Website Link"}
          />
        </div>

        {/* Image Carousel */}
        <div className="project_card_apply_yourself">
          <div className="carousel_apply_yourself">
            <Carousel
              swipeable={false}
              emulateTouch={false}
              width="100%"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
              showIndicators={false}
              showThumbs={windowWidth > 600}
            >
              {ImagesList(applyYourSelfImages)}
            </Carousel>
          </div>

          {/* Text Description */}

          <CustomTextCarousel
            descriptionList={ApplyYourSelfProjectDescriptionText}
            heightProp={"65vh"}
          />
        </div>
      </section>
    </>
  );
};

export default ApplyYourSelfJobTracker;
