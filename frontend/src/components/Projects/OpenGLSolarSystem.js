import Planets1 from "../../images/planets_1.png";
import Planets2 from "../../images/planets_2.png";
import EarthImage from "../../images/earth.png";
import SolarSystemFarOut2 from "../../images/solar_system_far_out_2.png";

import { Carousel } from "react-responsive-carousel";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const OpenGLSolarSystem = () => {
  return (
    <>
      {/* SECTION FOR PROJECT #7 */}
      <section id="kotlin_section">
        <h2 className="project_header">OpenGL C++ Solar System Model</h2>

        {/* Buttons */}
        <div className="project_buttons">
          <button
            className="video_button"
            onClick={() =>
              handleClick("https://www.youtube.com/watch?v=ZvKFpJYDZkw")
            }
          >
            Video Link
          </button>
        </div>

        <div className="project_card_hash_map">
          <div className="hash_map_carousel">
            <Carousel
              width="100%"
              infiniteLoop="true"
              dynamicHeight="true"
              showArrows="true"
            >
              <div>
                <img alt="hash_map_1" src={Planets2} />
              </div>
              <div>
                <img
                  alt="hash_map_1"
                  src="https://github.com/Mike11199/GIFs/raw/main/EarthClouds_%20new.gif"
                />
              </div>
              <div>
                <img
                  alt="hash_map_1"
                  src={
                    "https://github.com/Mike11199/CS-450-Computer-Graphics-GIFs/assets/91037796/65cbd665-51e0-4e54-9e95-4cfef91b79a0"
                  }
                />
              </div>
              <div>
                <img alt="hash_map_1" src={Planets1} />
              </div>
              <div>
                <img alt="hash_map_1" src={EarthImage} />
              </div>
              <div>
                <img alt="hash_map_1" src={SolarSystemFarOut2} />
              </div>
            </Carousel>
          </div>

          <div className="hash_map_text">
            <ul>
              <li>
                A Solar System model coded in C++ in OpenGL, using GLSL fragment
                and vertex shaders, 8k BMP planet textures, and lighting. Code
                cannot be posted as this is the project for CS 450 Computer
                Graphics at Oregon State University, and is a popular final
                project choice.
              </li>
              <li>
                The vertex and fragment shaders used for rendering planet
                textures are efficient programs which run directly on the GPU.
                The vertex shader process individual vertices and outputs the
                transformed position, while the fragment shader outputs the
                final RGB color of each pixel.
              </li>
              <li>
                Loaded sphere objects for planets and other objects into OpenGL
                display lists, which are a stored set of commands that can be
                executed later with a single function call, reducing the
                overhead of repeatedly sending commands to the GPU. Added 150
                random asteroids to main asteroid belt and another 150 for
                Kuiper Belt, 8 planets, Pluto, 4 moons, and a galaxy skybox with
                vertex and fragment shaders.
              </li>
              <li>
                Added clouds to earth by blending two vec4 textures (rgba)
                textures together in the fragment shader. Used a vec2 variable
                to translate the clouds over the Earth's surface using a
                sinusoidal function applied to the program's elapsed time.
              </li>
              <li>
                Used Kepler's third law to calculate realistic orbital periods
                for planets based on their orbital radii. This tells us that the
                square of a planet's orbital period is proportional to the cube
                of the length of the semi-major axis of its orbit.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpenGLSolarSystem;
