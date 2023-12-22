import Space_Tau_1 from "../../images/space_tau_1.png";
import Space_Tau_2 from "../../images/space_tau_2.png";
import Space_Tau_3 from "../../images/space_tau_3.png";
import Space_Tau_4 from "../../images/space_tau_4.png";
import Space_Tau_5 from "../../images/space_tau_5.png";
import Space_Tau_6 from "../../images/space_tau_6.png";
import Space_Tau_7 from "../../images/space_tau_7.png";

import GitHubLogo from "../../images/github_button_logo.png";
import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import { useEffect, React, useState } from "react";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

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
  const { width, height } = useWindowSize();
  let playerWidth_space_tau;
  let playerHeight_space_tau;

  if (width > 600) {
    playerWidth_space_tau = 700;
    playerHeight_space_tau = 394;
  }

  if (width <= 600) {
    playerWidth_space_tau = 280;
    playerHeight_space_tau = 155;
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
      {/* SECTION FOR PROJECT #4 */}
      <section
        className="space_tau_section"
        style={{ margin: "0px", height: "auto" }}
      >
        <h2 className="project_header"> SpaceTau-Flask-and-MySQL-App</h2>
        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick(
                "https://github.com/Mike11199/SpaceTau-Flask-and-MySQL-App-CS340"
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
            onClick={() => handleClick("https://spacetau.herokuapp.com/")}
          >
            Live Website Link
          </button>
        </div>
        <div className="project_1_main_div">
          <div className="space_tau_carousel_and_video">
            <div className="space_tau_carousel">
              <Carousel
                width="100%"
                infiniteLoop="true"
                dynamicHeight="true"
                showArrows="true"
              >
                <div>
                  <img alt="space_tau_1" src={Space_Tau_1} />
                </div>
                <div>
                  <img alt="space_tau_2" src={Space_Tau_2} />
                </div>
                <div>
                  <img alt="space_tau_3" src={Space_Tau_3} />
                </div>
                <div>
                  <img alt="space_tau_4" src={Space_Tau_4} />
                </div>
                <div>
                  <img alt="space_tau_5" src={Space_Tau_5} />
                </div>
                <div>
                  <img alt="space_tau_6" src={Space_Tau_6} />
                </div>
                <div>
                  <img alt="space_tau_7" src={Space_Tau_7} />
                </div>
              </Carousel>
            </div>

            <div className="video_wrapper_ksp">
              <ReactPlayer
                width={playerWidth_space_tau}
                height={playerHeight_space_tau}
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
