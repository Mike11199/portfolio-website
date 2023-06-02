import React from 'react';
import { HashLink } from 'react-router-hash-link';

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
        
        <section id="profile" style={{margin:"0px"}}>
        	<h1 style={{margin:"0px"}}> Profile </h1>
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
        
        <section id="projects">
        	<h1 style={{margin:"0px", paddingTop:"40px"}}> Projects </h1>
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