import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useScroll, animated, useSpring } from "@react-spring/web";
import Resume_PDF from "../misc/CV_Michael Iwanek_12_30_2023.pdf";
import BinaryDigit from "./BinaryDigit";
import { useState } from "react";
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
        <p className={styles.navbarFullName}>Michael Iwanek</p>
      </div>
    );
  };

  const AnimatedScrollBar = () => {
    const [scrollVal, setScrollVal] = useState(0);
    useScroll({
      onChange: ({ value: { scrollYProgress } }) => {
        setScrollVal(scrollYProgress * 100);
      },
    });

    const animatedStyle = useSpring({
      transform: `scaleX(${scrollVal})`,
    });

    return (
      <>
        <animated.div className={styles.myAnimatedDiv} style={animatedStyle} />
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
        <HashLink className={styles.navbarLink} smooth to="./#projectsDivScrollToSection">
          Projects
        </HashLink>
        <Link
          className={styles.navbarLink}
          to={Resume_PDF}
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

  const NameInBinaryDigits = () => {
    const nameInBinary = "Michael".split("").map((char) => {
      const charCode = char.charCodeAt(0);
      const binaryDigits = charCode.toString(2).padStart(8, "0").split("");
      return { letter: char, binaryDigits };
    });

    return (
      <div className={styles.binaryDigitIndividualContainer}>
        {nameInBinary.flatMap((item, index) =>
          item.binaryDigits.map((binary, innerIndex) => (
            <BinaryDigit key={`${index}-${innerIndex}`} content={binary} />
          ))
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.navbar}>
        <AnimatedScrollBar />
        <ProfilePhotoWithName />
        <NameInBinaryDigits />
        <SiteNavLinks />
      </div>
    </>
  );
};

export default Navbar;
