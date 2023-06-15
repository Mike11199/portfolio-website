import { useEffect, React, useState } from 'react';
import Shop_Image_1 from '../images/shop_1.png'
import Shop_Image_2 from '../images/shop_2.png'
import Shop_Image_3 from '../images/shop_3.png'
import Shop_Image_4 from '../images/shop_4.png'
import Shop_Image_5 from '../images/shop_5.png'
import Shop_Image_6 from '../images/shop_6.png'
import Job_Tracker_Gif_1 from '../images/apply_your_self_1.gif'
import Job_Tracker_Home_Page from '../images/apply_your_self_home_page.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
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
import ReactPlayer from 'react-player'
import Job_Tracker_1 from '../images/job_tracker_1.png'
import Job_Tracker_2 from '../images/job_tracker_2.png'
import Job_Tracker_3 from '../images/job_tracker_3.png'
import Editing_Ski_Photo from '../images/editing_ski_photo_GIMP.gif'
import Heavenly_Ski_Resort_Photo from '../images/heavenly_ski_resort_me.jpg'
import GitHubLogo from '../images/github_1.png'
import Hash_Map_Image_1 from '../images/hash_map_1.png'
import Hash_Map_Image_2 from '../images/hash_map_2.png'
import Hash_Map_GIF_1 from '../images/hash_map_sc.gif'
import Tent from '../images/tent.jpg'
import Home_GIF from '../images/home_page_new.gif'



