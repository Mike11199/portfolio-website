import Job_Tracker_1 from "../../images/job_tracker_1.png";
import Job_Tracker_2 from "../../images/job_tracker_2.png";
import Job_Tracker_3 from "../../images/job_tracker_3.png";
import Job_Tracker_Home_Page from "../../images/apply_your_self_home_page.png";
import GitHubLogo from "../../images/github_1.png";

import { Carousel } from "react-responsive-carousel";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const ApplyYourSelfJobTracker = () => {
  return (
    <>
      {/* SECTION FOR PROJECT #2 */}
      <section className="apply_yourself_section">
        <h2 className="project_header">
          applyYourSelf Job Application Tracker
        </h2>

        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick(
                "https://github.com/Mike11199/applyYourSelf-Job-Tracker"
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
              handleClick("https://applyyourself-tracker-prod.herokuapp.com")
            }
          >
            Live Website Link
          </button>
        </div>

        <div className="project_card_apply_yourself">
          <div className="carousel_apply_yourself">
            <Carousel
              width="100%"
              infiniteLoop="true"
              dynamicHeight="true"
              showArrows="true"
            >
              <div>
                <img alt="tracker_1" src='https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442991/applyyourself_job_tracker_dashboard_d41cco.gif' />
              </div>
              <div>
                <img alt="tracker_3" src={Job_Tracker_1} />
              </div>
              <div>
                <img alt="tracker_2" src={Job_Tracker_Home_Page} />
              </div>
              <div>
                <img alt="tracker_4" src={Job_Tracker_2} />
              </div>
              <div>
                <img alt="tracker_5" src={Job_Tracker_3} />
              </div>
            </Carousel>
          </div>

          <div className="text_apply_your_self">
            <ul>
              <li>
                Full-stack MERN web application that allows multiple users to
                track their job application history on one convenient website
                from anywhere. Allows jobs to be searched, sorted by date, name,
                and categorized by application status with full CRUD
                functionality.
              </li>
              <li>
                A dashboard shows statistical data visually via a Bar chart and
                Sankey chart, showing which jobs led to subsequent interviews
                and applications per month. Detailed notes can also be added to
                each job's history.
              </li>
              <li>
                Features are implemented by several REST APIs, allowing user
                registration and login via Express.js routes, such as google
                OAuth 2.0. Back-end is run on Node.js connected to a MongoDB
                NoSQL database, with collections mapped to various Mongoose
                schema for Users/Jobs.
              </li>
              <li>
                Uses JWT bearer-tokens to access restricted pages, password
                hashing (brypt.js), and private API routes using Axios
                interceptors so users can only access their own data.
              </li>
              <li>
                Added various controllers to the APIs for jobs/user routes to
                implement error handling, user authentication, and not-found
                middleware. Used Postman to test HTTP requests made with Axios
                by the front-end to the server and check JSON responses.
                Features React.js reducers/actions to update the global state
                (React Context) and various statistics used to generate charts
                (Sankey, Bar Chart, etc.).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplyYourSelfJobTracker;