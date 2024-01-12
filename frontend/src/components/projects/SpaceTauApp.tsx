import ReactVideoPlayer from "../utils/ReactVideoPlayer";
import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { spaceTauImages } from "../../images/imageData.json";
import { useBrowserWindowDimensions } from "../utils/Functions";

const SpaceTauApp = () => {
  const { width } = useBrowserWindowDimensions();
  let playerWidthSpaceTau = 700;
  let playerHeightSpaceTau = 395;

  if (width <= 600) {
    playerWidthSpaceTau = 280;
    playerHeightSpaceTau = 160;
  }

  return (
    <>
      <section
        className="space_tau_section"
        style={{ margin: "0px", height: "auto" }}
      >
        <h2 className="projectHeaderText"> SpaceTau-Flask-and-MySQL-App</h2>

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

        {/* Image Carousel */}
        <div className="spaceTauMainContainer">
          <div className="space_tau_carousel_and_video">
            <div className="space_tau_carousel">
              <Carousel
                showIndicators={false}
                width="100%"
                infiniteLoop={true}
                dynamicHeight={true}
                showArrows={true}
              >
                {ImagesList(spaceTauImages)}
              </Carousel>
            </div>

            {/* Embedded YouTube Video */}
            <ReactVideoPlayer
              className={"videoWrapperKSP"}
              width={playerWidthSpaceTau}
              height={playerHeightSpaceTau}
              URL={
                "https://www.youtube.com/watch?v=PLZhliJe3Wk?autoplay=1&modestbranding=1"
              }
            />
          </div>

          {/* Text Description */}
          <div className="textWrapper">
            <ul>
              <li>
                Project programmed in Flask to run Python in a back-end server
                environment, using a Jinja templating system to render HTML and
                JavaScript on the front-end.
              </li>
              <li>
                Implemented a MariaDB backed MySQL database and designed a
                schema for this in MySQL Workbench, to support relationships
                among the database tables. The project serves as a web-based
                application to a fictional database system for a space launch
                services company.
              </li>
              <li>
                Multiple one-to-many relationships are supported, as well as a
                many-to-many relationship between spacecraft and parts via an
                intersection table.
              </li>
              <li>
                Added constraints such as ON CASCADE DELETE to automatically
                allow for child rows to be deleted from a M:N relationship and
                prevent database anomalies. Added foreign key (FK) constraints
                to prevent adding nonsensical relationships between tables, such
                as referencing a FK that doesn't exist.
              </li>
              <li>
                The theme of this project is inspired by my interest in NASA /
                space exploration and Kerbal Space Program (see gameplay video
                below), which has taught me much about physics and orbital
                mechanics in a fun way. I've also dabbled in using C# to
                automate launches in the game with kRPC scripting (remote
                procedure calls), and eventually plan to use Unity/ C# to create
                mods for the game with Visual Studio.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpaceTauApp;
