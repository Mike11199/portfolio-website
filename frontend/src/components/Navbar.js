import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import IceCavePhoto from "../images/me_ice_cave.png";
import { useScroll, animated, useSpring } from "react-spring";
import { useState } from "react";
import Resume_PDF from "../misc/CV_Michael Iwanek_10_11_2023.pdf";
import BinaryDigit from "./BinaryDigit";

const Navbar = () => {
  const [scrollVal, setScrollVal] = useState(0);
  const { scrollYProgress } = useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      setScrollVal(scrollYProgress * 100);
    },
  });

  const handleContactClick = () => {
    window.open("https://www.linkedin.com/in/michael-iwanek/", "_blank");
  };

  const name = "Michael";

  const nameInBinary = name.split("").map((char) => {
    const charCode = char.charCodeAt(0);
    const binaryDigits = charCode.toString(2).padStart(8, "0").split("");
    return { letter: char, binaryDigits };
  });

  // console.log(nameInBinary)
  return (
    <>
      <div className="navbar">
        <animated.div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            transform: `scaleX(${scrollVal})`,
            background: "darkred",
            height: "5px",
            width: "2%",
          }}
        ></animated.div>

        <div className="profile_photo">
          <img
            src={IceCavePhoto}
            alt="Michael Iwanek Navbar"
            className="profile_photo_image"
          />
        </div>
        <p className="navbar_name_me">Michael Iwanek</p>

        <div className="binary_digit_row">
          {nameInBinary.map((item, index) => (
            <div className="binary_digit_divs" key={index}>
              {/* {console.log(item)} */}
              {item.binaryDigits.map((binary, innerIndex) => (
                <BinaryDigit key={innerIndex} content={binary} />
              ))}
            </div>
          ))}
        </div>

        {/* <Link className="navbar_link" to="/">Home</Link> */}
        <HashLink className="navbar_link" smooth to="#top">
          Home
        </HashLink>
        {/* <Link className="navbar_link" to="/rsa">About</Link> */}
        <HashLink className="navbar_link" smooth to="./#projects_section">
          Projects
        </HashLink>
        <Link
          className="navbar_link"
          to={Resume_PDF}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </Link>
        <Link className="navbar_link" onClick={handleContactClick}>
          Contact
        </Link>
      </div>
    </>
  );
};

export default Navbar;
