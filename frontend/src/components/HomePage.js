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

const HomePage = () => {

  return (
<>
          <section id="about" style={{  paddingTop:"140px", marginBottom:"0px", height:"822px"}}>   
          <div style={{height:"40px", marginBottom:"0px"}}></div>       
        	<h1>About Me <span class="wave">👋</span></h1>      
          <div className='about_me_section'>
              <img
                src={IceCavePhoto}
                alt="Michael Iwanek Navbar"
                class="profile_photo_image_body"
              />  
            <p style={{height:"400px", marginBottom:"0px"}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Vero, nam! Iure officia aut esse tempore accusantium
                explicabo? Corporis deleniti ipsa fuga quas aut neque
                dicta nostrum laboriosam, iusto ullam minima est porro,
                totam saepe. Facilis aliquid praesentium, voluptates rem
                quibusdam sequi numquam illo eius adipisci eaque,
                necessitatibus consectetur, labore vero et ipsum.
                Officiis, ea vero. Praesentium, et. Enim, nostrum illo.
            </p>        
            </div>   
        </section>
        
        <section id="projects" style={{margin:"0px"}}>
        	<h1 style={{margin:"0px"}}> Projects </h1>
          <p style={{height:"auto", marginBottom:"150px"}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Vero, nam! Iure officia aut esse tempore accusantium
                explicabo? Corporis deleniti ipsa fuga quas aut neque
                dicta nostrum laboriosam, iusto ullam minima est porro,
                totam saepe. Facilis aliquid praesentium, voluptates rem
                quibusdam sequi numquam illo eius adipisci eaque,
                necessitatibus consectetur, labore vero et ipsum.
                Officiis, ea vero. Praesentium, et. Enim, nostrum illo.
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
        <section id="profile"  style={{margin:"0px"}}>       
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
    </>
  );
}

export default HomePage;