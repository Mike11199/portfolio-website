import GitHubButton from "../utils/GitHubButton";
import { Carousel } from "react-responsive-carousel";
import ImagesList from "../utils/ImageList";
import { hashMapImages } from "../../images/imageData.json";
import CustomTextCarousel from "../CustomTextCarousel";
import { useWindowWidth } from "@react-hook/window-size";

const PythonHashMap = () => {
  const pythonHashMapProjectDescriptionText = [
    `This is the portfolio project for the Oregon State University
    course CS 261 - Data Structures, which is allowed to be posted
    to a public GitHub repo. The project implements a Hash Map data
    structure using two distinct methods to handle table collisions
    - Open Addressing, and Separate Chaining.`,

    `Open Addressing - In this implementation, the data structure probes for an
    empty spot in the HashTable's underlying dynamic array if a
    collision occurs, until it finds an empty spot to insert the
    element in.`,

    `Separate Chaining - In this implementation, each dynamic array element is a
    linked list, and additional key/value pairs can be added to
    the front of the linked list at each array spot in the case
    that keys hash to the same array index.`,

    `A hash map allows insertion and lookup of values in amortized
    constant time O(1), due to a potential O(N) resizing cost.
    Resizing the table is performed in order to keep the table load
    factor low, which reduces the chance of collisions occurring. In
    the worst case, all elements could collide in the same bucket,
    leading to O(N) time complexity. The load factor is expressed as
    n (number of elements) / m (number of buckets).`,
  ];

  const windowWidth = useWindowWidth();

  return (
    <>
      <section className="hash_map_section">
        <h2 className="projectHeaderText">
          Hash Map Data Structure Implementation - Python
        </h2>

        {/* Buttons */}
        <div className="projectButtons">
          <GitHubButton
            URL={"https://github.com/Mike11199/HashMap-Python-Implementation"}
          />
        </div>

        {/* Image Carousel */}
        <div className="project_card_hash_map">
          <div className="hash_map_carousel">
            <Carousel
              swipeable={false}
              emulateTouch={false}
              showIndicators={false}
              width="100%"
              infiniteLoop={true}
              dynamicHeight={true}
              showArrows={true}
              showThumbs={windowWidth > 600}
            >
              {ImagesList(hashMapImages)}
            </Carousel>
          </div>

          {/* Text Description */}
          <CustomTextCarousel
            descriptionList={pythonHashMapProjectDescriptionText}
            heightProp={"60vh"}
          />
        </div>
      </section>
    </>
  );
};

export default PythonHashMap;
