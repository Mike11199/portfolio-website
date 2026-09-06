import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ProjectSection from "./ProjectSection";
import ProjectMediaFrame from "./ProjectMediaFrame";
import ProjectMediaSlide from "../utils/ProjectMediaSlide";

const KotlinAndroidProjects = () => {
  const kotlinAndroidProjectsDescriptionText = [
    `These are two applications from the Oregon State University
    course CS 492 - Mobile Development, programmed in Kotlin, which
    is a language derived from Java. These apps also use the Jetpack
    Compose framework for state/ UI management.`,

    `Sacramento City App - Code is NOT allowed to be posted to a
    public repo - showing a demo recording only.`,

    `Flight Search App - This is the portfolio project and is
    allowed to be posted to a public repo per the Syllabus.`,

    `The Flight Search App persists data using a SQLite database and
    the Room API, which provides abstraction to the database layer
    of the app. This allows us to define SQL queries in DAOs (Data
    Access Objects) to perform CRUD operations more easily.
    Coroutines are also used so that database actions are
    asynchronous and don't block the main thread.`,

    `Uses Jetpack Compose features such as data classes, composables,
    and LazyColumns to enable scrolling through list collections of
    Categories and Recommendations. Modifiers are used to style the
    UI. Collections of data used in the app are defined in a
    DataSource class, holding functions to return items.`,

    `Makes use of the ViewModel architecture component to hold and
    expose the state displayed by the UI and retain it upon
    configuration changes. Instead of defining routes with a
    NavController, the state is used to conditionally render
    different composable functions/screens. The UI state is defined
    as a data class in Kotlin which can be accessed by various
    composables.`,

    `Models for various items in the app are defined in data classes,
    which are intended to hold data without the boilerplate code
    needed in Java for getter/setter functions - https://www.baeldung.com/kotlin/data-classes.`,
  ];
  return (
    <>
      <section className="portfolio-project kotlin_section">
        <div className={"projectHeaderTextContainer"}>
          <h3 className="projectHeaderText">
            Kotlin (Jetpack Compose) - Sacramento City and Flight Search App
          </h3>

          <div className={"devIconsContainer"}>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg"
              alt="android studio logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-plain-wordmark.svg"
              alt="kotlin logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg"
              alt="java logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jetpackcompose/jetpackcompose-original-wordmark.svg"
              alt="jetpack compose logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="projectButtons">
            <GitHubButton
              URL={
                "https://github.com/Mike11199/CS-492-Assignment-5-Flight-Search-App"
              }
            />
            <ButtonLink
              URL={"https://www.youtube.com/watch?v=hwGGgglHlus"}
              variant={"red"}
              buttonText={"Video Link"}
            />
          </div>
        </div>

        <ProjectSection
          media={
            <ProjectMediaFrame paired background="transparent">
              <ProjectMediaSlide media={{
                alt: "Sacramento city Android app demo",
                src: "https://res.cloudinary.com/dwgvi9vwb/video/upload/v1788654731/portfolio-webm/android_kotlin_sacramento_app_fdubuz.webm",
                poster: "https://res.cloudinary.com/dwgvi9vwb/image/upload/v1788654733/portfolio-webm/android_kotlin_sacramento_app_fdubuz_poster.jpg",
              }} />
              <ProjectMediaSlide media={{
                alt: "Flight search Android app demo",
                src: "https://res.cloudinary.com/dwgvi9vwb/video/upload/v1788654725/portfolio-webm/android_kotlin_flight_search_fu06fc.webm",
                poster: "https://res.cloudinary.com/dwgvi9vwb/image/upload/v1788654727/portfolio-webm/android_kotlin_flight_search_fu06fc_poster.jpg",
              }} />
            </ProjectMediaFrame>
          }
          description={kotlinAndroidProjectsDescriptionText}
        />
      </section>
    </>
  );
};

export default KotlinAndroidProjects;
