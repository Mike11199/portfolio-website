import React from 'react';
import { HashLink } from 'react-router-hash-link';
import ImageGallery from 'react-image-gallery';
import Shop_Image_1 from '../images/shop_1.png'
import Shop_Image_2 from '../images/shop_2.png'
import Shop_Image_3 from '../images/shop_3.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomePage = () => {


  return (
<>
        <nav>
            <HashLink smooth to="/#about">
            	About
            </HashLink>
            
            <HashLink smooth to="/#profile">
            	Profile
            </HashLink>
            
            <HashLink smooth to="/#services">
            	Services
            </HashLink>
        </nav>
        
        <section id="about" style={{  marginTop:"76px", marginBottom:"0px"}}>   
          <div style={{height:"40px", marginBottom:"0px"}}></div>       
        	<h1> About</h1>           
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

          <h2 style={{marginBottom:"30px"}}>
            Ski & Rock Climbing E-Commerce Store
          </h2>   
          <div class="project_card">     
              <Carousel width="50%" autoPlay="true">
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

        
        <section id="profile">
        	<h1 style={{margin:"0px", paddingTop:"40px"}}> Profile </h1>
          <p style={{height:"400px", margin:"0px"}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Vero, nam! Iure officia aut esse tempore accusantium
                explicabo? Corporis deleniti ipsa fuga quas aut neque
                dicta nostrum laboriosam, iusto ullam minima est porro,
                totam saepe. Facilis aliquid praesentium, voluptates rem
                quibusdam sequi numquam illo eius adipisci eaque,
                necessitatibus consectetur, labore vero et ipsum.
                Officiis, ea vero. Praesentium, et. Enim, nostrum illo.
            </p>
        </section>
        <footer class="footer">
        </footer>
    </>
  );
}

export default HomePage;