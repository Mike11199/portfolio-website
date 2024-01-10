import { useBrowserWindowDimensions } from "./utils/Functions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactVideoPlayer from "./utils/ReactVideoPlayer";

const AboutMeSection = () => {
  const { width } = useBrowserWindowDimensions();

  let playerWidthClimbing = 400;
  let playerHeightClimbing = 710;

  if (width <= 600) {
    playerWidthClimbing = 250;
    playerHeightClimbing = 440;
  }

  return (
    <>
      <section id="about">
        <h1>
          About Me <span className="wave">👋</span>
        </h1>
        <div className="about_me_section">
          {/* Rock Climbing Video - Vent5 */}
          <ReactVideoPlayer
            className={"videoWrapperRockClimbing"}
            width={playerWidthClimbing}
            height={playerHeightClimbing}
            URL={
              "https://www.youtube.com/shorts/R_NyGXwE6vY?autoplay=1&modestbranding=1"
            }
          />

          <div className="project_1_main_div">
            {/* Images of Self */}
            <div className="about_me_images">
              <div className="about_me_images2">
                <img
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864634/about_me_snowshoe_tunnel_qtqonc.jpg"
                  alt="Michael Iwanek Navbar"
                  className="about_me_snowshoeing_photo"
                />
                <img
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864636/about_me_heavenly_ski_resort_bu4bzj.jpg"
                  alt="Michael Iwanek Navbar"
                  className="about_me_ski_photo"
                />
              </div>
              <img
                src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864634/about_me_tent_snow_camping_qvoznf.jpg"
                alt="Michael Iwanek Navbar"
                className="tent_image"
              />
            </div>

            {/* Self Text Intro */}
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
