import { Carousel } from "react-responsive-carousel";
import ButtonLink from "../utils/ButtonLink";

const OpenGLSolarSystem = () => {
  return (
    <>
      <section id="kotlin_section">
        <h2 className="project_header">OpenGL C++ Solar System Model</h2>

        {/* Buttons */}
        <div className="project_buttons">
          <ButtonLink
            URL={"https://www.youtube.com/watch?v=ZvKFpJYDZkw"}
            variant={"red"}
            buttonText={"Video Link"}
          />
        </div>

        <div className="project_card_hash_map">
          <div className="hash_map_carousel">
            <Carousel
              width="100%"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
            >
              <div>
                <img
                  alt="solar_system_jupiter_and_main_asteroid_belt"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703229666/AsteroidBeltPlanetsCloseUpPhoto_busxio.png"
                />
              </div>
              <div>
                <img
                  alt="earth_system_rotation_gif_over_10MB_cloudinary_limit"
                  src="https://github.com/Mike11199/GIFs/blob/main/earth_rotation_clouds.gif?raw=true"
                />
              </div>
              <div>
                <img
                  alt="solar_system_and_both_belts_from_distance_gif"
                  src={
                    "https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703230118/288668401-65cbd665-51e0-4e54-9e95-4cfef91b79a0_ysic55.gif"
                  }
                />
              </div>
              <div>
                <img
                  alt="close_up_of_planets_aligned"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703229665/PlanetsAlignedImage_xaiskz.png"
                />
              </div>
              <div>
                <img
                  alt="earth_system_static_image"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703229667/EarthCloudsImage_bdpfo5.png"
                />
              </div>
              <div>
                <img
                  alt="solar_system_from_distance"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703229662/SolarSystemFarOut_xqjery.png"
                />
              </div>
            </Carousel>
          </div>

          <div className="hash_map_text">
            <ul>
              <li>
                A Solar System model coded in C++ using OpenGL, featuring GLSL
                fragment & vertex shaders, 8k BMP planet textures, and advanced
                lighting. Code cannot be posted as this is the final project for
                CS 450 Computer Graphics at Oregon State University, and is a
                popular final project choice.
              </li>
              <li>
                The vertex and fragment shaders used for rendering planet
                textures are efficient programs which run directly on the GPU.
                The vertex shader process individual vertices and outputs the
                transformed position, while the fragment shader outputs the
                final RGB color of each pixel after it has been processed by the
                rasterizer.
              </li>
              <li>
                Loaded sphere objects for planets and other objects into OpenGL
                display lists, which are a stored set of commands that can be
                executed later with a single function call, reducing the
                overhead of repeatedly sending commands to the GPU. Added 150
                random asteroids to the main asteroid belt and another 150 for
                Kuiper Belt beyond Neptune, added 8 Planets, Pluto, 4 Moons, and
                a Galaxy Skybox with vertex and fragment shaders.
              </li>
              <li>
                Added equirectangular projection cloud textures to Earth by
                blending two vec4 (rgba) textures together in the fragment
                shader. Used a vec2 variable to translate the clouds over the
                Earth's surface using a sinusoidal function applied to the
                program's elapsed time.
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
