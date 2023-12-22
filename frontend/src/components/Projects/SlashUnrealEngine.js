import GitHubLogo from "../../images/github_1.png";
import { Carousel } from "react-responsive-carousel";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const SlashUnrealEngine = () => {
  return (
    <>
      <section id="hash_map_section">
        <h2 className="project_header">C++ Unreal Engine Project Slash</h2>

        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick("https://github.com/Mike11199/unreal-project-slash")
            }
          >
            <img
              className="github_logo"
              src={GitHubLogo}
              alt="github logo"
            ></img>
            GitHub Link
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
                <img
                  alt="unreal_destruction"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227399/unreal_destruction_zgdoxb.gif"
                />
              </div>
              <div>
                <img
                  alt="unreal_voronoi_uniform_fracturing"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227381/unreal_voronoi_uniform_fracturing_i82ukx.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_debugging"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227368/unreal_debugging_info_gbbotb.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_dot_product_math_onenote"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227353/unreal_dot_product_2_cnpc9j.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_dot_product_image"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227384/unreal_dot_product_1_wu6ooj.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_determine_hit_animation_code"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227348/unreal_determine_hit_animation_kfgni2.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_directional_hit_animation"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227397/unreal_directional_hit_animation_gnkuyy.gif"
                />
              </div>
              <div>
                <img
                  alt="unreal_hit_interface_code"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227351/unreal_hit_interface_thwvht.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_randomly_generated_treasure"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227375/unreal_treasure_fqw3zb.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_patrol_routes"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227366/unreal_patrol_zi4zqw.png"
                />
              </div>
              <div>
                <img
                  alt="unreal_sensing_component"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703227362/unreal_sensing_sa1pfs.png"
                />
              </div>
            </Carousel>
          </div>

          <div className="hash_map_text">
            <ul>
              <li>
                A project I'm doing for fun from a Udemy course - still in
                progress. Though my interests are in full stack development,
                I've always enjoyed PC games and thought it would help my C++ /
                back end skills to take a deeper dive into a statically typed
                language.
              </li>
              <li>
                Used vector math in C++ to calculate the dot product between two
                vectors, or the angle between the impact of a weapon strike and
                the actor's forward vector. By also calculating the cross
                product, we can use this to play the correct animation for an
                enemy on hit, so that they stumble in the correct direction
                depending on which side they've been attacked from. Added other
                logic to animations such as inverse kinematics, so that a
                character's skeleton can be correctly positioned when standing
                on sloped surfaces.
              </li>
              <li>
                Created other various classes in C++ to trigger on sphere
                overlap events, play animations, attach items to sockets, or
                randomly spawn treasure when an item breaks. Created state
                machines to allow characters to toggle between running/walking
                animations based on C++ variables we've exposed to BluePrint.
                Added a box trace function on weapon meshes, allowing a weapon
                to determine when it has overlapped with another object.
              </li>
              <li>
                Implemented C++ inheritance by adding a HitInterface for various
                enemies, which an enemy class can inherit from. This allows the
                weapon class to call a function which could not exist on an
                actor, the getHit() function, which the enemy class overrides.
                If the weapon successfully casts an actor to that interface, we
                know it is a child class of the interface that implements
                getHit(). This allows us to call getHit() from a pointer, and
                for a weapon to avoid needing logic for everything it could
                possibly hit.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SlashUnrealEngine;