const HomePage = () => {


  function useWindowSize() {
    
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
      window.addEventListener('resize', handleResize);
      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowSize;
  }

  const youtubeOptions = {
    playerVars: {
      controls: 1,
      showinfo: 0,
      playsinline: 1,
    }}

    const handleClick = (site) => {
      setTimeout(function() {
        window.open(site, '_blank');
      }, 130);
    };
    
    const { width, height } = useWindowSize();

    let playerWidth_Climbing;
    let playerHeight_Climbing;
    let playerWidth_smallsh;
    let playerHeight_smallsh;
    let playerWidth_space_tau;
    let playerHeight_space_tau;

    if (width > 600) {
      playerWidth_Climbing = 400;
      playerHeight_Climbing = 710;      
      playerWidth_smallsh = 1080;
      playerHeight_smallsh = 607;
      playerWidth_space_tau = 700;
      playerHeight_space_tau = 394;
    }
  
    if (width <= 600) {
      playerWidth_Climbing = 250;
      playerHeight_Climbing = 441;
      playerWidth_smallsh = 240;
      playerHeight_smallsh = 135;
      playerWidth_space_tau = 280;
      playerHeight_space_tau = 155;
    }

  return (
<>
<div className='entire_page'>
        
        
        <section id="about" >    
        
          <h1>About Me <span className="wave">👋</span></h1>      
          <div className='about_me_section'>           
            <div className='wrapper_rock_climbing_video'>
                <ReactPlayer   
                  width={playerWidth_Climbing}
                  height={playerHeight_Climbing}      
                  playing
                  url="https://www.youtube.com/shorts/R_NyGXwE6vY?autoplay=1&modestbranding=1&frameborder=12"
                  loop={true}
                  muted={true}
                  style={{zIndex:1}}
                  config={{
                    youtube: youtubeOptions,
                  }}
                />
            </div>

            <div className="project_1_main_div">
            <div className="about_me_images">
            <div className="about_me_images2">
              <img src={IceCavePhoto2} alt="Michael Iwanek Navbar" className="profile_photo_image_body"/>                 
              <img src={Heavenly_Ski_Resort_Photo} alt="Michael Iwanek Navbar" className="profile_photo_image_body_2"/>    
            </div>
              <img src={Tent} alt="Michael Iwanek Navbar" className="tent_image"/>    
            </div>
                      
            <div className='about_me_text'>
              <p>Hey there!</p>
              <p>
              I'm Michael Iwanek and this is my portfolio website to showcase projects I've completed for personal 
              learning and development.  
              </p>      
              <p>
              I'm currently a Computer Science student at Oregon State University in an accelerated post-baccalaureate 
              program.  My first degree was in accounting, and after graduation I worked for about three years as a CPA 
              in public accounting and government roles.
              </p>     
              <p>
              I first discovered programming by self-teaching myself VBA to automate work tasks, and discovered how much 
              I enjoy working through coding problems and building things.
              </p>         
              <p>
              Outside of work and school, I enjoy rock climbing, skiing, and PC games.  I'm hoping to eventually climb 
              multi-pitch routes and get into back-country skiing one day.
              </p>                       
              </div>  
            </div>
    
          </div>   
            
        </section>



        {/* SECTION FOR PROJECT #1 */}
        <div id="projects_section"></div>
        <section className='ski_shop_section'>
        	<h1 style={{margin:"0px"}}> Projects </h1>
          <p style={{height:"auto", marginBottom:"100px"}}>
            Please see full-stack Computer Science projects I've completed below, in various programming languages.
          </p>        
          <h2 className='project_header'>Ski & Rock Climbing E-Commerce Store</h2>    
          <div className="project_buttons">         
          <button className="github_button" onClick={() => handleClick("https://github.com/Mike11199/rock-climbing-and-ski-shop-mern-stack")}>
            <img className='github_logo' src={GitHubLogo} alt="github logo"></img>
            GitHub Link
          </button>
          <button className="website_button" onClick={() => handleClick("https://recreational-equipment-shop.herokuapp.com/")}>
            Live Website Link
          </button>
          </div>
          <div className="project_card_ski_shop">
                                       
              <div className="carousel_ski_shop">     
                  <Carousel width="100%" infiniteLoop="true">                        
                        <div><img alt="shop_1" src={Shop_Image_1} /></div>
                        <div><img alt="home_gif" src={Home_GIF} /></div>
                        <div><img alt="shop_2" src={Shop_Image_2} /></div>
                        <div><img alt="shop_3"src={Shop_Image_3} /></div>
                        <div><img alt="shop_4"src={Shop_Image_4} /></div>
                        <div><img alt="shop_5"src={Shop_Image_5} /></div>
                        <div><img alt="shop_6"src={Shop_Image_6} /></div>
                        <div><img alt="shop_6"src={Editing_Ski_Photo} /></div>
                  </Carousel>
              </div>


              <div className='text_description_ski_shop'>
                <ul>
                  <li>
                    A complex full-stack website (REI/Amazon clone) where users can search for products, 
                    add them to a cart, and submit/pay for an order with PayPal. An Admin dashboard allows 
                    for product/inventory management, and real-time statistics/user chats.  
                  </li>
                  <li>
                    Used the PayPal SDK and sandbox accounts to simulate live payments of orders by the website, 
                    sending order info to PayPal and marking an order as paid in the MongoDB database depending 
                    on the external API response.
                  </li>
                  <li>
                    Implemented Socket.IO to allow for bi-directional client and server communication, to enable real-time 
                    messaging between a logged in admin and user. Used Redux for global state management and Bootstrap to 
                    develop React components.
                  </li>
                  <li>
                    Modeled complicated database relationships between products, orders, and users using embedded MongoDB documents.
                  </li>
                  <li>
                    Added Google OAuth2.0 Log In, decoding JWT credentials from Google, and locating the user by email in MongoDB 
                    to verify the user.
                  </li>
                </ul> 
              </div>

          </div>

        </section>
       


       
        {/* SECTION FOR PROJECT #2 */}
        <section className='apply_yourself_section'>       
          
          <h2 className='project_header'>
          applyYourSelf Job Application Tracker  
          </h2>   

          <div className="project_buttons">             
            <button className="github_button" onClick={() => handleClick("https://github.com/Mike11199/applyYourSelf-Job-Tracker")}>
              <img className='github_logo' src={GitHubLogo} alt="github logo"></img>
              GitHub Link
            </button>
            <button className="website_button" onClick={() => handleClick("https://applyyourself-tracker-prod.herokuapp.com")}>
              Live Website Link
            </button>
          </div>


          <div className="project_card_apply_yourself">        

              <div className='carousel_apply_yourself'>  
                    <Carousel width="100%" infiniteLoop="true" dynamicHeight="true" showArrows="true">
                          <div><img alt="tracker_1" src={Job_Tracker_Gif_1} /></div>
                          <div><img alt="tracker_3"src={Job_Tracker_1} /></div>                          
                          <div><img alt="tracker_2"src={Job_Tracker_Home_Page} /></div>                          
                          <div><img alt="tracker_4"src={Job_Tracker_2} /></div>
                          <div><img alt="tracker_5"src={Job_Tracker_3} /></div>
                    </Carousel>
                </div>
            

              <div className='text_apply_your_self'>
                <ul>
                  <li>
                  Full-stack MERN web application that allows multiple users to track their job application history on one convenient 
                  website from anywhere. Allows jobs to be searched, sorted by date, name, and categorized by application status with full 
                  CRUD functionality.
                  </li> 
                  <li>
                  A dashboard shows statistical data visually via a Bar chart and Sankey chart, showing which jobs led 
                  to subsequent interviews and applications per month. Detailed notes can also be added to each job's history.               
                  </li>
                  <li>
                  Features are implemented by several REST APIs, allowing user registration and login via Express.js routes, such as google 
                  OAuth 2.0. Back-end is run on Node.js connected to a MongoDB NoSQL database, with collections mapped to various Mongoose schema 
                  for Users/Jobs. 
                  </li>
                  <li>
                  Uses JWT bearer-tokens to access restricted pages, password hashing (brypt.js), and private API routes using Axios 
                  interceptors so users can only access their own data. 
                  </li>
                  <li>
                  Added various controllers to the APIs for jobs/user routes to implement error handling, user authentication, and not-found middleware. 
                  Used Postman to test HTTP requests made with Axios by the front-end to the server and check JSON responses. Features React.js reducers/actions 
                  to update the global state (React Context) and various statistics used to generate charts (Sankey, Bar Chart, etc.).
                  </li>
                </ul> 
              </div>

    
          </div>    


        </section>      




        {/* SECTION FOR PROJECT #3 */}
        <section className="rsa_section">                           
          <h2 className='project_header'>RSA & AES Encryption App - Electron.js, React.js</h2>             
         
          {/* Buttons */}
          <div className="project_buttons">             
            <button className="github_button" onClick={() => handleClick("https://github.com/Mike11199/CS-361-RSA-React-App")}>
            <img className='github_logo' src={GitHubLogo} alt="github logo"></img>
              GitHub Link
            </button>
            <button className="website_button" onClick={() => handleClick("https://rsa-react-app.herokuapp.com/")}>
              Live Website Link
            </button>
            <button className="video_button" onClick={() => handleClick("https://www.youtube.com/watch?v=MQKmV63Wfbk")}>
              Video Link
            </button>
          </div>
          
          <div className="project_card_rsa_encryption">

            <div className="carousel_rsa_encryption">     
              <Carousel width="100%" infiniteLoop="true">
                      <div><img alt="rsa_1" src={RSA_Gif} /></div>
                      <div><img alt="rsa_2" src={RSA_Image} /></div>
                      <div><img alt="aes_1"src={AES_Gif} /></div>
                      <div><img alt="aes_2"src={AES_Image} /></div>
              </Carousel>
            </div>           

            <div className='text_description_rsa'>
            <ul>
              <li>
              Developed an Electron.js (local exe) and web application to allow a user to encrypt/decrypt text 
              with RSA and AES encryption, using front end technologies. 
              </li>
              <li>
              Displayed RSA/AES keys and ciphertext as encoded in Base64, to allow for bits outside normal character encoding to be 
              viewable as a text string on the website.
              </li>
              <li>
              Added tutorials to allow for a user to follow along to the website using a CLI approach and the openssl 
              library. The library is fully compatible with the RSA encryption used by the website, allowing a user to 
              store their private key locally, use the website to encrypt with a public key, and then use AES locally 
              with the CLI to exchange files/text. This approach is completely secure as only text encrypted by the public
              key is exchanged over the web (the encrypted AES key). 
              </li>
              <li>
              Implemented a microservice developed by another student to simulate a hybrid encryption scheme, where one uses 
              RSA to exchange an AES key. The RSA key-pair holder sends their public key via an HTTP request to the partner's 
              microservice, which sends back an encrypted AES key, along with random text encrypted with that AES key. These 
              two items can then be decrypted using the website's functionality.
              </li>
            </ul> 
            </div>

          </div>  
          
                       
        </section>      



        {/* SECTION FOR PROJECT #4 */}
        <section className='space_tau_section' style={{margin:"0px", height:"auto"}}>       
        <h2 className='project_header'> SpaceTau-Flask-and-MySQL-App</h2>   
        <div className="project_buttons">                
            <button className="github_button" onClick={() => handleClick("https://github.com/Mike11199/SpaceTau-Flask-and-MySQL-App-CS340")}>
            <img className='github_logo' src={GitHubLogo} alt="github logo"></img>
               GitHub Link
            </button>
            <button className="website_button" onClick={() => handleClick("https://spacetau.herokuapp.com/")}>
              Live Website Link
            </button>
          </div>
             <div className="project_1_main_div">
   
            <div className="space_tau_carousel_and_video">     

                <div className='space_tau_carousel' >
                      <Carousel width="100%" infiniteLoop="true" dynamicHeight="true" showArrows="true">
                            <div><img alt="space_tau_1" src={Space_Tau_1} /></div>
                            <div><img alt="space_tau_2" src={Space_Tau_2} /></div>
                            <div><img alt="space_tau_3"src={Space_Tau_3} /></div>
                            <div><img alt="space_tau_4"src={Space_Tau_4} /></div>
                            <div><img alt="space_tau_5"src={Space_Tau_5} /></div>
                            <div><img alt="space_tau_6"src={Space_Tau_6} /></div>
                            <div><img alt="space_tau_7"src={Space_Tau_7} /></div>
                      </Carousel>
                </div>
              
                <div className='video_wrapper_ksp' >
                    <ReactPlayer   
                      width={playerWidth_space_tau}
                      height={playerHeight_space_tau}      
                      playing
                      url="https://www.youtube.com/watch?v=PLZhliJe3Wk?autoplay=1&modestbranding=1&frameborder=12"
                      loop={true}
                      muted={true}
                      style={{zIndex:1}}
                      config={{youtube: youtubeOptions,}}
                    />
                  </div>
              
            </div>


              <div className='space_tau_description'>
                <ul>
                  <li>
                    Project programmed in Flask to run Python in a back-end server environment, 
                    using a Jinja templating system to render HTML and JavaScript on the front-end.
                  </li>
                  <li>
                    Implemented a MariaDB backed MySQL database and designed a schema for this in MySQL Workbench,
                    to support relationships among the database tables.  The project serves as a web-based application 
                    to a fictional database system for a space launch services company.
                  </li>
                  <li>
                    Multiple one-to-many relationships are supported, as well as a many-to-many relationship between 
                    spacecraft and parts via an intersection table.
                  </li>
                  <li>
                    Added constraints such as ON CASCADE DELETE to automatically allow for child rows to be deleted from 
                    a M:N relationship and prevent database anomalies. Added foreign key (FK) constraints to prevent adding 
                    nonsensical relationships between tables, such as referencing a FK that doesn't exist.
                  </li>
                  <li>
                    The theme of this project is inspired by my interest in NASA / space exploration and Kerbal Space Program 
                    (see gameplay video below), which has taught me much about physics and orbital mechanics in a fun way.  I've 
                    also dabbled in using C# to automate launches in the game with kRPC scripting (remote procedure calls), and 
                    eventually plan to use Unity/ C# to create mods for the game with Visual Studio.
                  </li>
                  </ul>
              </div>


            </div>

        </section>   




           {/* SECTION FOR PROJECT #5 */}
           <section className='smallsh_section'>       
           <h2 className='project_header'>Small Shell (smallsh) - C Unix Shell</h2>                 
           <div className="project_buttons">                
            <button className="github_button" onClick={() => handleClick("https://github.com/Mike11199/CS-344-Small-Shell")}>
            <img className='github_logo' src={GitHubLogo} alt="github logo"></img>
               GitHub Link
            </button>
            {/* <button className="website_button" onClick={() => handleClick("https://spacetau.herokuapp.com/")}>
              Live Website Link
            </button> */}
          </div>          
          <div className="project_card_smallsh">


              <div className='video_wrapper_smallsh' >
                <ReactPlayer   
                  width={playerWidth_smallsh}
                  height={playerHeight_smallsh}
                  playing
                  url="https://www.youtube.com/watch?v=vD2dPFSQ668?autoplay=1&modestbranding=1&frameborder=12"
                  loop={true}
                  muted={true}
                  style={{zIndex:1}}
                  config={{
                  youtube: youtubeOptions,
                }}
                />
              </div>
                          
              <div className='text_description_smallsh'>
                <ul>
                  <li>
                  Programmed a shell in C similar to the BASH shell, implementing parent/child process handling 
                  with the Unix process API. The shell can be ran in interactive mode, repeatedly prompting the 
                  user for input, or be fed commands from a file in non-interactive mode.
                  </li>
                  <li>
                  Features implemented include forking of child processes to allow for commands fed to the shell 
                  to be ran in its own address space, execution of processes in the background with the "&" command, 
                  and use of the exec() family of functions to allow the shell to execute non-built in commands 
                  (searching for the command via the env path variable - https://linux.die.net/man/3/execvp).
                  </li>
                  <li>
                  The shell repeatedly checks for background processes within the same process group and reports if any 
                  have exited along with their PID. The SIGCONT signal is sent to any stopped child background processes
                  by the shell to resume their execution. https://linux.die.net/man/2/waitpid
                  </li>
                  <li>
                  Parameter expansion - special shell parameters include $$ for the smallsh process ID GETPID(3), $? for
                   the exit status of the last foreground process, and $! for the most recent background process. 
                   Occurrences of ${} allow for variable expansion for a named environment variable.
                  </li>
                  <li>
                  Implemented custom behavior for SIGINT and SIGSTP signals, allowing the shell to ignore these signals 
                  while allowing child processes to respond via custom signal handlers and sigaction structure.
                  </li>
                  <li>
                  Parsed command line input into semantic tokens via word splitting. Implemented redirection operators 
                  '&lt;', '&gt;', and '&gt;&gt;' to redirect STDIN and STDOUT to specific files.
                  </li>
                  </ul>
              </div>
          
          
            </div>

        </section>   




           {/* SECTION FOR PROJECT #6 */}
            <section id="hash_map_section">       
            <h2 className='project_header'>Hash Map Data Structure Implementation - Python</h2>   

            <div className="project_buttons">              
              <button className="github_button" onClick={() => handleClick("https://github.com/Mike11199/HashMap-Python-Implementation")}>
              <img className='github_logo' src={GitHubLogo} alt="github logo"></img>
                GitHub Link
              </button>
            </div>

            <div className="project_card_hash_map">
              
              <div className='hash_map_carousel'>     
                <Carousel width="100%" infiniteLoop="true" dynamicHeight="true" showArrows="true">
                    <div><img alt="hash_map_1" src={Hash_Map_Image_1} /></div>
                    <div><img alt="hash_map_2" src={Hash_Map_Image_2} /></div>
                    <div><img alt="hash_map_3" src={Hash_Map_GIF_1} /></div>
                </Carousel>
              </div>              



              <div className='hash_map_text'>
                <ul>
                  <li>
                    This is the portfolio project for the Oregon State University course CS 261 - Data Structures,
                    which is allowed to be posted to a public GitHub repo. The project implements a Hash Map data
                    structure using two distinct methods to handle table collisions - Open Addressing, and Separate Chaining.
                  </li>
                  <li>
                    Open Addressing
                    <ul>
                      <li>
                      In this implementation, the data structure probes for an empty spot in the HashTable's underlying dynamic array 
                      if a collision occurs, until it finds an empty spot to insert the element in.
                      </li>                    
                    </ul>
                  </li>
                  <li>
                  Separate Chaining
                    <ul>
                      <li>
                      In this implementation, each dynamic array element is a linked list, and additional key/value pairs can be added to 
                      the front of the linked list at each array spot in the case that keys hash to the same array index.
                      </li>                    
                    </ul>
                  </li>
                  <li>
                  A hash map allows insertion and lookup of values in amortized constant time O(1), due to a potential O(N) resizing cost. 
                  Resizing the table is performed in order to keep the table load factor low, which reduces the chance of collisions occurring. 
                  In the worst case, all elements could collide in the same bucket, leading to O(N) time complexity.
                  The load factor is expressed as n (number of elements) / m (number of buckets).
                  </li>
                  </ul>
              </div>

          </div>
 
        </section>    
    </div>
    </>
  );
}

export default HomePage;