import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useScroll, animated } from "@react-spring/web";
import resumePdf  from "../misc/CV_Michael Iwanek.pdf";  // 04_12_2025
import BinaryDigits from "./BinaryDigits";
import styles from "./styles/Navbar.module.css";

const Navbar = () => {
  const ProfilePhotoWithName = () => {
    return (
      <div className={styles.navbarLogoNameContainer}>
        <img
          src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1704864634/profile_photo_snowshoe_tunnel_e8zff8.png"
          alt="Michael Iwanek Navbar"
          className={styles.profilePhotoImage}
        />
        <p 
        onClick={()=> window.location.href = '/'}
        className={styles.navbarFullName}>
          Michael Iwanek</p>
      </div>
    );
  };

  const AnimatedScrollBar = () => {
    const { scrollYProgress } = useScroll();

    return (
      <>
        <animated.div
          className={styles.myAnimatedDiv}
          style={{ transform: scrollYProgress.to((value) => `scaleX(${value})`) }}
        />
      </>
    );
  };

  const SiteNavLinks = () => {
    const handleContactClick = () => {
      window.open("https://www.linkedin.com/in/michael-iwanek/", "_blank");
    };

    return (
      <div className={styles.navbarElementContainerLinks}>
        <HashLink className={styles.navbarLink} smooth to="#top">
          Home
        </HashLink>
        <HashLink className={styles.navbarLink} smooth to="./#projects">
          Projects
        </HashLink>
        <Link
          className={styles.navbarLink}
          to={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </Link>
        <Link to="/" className={styles.navbarLink} onClick={handleContactClick}>
          Contact
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className={styles.navbar}>
        <AnimatedScrollBar />
        <ProfilePhotoWithName />
        <div className={styles.binaryDigitIndividualContainer}>
          <BinaryDigits text="Michael" />
        </div>
        <SiteNavLinks />
      </div>
    </>
  );
};

export default Navbar;
