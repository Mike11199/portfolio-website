import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const SpaceTauApp = () => {
  const { width } = useWindowSize();
  let playerWidthSpaceTau;
  let playerHeightSpaceTau;

  if (width > 600) {
    playerWidthSpaceTau = 700;
    playerHeightSpaceTau = 395;
  }

  if (width <= 600) {
    playerWidthSpaceTau = 280;
    playerHeightSpaceTau = 155;
  }

  const youtubeOptions = {
    playerVars: {
      controls: 1,
      showinfo: 0,
      playsinline: 1,
    },
  };

  return (
    <>
      <section
        className="space_tau_section"
        style={{ margin: "0px", height: "auto" }}
      >
        <h2 className="project_header"> SpaceTau-Flask-and-MySQL-App</h2>

        {/* Buttons */}
        <div className="project_buttons">
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

        <div className="project_1_main_div">
          <div className="space_tau_carousel_and_video">
            <div className="space_tau_carousel">
              <Carousel
                width="100%"
                infiniteLoop={true}
                dynamicHeight={true}
                showArrows={true}
              >
                <div>
                  <img
                    alt="space_tau_home_page"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231364/space_tau_home_page_sm0jsp.png"
                  />
                </div>
                <div>
                  <img
                    alt="space_tau_spacecraft_page"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231367/space_tau_spacecraft_page_nzy5ym.png"
                  />
                </div>
                <div>
                  <img
                    alt="space_tau_parts_page"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231366/space_tau_parts_page_tr3sgb.png"
                  />
                </div>
                <div>
                  <img
                    alt="space_tau_intersection_table"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231365/space_tau_intersection_table_wtg2en.png"
                  />
                </div>
                <div>
                  <img
                    alt="space_tau_missions_page"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231365/space_tau_missions_page_lrsuo5.png"
                  />
                </div>
                <div>
                  <img
                    alt="space_tau_planets_page"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231368/space_tau_planets_page_ulinuf.png"
                  />
                </div>
                <div>
                  <img
                    alt="space_tau_mysql_er_diagram"
                    src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703231361/space_tau_mysql_er_diagram_uqkbax.png"
                  />
                </div>
              </Carousel>
            </div>

            <div className="video_wrapper_ksp">
              <ReactPlayer
                width={playerWidthSpaceTau}
                height={playerHeightSpaceTau}
                playing
                url="https://www.youtube.com/watch?v=PLZhliJe3Wk?autoplay=1&modestbranding=1&frameborder=12"
                loop={true}
                muted={true}
                style={{ zIndex: 1 }}
                config={{ youtube: youtubeOptions }}
              />
            </div>
          </div>

          <div className="space_tau_description">
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
