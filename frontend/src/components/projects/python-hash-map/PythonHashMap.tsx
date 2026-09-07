import { PythonIcon, PytestIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./PythonHashMap.css";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import { hashMapImages } from "../../../images/imageData.json";
import ProjectSection from "../components/project-section/ProjectSection";
import { useWindowWidth } from "@react-hook/window-size";

const PythonHashMap = () => {
  const isDesktop = useWindowWidth() > 600;
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
  const repositoryUrl = "https://github.com/Mike11199/HashMap-Python-Implementation";

  return (
    <>
      <section className="portfolio-project hash_map_section">
        <ProjectHeader
          title={"Hash Map Data Structure Implementation - Python"}
          icons={
            <>
              <PythonIcon />
              <PytestIcon />
            </>
          }
          actions={
            <>
              <RepositoryActions
                repositoryUrl={repositoryUrl}
              />
            </>
          }
        />

        <ProjectSection
          defaultDesktopView="code"
          code={
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="HashMap-Python-Implementation"
                defaultFile="hash_map_oa.py"
                defaultOpenFiles={isDesktop ? ["README.md"] : undefined}
              />
          }
          media={
              <Carousel items={hashMapImages} />
          }
          description={pythonHashMapProjectDescriptionText}
        />
      </section>
    </>
  );
};

export default PythonHashMap;
