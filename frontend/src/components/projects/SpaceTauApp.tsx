import ReactVideoPlayer from "../utils/ReactVideoPlayer";
import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { spaceTauImages } from "../../images/imageData.json";
import CustomTextCarousel from "../CustomTextCarousel";
import { useWindowWidth } from "@react-hook/window-size";

const SpaceTauApp = () => {
  const spaceTauProjectDescriptionText = [
    `Project programmed in Flask to run Python in a back-end server
    environment, using a Jinja templating system to render HTML and
    JavaScript on the front-end.`,
    `Implemented a MariaDB backed MySQL database and designed a
    schema for this in MySQL Workbench, to support relationships
    among the database tables. The project serves as a web-based
    application to a fictional database system for a space launch
    services company.`,

    `Multiple one-to-many relationships are supported, as well as a
    many-to-many relationship between spacecraft and parts via an
    intersection table.`,

    `Added constraints such as ON CASCADE DELETE to automatically
    allow for child rows to be deleted from a M:N relationship and
    prevent database anomalies. Added foreign key (FK) constraints
    to prevent adding nonsensical relationships between tables, such
    as referencing a FK that doesn't exist.`,
    `                The theme of this project is inspired by my interest in NASA /
    space exploration and Kerbal Space Program (see gameplay video
    below), which has taught me much about physics and orbital
    mechanics in a fun way. I've also dabbled in using C# to
    automate launches in the game with kRPC scripting (remote
    procedure calls), and eventually plan to use Unity/ C# to create
    mods for the game with Visual Studio.`,
  ];

  const windowWidth = useWindowWidth();
  return (
    <>
      <section
        className="space_tau_section"
        style={{ margin: "0px", height: "auto" }}
      >
        <div className={"projectHeaderTextContainer"}>
          <h3 className="projectHeaderText"> SpaceTau-Flask-and-MySQL-App</h3>

          <div className={"devIconsContainer"}>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg"
              alt="mysql logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg"
              alt="python logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original-wordmark.svg"
              alt="mariadb logo"
              style={{
                width: "3.5rem",
                height: "auto",
              }}
            />

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original-wordmark.svg"
              alt="flask logo"
              style={{
                width: "3.5rem",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="projectButtons">
            <GitHubButton
              URL={
                "https://github.com/Mike11199/SpaceTau-Flask-and-MySQL-App-CS340"
              }
            />
            <ButtonLink
              URL={"https://spacetau.herokuapp.com/"}
              variant={"blue"}
              buttonText={"Live Website Link"}
            />
          </div>
        </div>

        {/* Image Carousel */}
        <div className="spaceTauMainContainer">
          <div className="space_tau_carousel_and_video">
            <div className="space_tau_carousel">
              <Carousel
                swipeable={false}
                emulateTouch={false}
                showIndicators={false}
                width="100%"
                infiniteLoop={true}
                dynamicHeight={true}
                showArrows={true}
                showThumbs={windowWidth > 600}
              >
                {ImagesList(spaceTauImages)}
              </Carousel>
            </div>

            {/* Embedded YouTube Video */}
            <div className="videoWrapperKSP">
              <ReactVideoPlayer
                URL={
                  "https://www.youtube.com/watch?v=wl0nVNRrcf0?autoplay=1&modestbranding=1"
                }
              />
            </div>
          </div>

          {/* Text Description */}
          <CustomTextCarousel
            descriptionList={spaceTauProjectDescriptionText}
            heightProp={"62vh"}
          />
        </div>
      </section>
    </>
  );
};

export default SpaceTauApp;
