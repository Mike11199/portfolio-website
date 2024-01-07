import GitHubButton from "../utils/GitHubButton";
import { Carousel } from "react-responsive-carousel";

const PythonHashMap = () => {
  return (
    <>
      <section id="hash_map_section">
        <h2 className="project_header">
          Hash Map Data Structure Implementation - Python
        </h2>

        {/* Buttons */}
        <div className="project_buttons">
          <GitHubButton
            URL={"https://github.com/Mike11199/HashMap-Python-Implementation"}
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
                  alt="hash_map_put_function"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703228119/hash_map_put_function_yql8dr.png"
                />
              </div>
              <div>
                <img
                  alt="hash_map_keys_buckets_diagram"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703228636/hash_function_diagram_abmwcz.png"
                />
              </div>
              <div>
                <img
                  alt="hash_map_resize_table_function"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703228119/hash_map_resize_table_function_opqhi4.png"
                />
              </div>
              <div>
                <img
                  alt="hash_map_separate_chaining_gif"
                  src="https://res.cloudinary.com/dwgvi9vwb/image/upload/v1703228131/hash_map_separate_chaining_tljado.gif"
                />
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
