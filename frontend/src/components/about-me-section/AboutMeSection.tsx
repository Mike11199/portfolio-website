import ReactVideoPlayer from "../utils/react-video-player/ReactVideoPlayer";
import styles from "./AboutMeSection.module.css";
import AboutMeTextCarousel from "./AboutMeTextCarousel";
import CodeDemo from "./code-demo/CodeDemo";

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
          About Me
        </h1>
        <div className={styles.aboutMeContainer} >
          <div className={styles.aboutMeImagesAndTextWrapper}>
            <div className={styles.mediaGroup}>
            <div className={styles.aboutMeVideoWrapper}>
              <ReactVideoPlayer
                title="vent5/auburn quarry rock climbing"
                loadingIndicator
                URL={
                  "https://assets.michael-iwanek-portfolio.com/videos/climbing.mp4"
                }
                controls
              />
            </div>
            <AboutMeImagesContainer blackContainer={true} />
            </div>
            <div className={styles.codeDemo}>
              <CodeDemo />
            </div>
            <div className={styles.introduction}>
              <AboutMeTextContainer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutMeImagesContainer = ({ blackContainer = false }: { blackContainer?: boolean }) => {
  return (
    <div className={`${styles.aboutMeImages}${blackContainer ? ` ${styles.photoPanel}` : ""}`}>
      <div className={styles.aboutMeImagesFirstRow}>
        <img
          src="https://assets.michael-iwanek-portfolio.com/images/snowshoe-tunnel.jpg"
          alt="Michael snowshoeing in an ice tunnel"
          className={styles.aboutMeSnowshoeingPhoto}
        />
        <img
          src="https://assets.michael-iwanek-portfolio.com/images/heavenly-ski-resort.jpg"
          alt="Michael skiing at Heavenly"
          className={styles.aboutMeSkiingPhoto}
        />
      </div>
      <div className="aboutMeImagesSecondRow">
        <img
          src="https://assets.michael-iwanek-portfolio.com/images/snow-camping.jpg"
          alt="Tent at a snowy campsite"
          className={styles.tentImage}
        />
      </div>
    </div>
  );
};

const AboutMeTextContainer = () => {
  return (
    <AboutMeTextCarousel descriptionList={AboutMeText} heightProp="45svh" />
  );
};

export default AboutMeSection;
