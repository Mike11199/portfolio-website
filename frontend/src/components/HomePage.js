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
        
        <section id="about">
        	<h1> About</h1>
           
            <p style={{height:"400px"}}>
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
        
        <section id="profile">
        	<h1> Profile </h1>
          <p style={{height:"400px"}}>
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
        
        <section id="Projects">
        	<h1> Projects </h1>
          <p style={{height:"400px"}}>
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