import type { ProjectContent } from "../components/project-summary/ProjectSummary.types";
import { CppIcon, OpenGLIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./OpenGLSolarSystem.css";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import ButtonLink from "../../utils/buttons/ButtonLink";
import { solarSystemImages } from "../../../images/imageData.json";
import ProjectSection from "../components/project-section/ProjectSection";

const projectContent = {
  "title": "OpenGL C++ Solar System Model",
  "category": "COMPUTER GRAPHICS / C++",
  "highlights": [
    {
      "heading": "Overview",
      "text": "A C++ solar-system model using OpenGL, GLSL vertex and fragment shaders, 8K planet textures, and lighting. The scene includes planets, moons, asteroid belts, and a galaxy skybox."
    },
    {
      "heading": "Rendering",
      "text": "GPU shaders transform vertices and calculate fragment colors. OpenGL display lists reuse stored drawing commands for planet spheres and other scene objects."
    },
    {
      "heading": "Textures",
      "text": "Earth’s surface and cloud textures are blended in the fragment shader. Texture-coordinate offsets animate cloud movement using elapsed time and a sinusoidal function."
    },
    {
      "heading": "Orbits & source",
      "text": "Orbital periods are calculated from orbital radii using Kepler’s third law. Demonstrations are available, but source is withheld under OSU CS 450 course restrictions."
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
      "heading": "GPU Shaders",
      "paragraphs": [
        1
      ]
    },
    {
      "heading": "Scene Composition & Display Lists",
      "paragraphs": [
        2
      ]
    },
    {
      "heading": "Cloud Textures",
      "paragraphs": [
        3
      ]
    },
    {
      "heading": "Orbital Mechanics",
      "paragraphs": [
        4
      ]
    }
  ],
  "technologies": ["C++", "OpenGL", "GLSL"]
} satisfies ProjectContent;

const OpenGLSolarSystem = () => {
  const openGLSolarSystemProjectDescriptionText = [
    `A Solar System model coded in C++ using OpenGL, featuring GLSL
    fragment & vertex shaders, 8k BMP planet textures, and advanced
    lighting. Code cannot be posted as this is the final project for
    CS 450 Computer Graphics at Oregon State University, and is a
    popular final project choice.`,

    `The vertex and fragment shaders used for rendering planet
    textures are efficient programs which run directly on the GPU.
    The vertex shader process individual vertices and outputs the
    transformed position, while the fragment shader outputs the
    final RGB color of each pixel after it has been processed by the
    rasterizer.`,

    `Loaded sphere objects for planets and other objects into OpenGL
    display lists, which are a stored set of commands that can be
    executed later with a single function call, reducing the
    overhead of repeatedly sending commands to the GPU. Added 150
    random asteroids to the main asteroid belt and another 150 for
    Kuiper Belt beyond Neptune, added 8 Planets, Pluto, 4 Moons, and
    a Galaxy Skybox with vertex and fragment shaders.`,

    `Added equirectangular projection cloud textures to Earth by
    blending two vec4 (rgba) textures together in the fragment
    shader. Used a vec2 variable to translate the clouds over the
    Earth's surface using a sinusoidal function applied to the
    program's elapsed time.`,

    `Used Kepler's third law to calculate realistic orbital periods
    for planets based on their orbital radii. This tells us that the
    square of a planet's orbital period is proportional to the cube
    of the length of the semi-major axis of its orbit.`,
  ];

  return (
    <>
      <section className="portfolio-project solar_system_section">
        <ProjectHeader
          title={projectContent.title}
          category={projectContent.category}
          technologies={projectContent.technologies}
          icons={
            <>
              <CppIcon />
              <OpenGLIcon />
            </>
          }
          actions={
            <>
              <ButtonLink
                URL={"https://www.youtube.com/watch?v=ZvKFpJYDZkw"}
                variant={"red"}
                buttonText={"Video Link"}
              />
            </>
          }
        />

        <ProjectSection
          content={projectContent}
          media={
            <Carousel items={solarSystemImages} />
          }
          description={openGLSolarSystemProjectDescriptionText}
        />
      </section>
    </>
  );
};

export default OpenGLSolarSystem;
