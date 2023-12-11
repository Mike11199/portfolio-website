import Hash_Map_Image_1 from "../../images/hash_map_1.png";
import Hash_Map_Image_2 from "../../images/hash_map_2.png";
import Hash_Map_GIF_1 from "../../images/hash_map_sc.gif";
import GitHubLogo from "../../images/github_1.png";

import { Carousel } from "react-responsive-carousel";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const PythonHashMap = () => {
  return (
    <>
      {/* SECTION FOR PROJECT #6 */}
      <section id="hash_map_section">
        <h2 className="project_header">
          Hash Map Data Structure Implementation - Python
        </h2>

        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick(
                "https://github.com/Mike11199/HashMap-Python-Implementation"
              )
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
                <img alt="hash_map_1" src={Hash_Map_Image_1} />
              </div>
              <div>
                <img alt="hash_map_2" src={Hash_Map_Image_2} />
              </div>
              <div>
                <img alt="hash_map_3" src={Hash_Map_GIF_1} />
              </div>
            </Carousel>
          </div>

          <div className="hash_map_text">
            <ul>
              <li>
                This is the portfolio project for the Oregon State University
                course CS 261 - Data Structures, which is allowed to be posted
                to a public GitHub repo. The project implements a Hash Map data
                structure using two distinct methods to handle table collisions
                - Open Addressing, and Separate Chaining.
              </li>
              <li>
                Open Addressing
                <ul>
                  <li>
                    In this implementation, the data structure probes for an
                    empty spot in the HashTable's underlying dynamic array if a
                    collision occurs, until it finds an empty spot to insert the
                    element in.
                  </li>
                </ul>
              </li>
              <li>
                Separate Chaining
                <ul>
                  <li>
                    In this implementation, each dynamic array element is a
                    linked list, and additional key/value pairs can be added to
                    the front of the linked list at each array spot in the case
                    that keys hash to the same array index.
                  </li>
                </ul>
              </li>
              <li>
                A hash map allows insertion and lookup of values in amortized
                constant time O(1), due to a potential O(N) resizing cost.
                Resizing the table is performed in order to keep the table load
                factor low, which reduces the chance of collisions occurring. In
                the worst case, all elements could collide in the same bucket,
                leading to O(N) time complexity. The load factor is expressed as
                n (number of elements) / m (number of buckets).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PythonHashMap;
