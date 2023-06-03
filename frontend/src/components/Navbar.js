import { Link } from "react-router-dom";
import '../App.css'; // Import the CSS file
import { HashLink } from 'react-router-hash-link';
import IceCavePhoto from '../images/me_ice_cave.png'


const Navbar = () => {
  return (
        <>
        <div className="navbar">
            <div class="profile_photo">
              <img
                src={IceCavePhoto}
                alt="Michael Iwanek Navbar"
                class="profile_photo_image"
              />
            </div>
            <p style={{color:"white", fontWeight: 150, fontFamily: "Segoe UI", fontSize: "35px", paddingRight:"90vh", textTransform: "uppercase", color:"white"}}>Michael Iwanek</p>
            <Link className="navbar_link" to="/">Home</Link>
            <Link className="navbar_link" to="/rsa">About</Link>
            <HashLink className="navbar_link" smooth to="/#Projects">
              Projects
            </HashLink>            
            <Link className="navbar_link" to="/base64">Resume</Link>
            <Link className="navbar_link" to="/tutorial">Contact</Link>
        </div>
        </>
  );
}

export default Navbar;