import React from 'react';
import { HashLink } from 'react-router-hash-link';
import Shop_Image_1 from '../images/shop_1.png'
import Shop_Image_2 from '../images/shop_2.png'
import Shop_Image_3 from '../images/shop_3.png'
import Job_Tracker_Gif_1 from '../images/apply_your_self_1.gif'
import Job_Tracker_Gif_2 from '../images/apply_your_self_2.gif'
import Job_Tracker_Home_Page from '../images/apply_your_self_home_page.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import IceCavePhoto from '../images/me_ice_cave.png'
import IceCavePhoto2 from '../images/me_ice_cave2.jpg'
import RSA_Gif from '../images/rsa_encryption_1.gif'
import AES_Gif from '../images/aes_encryption_1.gif'
import RSA_Image from '../images/AESPage.png'
import AES_Image from '../images/RSAPage.png'
import Space_Tau_1 from '../images/space_tau_1.png'
import Space_Tau_2 from '../images/space_tau_2.png'
import Space_Tau_3 from '../images/space_tau_3.png'
import Space_Tau_4 from '../images/space_tau_4.png'
import Space_Tau_5 from '../images/space_tau_5.png'
import Space_Tau_6 from '../images/space_tau_6.png'
import Space_Tau_7 from '../images/space_tau_7.png'

const HomePage = () => {

  return (
<>
          <section id="about" style={{  paddingTop:"140px", marginBottom:"0px", height:"822px"}}>   
          <div style={{height:"40px", marginBottom:"0px"}}></div>       
        	<h1>About Me <span class="wave">👋</span></h1>      
          <div className='about_me_section'>
              <img
                src={IceCavePhoto2}
                alt="Michael Iwanek Navbar"
                class="profile_photo_image_body"
              />  
            <div style={{height:"400px", marginBottom:"0px", paddingRight:"14vh"}}>
            <p>Hey there!</p>
            <p>
            I'm Michael Iwanek and this is my portfolio website to showcase projects I've completed for my personal learning.  
            </p>      
            <p>
            I'm currently a Computer Science student at Oregon State University in an accelerated post-baccalaureate program.  
            My first degree was in accounting, and after graduation I worked for about three years as a CPA in public accounting and government roles.
            </p>     
            <p>
            I first discovered programming by self-teaching myself VBA to automate work tasks, and discovered how much I enjoy working through coding problems and building things.
            </p>         
            <p>
            Outside of work and school, I enjoy rock climbing, skiing, and PC games.  It's on my bucket list to be able to eventually climb multi-pitch routes get into back-country skiing one day.
            </p>         
              
            </div>   
            </div>   
        </section>
        
        <section id="projects" style={{margin:"0px"}}>
        	<h1 style={{margin:"0px"}}> Projects </h1>
          <p style={{height:"auto", marginBottom:"100px"}}>
            Please see full-stack Computer Science projects I've completed below, in various programming languages.
          </p>

          
          <h2 style={{marginBottom:"30px", marginTop:"100px", paddingBottom:"40px"}}>
            Ski & Rock Climbing E-Commerce Store
          </h2>   
          <div class="project_card">     
              <Carousel width="50%" autoPlay="true" infiniteLoop="true">
                    <div>
                        <img alt="shop_1" src={Shop_Image_1} />
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                    <div>
                        <img alt="shop_2" src={Shop_Image_2} />
                        {/* <p className="legend">Legend 2</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Shop_Image_3} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
              </Carousel>
          </div>

        </section>
        <section id="profile"  style={{margin:"0px", height:"1000px"}}>       
          <div style={{margin:"0px"}}>
          <h2 style={{margin:"0px", marginTop:"0px", paddingTop:"40px", paddingBottom:"40px"}}>
           applyYourSelf Job Application Tracker
          </h2>   
          <div class="project_card">     
              <Carousel width="50%" autoPlay="true" infiniteLoop="true" dynamicHeight="true" showArrows="true">
                    <div>
                        <img alt="shop_1" src={Job_Tracker_Gif_1} />
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                    <div>
                        <img alt="shop_2" src={Job_Tracker_Home_Page} />
                        {/* <p className="legend">Legend 2</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Job_Tracker_Home_Page} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
              </Carousel>
          </div>
          </div>
        </section>      
        <section id="projects" style={{margin:"0px", height:"1000px"}}>
          <h2 style={{marginBottom:"30px", marginTop:"0px", paddingBottom:"40px"}}>
            RSA & AES Encryption App - Electron.js, React.js
          </h2>   
          <div class="project_card">     
              <Carousel width="50%" autoPlay="true" infiniteLoop="true">
                    <div>
                        <img alt="shop_1" src={RSA_Gif} />
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                    <div>
                        <img alt="shop_2" src={RSA_Image} />
                        {/* <p className="legend">Legend 2</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={AES_Gif} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={AES_Image} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
              </Carousel>
          </div>

        </section>
        <section id="profile"  style={{margin:"0px", height:"1200px"}}>       
          <div style={{margin:"0px"}}>
          <h2 style={{margin:"0px", marginTop:"0px", paddingTop:"40px", paddingBottom:"40px"}}>          
          SpaceTau-Flask-and-MySQL-App
          </h2>   
          <div class="project_card" style={{marginBottom:"100px"}}>     
              <Carousel width="50%" autoPlay="true" infiniteLoop="true" dynamicHeight="true" showArrows="true">
                    <div>
                        <img alt="shop_1" src={Space_Tau_1} />
                        {/* <p className="legend">Legend 1</p> */}
                    </div>
                    <div>
                        <img alt="shop_2" src={Space_Tau_2} />
                        {/* <p className="legend">Legend 2</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Space_Tau_3} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Space_Tau_4} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Space_Tau_5} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Space_Tau_6} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
                    <div>
                        <img alt="shop_3"src={Space_Tau_7} />
                        {/* <p className="legend">Legend 3</p> */}
                    </div>
              </Carousel>
          </div>
          </div>
        </section>   

    </>
  );
}

export default HomePage;