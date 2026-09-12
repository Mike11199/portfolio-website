import { useScroll, animated } from "@react-spring/web";
import resumePdf from "../../misc/CV_Michael Iwanek.pdf";
import BinaryDigits from "./BinaryDigits";
import styles from "./Navbar.module.css";

const ProfilePhotoWithName = () => (
  <a href="#top" className={styles.navbarLogoNameContainer}>
    <img
      src="https://assets.michael-iwanek-portfolio.com/images/profile.png"
      alt="Michael Iwanek Navbar"
      className={styles.profilePhotoImage}
    />
    <p className={styles.navbarFullName}>Michael Iwanek</p>
  </a>
);

const AnimatedScrollBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <animated.div
      className={styles.myAnimatedDiv}
      style={{ transform: scrollYProgress.to((value) => `scaleX(${value})`) }}
    />
  );
};

const SiteNavLinks = () => (
  <div className={styles.navbarElementContainerLinks}>
    <a className={styles.navbarLink} href="#top">Home</a>
    <a className={styles.navbarLink} href="#projects">Projects</a>
    <a className={styles.navbarLink} href={resumePdf} target="_blank" rel="noopener noreferrer">Resume</a>
    <a className={styles.navbarLink} href="https://www.linkedin.com/in/michael-iwanek/" target="_blank" rel="noopener noreferrer">Contact</a>
  </div>
);

const Navbar = () => (
  <nav className={styles.navbar} aria-label="Main navigation">
    <AnimatedScrollBar />
    <ProfilePhotoWithName />
    <div className={styles.binaryDigitIndividualContainer}>
      <BinaryDigits text="Michael" />
    </div>
    <SiteNavLinks />
  </nav>
);

export default Navbar;
