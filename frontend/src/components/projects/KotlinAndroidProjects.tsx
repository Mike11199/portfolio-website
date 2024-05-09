import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import CustomTextCarousel from "../CustomTextCarousel";

const KotlinAndroidProjects = () => {
  const kotlinAndroidProjectsDescriptionText = [
    `These are two applications from the Oregon State University
    course CS 492 - Mobile Development, programmed in Kotlin, which
    is a language derived from Java. These apps also use the Jetpack
    Compose framework for state/ UI management.`,

    `Sacramento City App - Code is NOT allowed to be posted to a
    public repo - showing GIF only.`,

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
      <section className="kotlin_section">
        <h2 className="projectHeaderText">
          Kotlin (Jetpack Compose) - Sacramento City and Flight Search App
        </h2>

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

        {/* Side by Side Phone GIFs */}
        <div className="project_card_hash_map" style={{ marginTop: "50px" }}>
          <div className="kotlin_carousel_container">
            <img
              className="kotlin_image"
              alt="sacramento_phone_view_android_app_gif"
              src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442796/android_kotlin_sacramento_app_fdubuz.gif"
            />
          </div>
          <div className="kotlin_carousel_container">
            <img
              className="kotlin_image"
              alt="flight_search_sql_lite_phone_view_android_app_gif"
              src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1702442786/android_kotlin_flight_search_fu06fc.gif"
            />
          </div>

          {/* Text Description  */}
          <CustomTextCarousel
            descriptionList={kotlinAndroidProjectsDescriptionText}
            heightProp={"62vh"}
          />
        </div>
      </section>
    </>
  );
};

export default KotlinAndroidProjects;
