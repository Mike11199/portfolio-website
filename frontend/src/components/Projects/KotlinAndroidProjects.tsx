import GitHubLogo from "../../images/github_button_logo.png";
import { Carousel } from "react-responsive-carousel";

const handleClick = (site: string) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const KotlinAndroidProjects = () => {
  return (
    <>
      {/* SECTION FOR PROJECT #7 */}
      <section id="kotlin_section">
        <h2 className="project_header">
          Kotlin (Jetpack Compose) - Sacramento City and Flight Search App
        </h2>

        {/* Buttons */}
        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick(
                "https://github.com/Mike11199/CS-492-Assignment-5-Flight-Search-App"
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
            className="video_button"
            onClick={() =>
              handleClick("https://www.youtube.com/watch?v=hwGGgglHlus")
            }
          >
            Video Link
          </button>
        </div>

        <div className="project_card_hash_map" style={{ marginTop: "50px" }}>
          <div className="kotlin_carousel_container">
            <Carousel
              className="kotlin_carousel"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
              showThumbs={false}
            >
              <div>
                <img
                  alt="sacramento_phone_view_android_app_gif"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442796/android_kotlin_sacramento_app_fdubuz.gif"
                />
              </div>
              <div></div>
            </Carousel>
          </div>

          <div className="kotlin_carousel_container">
            <Carousel
              className="kotlin_carousel"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
              showThumbs={false}
            >
              <div>
                <img
                  alt="flight_search_sql_lite_phone_view_android_app_gif"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442786/android_kotlin_flight_search_fu06fc.gif"
                />
              </div>
              <div></div>
            </Carousel>
          </div>

          <div className="hash_map_text">
            <ul>
              <li>
                These are two applications from the Oregon State University
                course CS 492 - Mobile Development, programmed in Kotlin, which
                is a language derived from Java. These apps also use the Jetpack
                Compose framework for state/ UI management.
              </li>
              <ul>
                <li>
                  Sacramento City App - Code is NOT allowed to be posted to a
                  public repo - showing GIF only.
                </li>
                <li>
                  Flight Search App - This is the portfolio project and is
                  allowed to be posted to a public repo per the Syllabus.
                </li>
              </ul>
              <li>
                The Flight Search App persists data using a SQLite database and
                the Room API, which provides abstraction to the database layer
                of the app. This allows us to define SQL queries in DAOs (Data
                Access Objects) to perform CRUD operations more easily.
                Coroutines are also used so that database actions are
                asynchronous and don't block the main thread.
              </li>
              <li>
                Uses Jetpack Compose features such as data classes, composables,
                and LazyColumns to enable scrolling through list collections of
                Categories and Recommendations. Modifiers are used to style the
                UI. Collections of data used in the app are defined in a
                DataSource class, holding functions to return items.
              </li>
              <li>
                Makes use of the ViewModel architecture component to hold and
                expose the state displayed by the UI and retain it upon
                configuration changes. Instead of defining routes with a
                NavController, the state is used to conditionally render
                different composable functions/screens. The UI state is defined
                as a data class in Kotlin which can be accessed by various
                composables.
              </li>
              <li>
                Models for various items in the app are defined in data classes,
                which are intended to hold data without the boilerplate code
                needed in Java for getter/setter functions.
                <ul>
                  <li>https://www.baeldung.com/kotlin/data-classes</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default KotlinAndroidProjects;