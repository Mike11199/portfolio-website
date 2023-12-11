import { useEffect, React, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";

import Heavenly_Ski_Resort_Photo from "../images/heavenly_ski_resort_me.jpg";
import Tent from "../images/tent.jpg";
import IceCavePhoto2 from "../images/me_ice_cave2.jpg";

import AlpinePeakClimbingSkiShop from "./Projects/AlpinePeakClimbingSkiShop";
import ApplyYourSelfJobTracker from "./Projects/ApplyYourSelfJobTracker";
import RSAEncryptionApp from "./Projects/RSAEncryptionApp";
import SpaceTauApp from "./Projects/SpaceTauApp";
import SmallShellProject from "./Projects/SmallShellProject";
import PythonHashMap from "./Projects/PythonHashMap";
import SlashUnrealEngine from "./Projects/SlashUnrealEngine";
import KotlinAndroidProjects from "./Projects/KotlinAndroidProjects";
import OpenGLSolarSystem from "./Projects/OpenGLSolarSystem";

const HomePage = () => {
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

  const youtubeOptions = {
    playerVars: {
      controls: 1,
      showinfo: 0,
      playsinline: 1,
    },
  };

  const handleClick = (site) => {
    setTimeout(function () {
      window.open(site, "_blank");
    }, 130);
  };

  const { width, height } = useWindowSize();

  let playerWidth_Climbing;
  let playerHeight_Climbing;
  let playerWidth_smallsh;
  let playerHeight_smallsh;
  let playerWidth_space_tau;
  let playerHeight_space_tau;

  if (width > 600) {
    playerWidth_Climbing = 400;
    playerHeight_Climbing = 710;
    playerWidth_smallsh = 1080;
    playerHeight_smallsh = 607;
    playerWidth_space_tau = 700;
    playerHeight_space_tau = 394;
  }

  if (width <= 600) {
    playerWidth_Climbing = 250;
    playerHeight_Climbing = 441;
    playerWidth_smallsh = 240;
    playerHeight_smallsh = 135;
    playerWidth_space_tau = 280;
    playerHeight_space_tau = 155;
  }

  return (
    <>
      <div className="entire_page">
        <section id="about">
          <h1>
            About Me <span className="wave">👋</span>
          </h1>
          <div className="about_me_section">
            <div className="wrapper_rock_climbing_video">
              <ReactPlayer
                width={playerWidth_Climbing}
                height={playerHeight_Climbing}
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
                    src={IceCavePhoto2}
                    alt="Michael Iwanek Navbar"
                    className="profile_photo_image_body"
                  />
                  <img
                    src={Heavenly_Ski_Resort_Photo}
                    alt="Michael Iwanek Navbar"
                    className="profile_photo_image_body_2"
                  />
                </div>
                <img
                  src={Tent}
                  alt="Michael Iwanek Navbar"
                  className="tent_image"
                />
              </div>

              <div className="about_me_text">
                <p>Hey there!</p>
                <p>
                  I'm Michael Iwanek and this is my portfolio website to
                  showcase projects I've completed for personal learning and
                  development.
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
                  PC games. I'm hoping to eventually climb multi-pitch routes
                  and get into back-country skiing one day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project # 1 - MERN Full Stack Rock Climbing and Ski Shop - AWS/ECS/Lambda */}
        <AlpinePeakClimbingSkiShop />

        {/* Project # 2 - MERN Full Stack Job Application Tracker*/}
        <ApplyYourSelfJobTracker />

        {/* Project # 3 - Electron.js and React RSA and AES Encryption App - */}
        <RSAEncryptionApp />

        {/* Project # 4 - Space Tau MySQL / Flask and Jinja Database Management App - */}
        <SpaceTauApp />

        {/* Project # 5 - Small Shell Programmed in C - */}
        <SmallShellProject />

        {/* Project # 6 - Python Ground Up Hash Map Implementation - */}
        <PythonHashMap />

        {/* Project # 7 - Android Jetpack Compose and Kotlin Mobile Dev Projects - */}
        <KotlinAndroidProjects />

        {/* Project # 8 - C++ Unreal Engine Project Action RPG Slash */}
        <SlashUnrealEngine />

        {/* Project # 9 - C++ OpenGl Model of the Solar System */}
        <OpenGLSolarSystem />
      </div>
    </>
  );
};

export default HomePage;
