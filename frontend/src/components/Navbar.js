import { Link } from "react-router-dom";
import '../App.css'; // Import the CSS file
import { HashLink } from 'react-router-hash-link';
import IceCavePhoto from '../images/me_ice_cave.png'
import { useScroll, animated } from "react-spring";
import { useState } from "react";
import Resume_PDF from '../misc/CV_Small.pdf';


const Navbar = () => {

  const [scrollVal, setScrollVal] = useState(0)

  const { scrollYProgress } = useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      setScrollVal(scrollYProgress * 100);
    }
  });

  const handleContactClick = () => {
    window.open("https://www.linkedin.com/in/michael-iwanek/", "_blank");
  };

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
          // borderRadius: "1px"
        }}
      ></animated.div>

            <div class="profile_photo">
              <img
                src={IceCavePhoto}
                alt="Michael Iwanek Navbar"
                class="profile_photo_image"
              />
            </div>
            <p style={{color:"white", fontWeight: 150, fontFamily: "Segoe UI", fontSize: "35px", paddingRight:"90vh", textTransform: "uppercase", color:"white"}}>Michael Iwanek</p>
            {/* <Link className="navbar_link" to="/">Home</Link> */}
            <HashLink className="navbar_link" smooth to="./#about_me_section">
              Home
            </HashLink>       
            {/* <Link className="navbar_link" to="/rsa">About</Link> */}
            <HashLink className="navbar_link" smooth to="./#projects_section">
              Projects
            </HashLink>            
            <Link className="navbar_link"to={Resume_PDF} target="_blank" rel="noopener noreferrer">Resume</Link>
            <Link className="navbar_link" onClick={handleContactClick}>Contact</Link>
        </div>
        </>
  );
}

export default Navbar;