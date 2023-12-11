import unreal_destruction from "../../images/destruction.gif";
import unreal_debugging from "../../images/unreal_debugging_info.png";
import unreal_determine_hit_animation from "../../images/unreal_determine_hit_animation.png";
import unreal_directional_hit_animation from "../../images/unreal_directional_hit_animation.gif";
import unreal_dot_product_1 from "../../images/unreal_dot_product_1.png";
import unreal_dot_product_2 from "../../images/unreal_dot_product_2.png";
import unreal_hit_interface from "../../images/unreal_hit_interface.png";
import unreal_treasure from "../../images/unreal_treasure.png";
import unreal_voronoi_uniform_fracturing from "../../images/unreal_voronoi_uniform_fracturing.png";
import unreal_patrol from "../../images/unreal_patrol.png";
import unreal_sensing from "../../images/unreal_sensing.png";
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
      {/* SECTION FOR PROJECT #8 */}
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
                <img alt="hash_map_1" src={unreal_destruction} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_voronoi_uniform_fracturing} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_debugging} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_dot_product_2} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_dot_product_1} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_determine_hit_animation} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_directional_hit_animation} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_hit_interface} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_treasure} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_patrol} />
              </div>
              <div>
                <img alt="hash_map_1" src={unreal_sensing} />
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
