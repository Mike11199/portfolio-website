import type { ProjectContent } from "../components/project-summary/ProjectSummary.types";
import { PythonIcon, PytestIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./PythonHashMap.css";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import { hashMapImages } from "../../../images/imageData.json";
import ProjectSection from "../components/project-section/ProjectSection";
import { useWindowWidth } from "@react-hook/window-size";

const projectContent = {
  "title": "Hash Map Data Structure Implementation - Python",
  "category": "DATA STRUCTURES / PYTHON",
  "highlights": [
    {
      "heading": "Overview",
      "text": "Two hash map implementations developed for OSU CS 261, using dynamic arrays with separate collision-resolution strategies: open addressing and separate chaining."
    },
    {
      "heading": "Open addressing",
      "text": "Collisions trigger probing within the underlying array until an available slot is found, keeping key/value entries inside the table itself."
    },
    {
      "heading": "Separate chaining",
      "text": "Each bucket holds a linked list. Keys that hash to the same index are stored as additional nodes in that bucket’s chain."
    },
    {
      "heading": "Complexity",
      "text": "Resizing controls the load factor and collision frequency. With a suitable hash distribution, operations are expected amortized O(1); resizing or pathological collisions can require O(N) work."
    }
  ],
  "detailGroups": [
    {
      "heading": "Overview",
      "paragraphs": [
        0
      ]
    },
    {
      "heading": "Open Addressing",
      "paragraphs": [
        1
      ]
    },
    {
      "heading": "Separate Chaining",
      "paragraphs": [
        2
      ]
    },
    {
      "heading": "Load Factor & Complexity",
      "paragraphs": [
        3
      ]
    }
  ],
  "technologies": ["Python", "pytest"]
} satisfies ProjectContent;

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
          title={projectContent.title}
          category={projectContent.category}
          technologies={projectContent.technologies}
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
          content={projectContent}
          defaultDesktopView="code"
          code={
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="HashMap-Python-Implementation"
                defaultFile="hash_map_oa.py"
                defaultOpenFiles={isDesktop ? ["hash_map_sc.py", "README.md"] : undefined}
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
