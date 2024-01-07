import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";

import HeavenlySkiResortPhoto from "../images/about_me_heavenly_ski_resort.jpg";
import WinterCampingTentPhoto from "../images/about_me_tent_snow_camping.jpg";
import DonnerTunnelSnowshoeingPhoto from "../images/about_me_snowshoe_tunnel.jpg";

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const AboutMeSection = () => {
  const { width } = useWindowSize();

  let playerWidthClimbing;
  let playerHeightClimbing;

  if (width > 600) {
    playerWidthClimbing = 400;
    playerHeightClimbing = 710;
  } else {
    playerWidthClimbing = 250;
    playerHeightClimbing = 440;
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
      <section id="about">
        <h1>
          About Me <span className="wave">👋</span>
        </h1>
        <div className="about_me_section">
          <div className="wrapper_rock_climbing_video">
            <ReactPlayer
              width={playerWidthClimbing}
              height={playerHeightClimbing}
              playing
              url="https://www.youtube.com/shorts/R_NyGXwE6vY?autoplay=1&modestbranding=1&frameborder=12"
              loop={true}
              muted={true}
              style={{ zIndex: 1 }}
              config={{
                youtube: youtubeOptions,
              }}
            />
          </div>

          <div className="project_1_main_div">
            <div className="about_me_images">
              <div className="about_me_images2">
                <img
                  src={DonnerTunnelSnowshoeingPhoto}
                  alt="Michael Iwanek Navbar"
                  className="about_me_snowshoeing_photo"
                />
                <img
                  src={HeavenlySkiResortPhoto}
                  alt="Michael Iwanek Navbar"
                  className="about_me_ski_photo"
                />
              </div>
              <img
                src={WinterCampingTentPhoto}
                alt="Michael Iwanek Navbar"
                className="tent_image"
              />
            </div>

            <div className="text_wrapper_about_me">
              <p>Hello!</p>
              <p>
                I'm Michael Iwanek and this is my portfolio website to showcase
                projects I've completed for personal learning and development.
              </p>
              <p>
                I'm currently a Computer Science student at Oregon State
                University in an accelerated post-baccalaureate program. My
                first degree was in accounting, and after graduation I worked
                for about three years as a CPA in public accounting and
                government roles.
              </p>
              <p>
                I first discovered programming by self-teaching myself VBA to
                automate work tasks, and discovered how much I enjoy working
                through coding problems and building things.
              </p>
              <p>
                Outside of work and school, I enjoy rock climbing, skiing, and
                PC games. I'm hoping to eventually climb multi-pitch routes and
                get into back-country skiing one day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMeSection;
