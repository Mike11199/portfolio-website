import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactVideoPlayer from "./utils/ReactVideoPlayer";
import styles from "./styles/AboutMeSection.module.css";
import AboutMeTextCarousel from "./AboutMeTextCarousel";

const AboutMeText = [
  `I'm Michael Iwanek - and this is my portfolio website to showcase
  projects I've completed for personal learning and development.`,

  `I'm currently employed as a full stack software engineer, and am a
  recent graduate from Oregon State University - where I obtained a B.S
  in Computer Science through an accelerated post-bacc program. My first
  degree was in accounting, and I successfully switched careers after
  four years as a CPA in public accounting and government roles.`,

  `I first discovered programming by self-teaching myself VBA to automate
  work tasks, and discovered how much I enjoy working through coding
  problems and building things. I currently work on full stack
  applications using languages such as C#/.NET, Python, TypeScript,
  PostgreSQL, and others as needed for various projects.`,

  `Outside of work and school, I enjoy rock climbing, skiing, and PC
  games. I'm hoping to eventually climb multi-pitch routes and get into
  back-country skiing one day.`,
];

const AboutMeSection = () => {
  return (
    <>
      <section id={styles.aboutMeSection}>
        <h1>
          About Me <span className="wave">👋</span>
        </h1>
        <div className={styles.aboutMeContainer} >
          <div className={styles.aboutMeImagesAndTextWrapper}>
            <div className={styles.aboutMeVideoWrapper}>
              <ReactVideoPlayer
                URL={
                  "https://www.youtube.com/shorts/tDcxweOlAns?autoplay=1&modestbranding=1"
                }
                controls={false}
              />
            </div>
            <AboutMeImagesContainer />
            <AboutMeTextContainer />
          </div>
        </div>
      </section>
    </>
  );
};

const AboutMeImagesContainer = () => {
  return (
    <div className={styles.aboutMeImages}>
      <div className={styles.aboutMeImagesFirstRow}>
        <img
          src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864634/about_me_snowshoe_tunnel_qtqonc.jpg"
          alt="Michael Iwanek Navbar"
          className={styles.aboutMeSnowshoeingPhoto}
        />
        <img
          src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864636/about_me_heavenly_ski_resort_bu4bzj.jpg"
          alt="Michael Iwanek Navbar"
          className={styles.aboutMeSkiingPhoto}
        />
      </div>
      <div className="aboutMeImagesSecondRow">
        <img
          src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864634/about_me_tent_snow_camping_qvoznf.jpg"
          alt="Michael Iwanek Navbar"
          className={styles.tentImage}
        />
      </div>
    </div>
  );
};

const AboutMeTextContainer = () => {
  return (
    <AboutMeTextCarousel descriptionList={AboutMeText} heightProp={"45vh"} />
  );
};

export default AboutMeSection;
