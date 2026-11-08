import type { ProjectContent } from "../components/project-summary/ProjectSummary.types";
import { AndroidStudioIcon, KotlinIcon, JavaIcon, JetpackComposeIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./KotlinAndroidProjects.css";
import { useState } from "react";
import ButtonLink from "../../utils/buttons/ButtonLink";
import ProjectSection from "../components/project-section/ProjectSection";
import ProjectMediaFrame from "../components/project-media-frame/ProjectMediaFrame";
import ProjectMediaSlide from "../../utils/project-image-carousel/ProjectMediaSlide";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import CodeViewButton from "../../utils/buttons/CodeViewButton";

const projectContent = {
  "title": "Kotlin (Jetpack Compose) - City and Flight Search App",
  "category": "MOBILE DEVELOPMENT / JETPACK COMPOSE",
  "highlights": [
    {
      "heading": "Overview",
      "text": "Sacramento City and Flight Search are Kotlin Android applications built for OSU CS 492. Jetpack Compose provides declarative interfaces for browsing recommendations and flight data."
    },
    {
      "heading": "State",
      "text": "ViewModel exposes UI state through Kotlin data classes and retains it across configuration changes. State determines which composable screen is rendered."
    },
    {
      "heading": "Persistence",
      "text": "Flight Search uses SQLite through Room, with DAO-defined SQL queries for database operations. Coroutines keep database work asynchronous and off the main thread."
    },
    {
      "heading": "Interface & source",
      "text": "LazyColumn renders scrolling collections, with Compose modifiers controlling presentation. Flight Search source is public; Sacramento City is shown as a recording under course restrictions."
    }
  ],
  "detailGroups": [
    {
      "heading": "Overview",
      "paragraphs": [
        0
      ]
    },
    {
      "heading": "Compose Interface",
      "paragraphs": [
        4
      ]
    },
    {
      "heading": "State & Data Models",
      "paragraphs": [
        5,
        6
      ]
    },
    {
      "heading": "Database & Coroutines",
      "paragraphs": [
        3
      ]
    },
    {
      "heading": "Projects & Source Availability",
      "paragraphs": [
        1,
        2
      ]
    }
  ],
  "technologies": ["Kotlin", "Jetpack Compose", "SQLite", "Room"]
} satisfies ProjectContent;

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
  const [showCode, setShowCode] = useState(false);
  const repositoryUrl = "https://github.com/Mike11199/CS-492-Assignment-5-Flight-Search-App";

  return (
    <>
      <section className="portfolio-project kotlin_section">
        <ProjectHeader
          title={projectContent.title}
          category={projectContent.category}
          technologies={projectContent.technologies}
          icons={
            <>
              <AndroidStudioIcon />
              <KotlinIcon />
              <JavaIcon />
              <JetpackComposeIcon />
            </>
          }
          actions={
            <>
              <RepositoryActions
                repositoryUrl={repositoryUrl}
              />
              <ButtonLink
                URL={"https://assets.michael-iwanek-portfolio.com/videos/kotlin-android.mp4"}
                variant={"red"}
                buttonText={"Video Link"}
              />
              <CodeViewButton
                standalone
                mediaLabel="Videos"
                showCode={showCode}
                onToggleCode={() => setShowCode((visible) => !visible)}
              />
            </>
          }
        />

        <ProjectSection
          content={projectContent}
          mediaLayout="phone"
          showCode={showCode}
          code={
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="CS-492-Assignment-5-Flight-Search-App"
              />
          }
          media={
              <ProjectMediaFrame layout="phone" background="transparent">
                <ProjectMediaSlide media={{
                  alt: "Sacramento city Android app demo",
                  src: "https://assets.michael-iwanek-portfolio.com/videos/android-kotlin-sacramento-app.webm",
                  poster: "https://assets.michael-iwanek-portfolio.com/images/android-kotlin-sacramento-app-poster.jpg",
                }} />
                <ProjectMediaSlide media={{
                  alt: "Flight search Android app demo",
                  src: "https://assets.michael-iwanek-portfolio.com/videos/android-kotlin-flight-search.webm",
                  poster: "https://assets.michael-iwanek-portfolio.com/images/android-kotlin-flight-search-poster.jpg",
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
