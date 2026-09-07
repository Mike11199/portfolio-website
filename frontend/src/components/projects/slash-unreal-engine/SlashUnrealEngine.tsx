import ProjectHeader from "../components/project-header/ProjectHeader";
import "./SlashUnrealEngine.css";
import { useState } from "react";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import ImagesList from "../../utils/project-image-carousel/ImageList";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import { unrealEngineImages } from "../../../images/imageData.json";
import ProjectSection from "../components/project-section/ProjectSection";
import { useWindowWidth } from "@react-hook/window-size";

const SlashUnrealEngine = () => {
  const slashUnrealEngineProjectsDescriptionText = [
    `A project I'm doing for fun from a Udemy course - still in
    progress. Though my interests are in full stack development,
    I've always enjoyed PC games and thought it would help my C++ /
    back end skills to take a deeper dive into a statically typed
    language.`,

    `Used vector math in C++ to calculate the dot product between two
    vectors, or the angle between the impact of a weapon strike and
    the actor's forward vector. By also calculating the cross
    product, we can use this to play the correct animation for an
    enemy on hit, so that they stumble in the correct direction
    depending on which side they've been attacked from. Added other
    logic to animations such as inverse kinematics, so that a
    character's skeleton can be correctly positioned when standing
    on sloped surfaces.`,

    `Created other various classes in C++ to trigger on sphere
    overlap events, play animations, attach items to sockets, or
    randomly spawn treasure when an item breaks. Created state
    machines to allow characters to toggle between running/walking
    animations based on C++ variables we've exposed to BluePrint.
    Added a box trace function on weapon meshes, allowing a weapon
    to determine when it has overlapped with another object.`,

    `Implemented C++ inheritance by adding a HitInterface for various
    enemies, which an enemy class can inherit from. This allows the
    weapon class to call a function which could not exist on an
    actor, the getHit() function, which the enemy class overrides.
    If the weapon successfully casts an actor to that interface, we
    know it is a child class of the interface that implements
    getHit(). This allows us to call getHit() from a pointer, and
    for a weapon to avoid needing logic for everything it could
    possibly hit.`,
  ];
  const windowWidth = useWindowWidth();
  const [showCode, setShowCode] = useState(false);
  const repositoryUrl = "https://github.com/Mike11199/unreal-project-slash";
  return (
    <>
      <section className="portfolio-project unreal_section">
        <ProjectHeader
          title={"C++ Unreal Engine Project Slash"}
          icons={
            <>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
                alt="c++ logo"
                style={{
                  width: "3.5rem",
                  height: "auto",
                }}
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original-wordmark.svg"
                alt="unreal engine logo"
                style={{
                  width: "3.5rem",
                  height: "auto",
                  filter: "invert(100%) brightness(200%)",
                }}
              />
            </>
          }
          actions={
            <>
              <RepositoryActions
                repositoryUrl={repositoryUrl}
                showCode={showCode}
                onToggleCode={() => setShowCode((visible) => !visible)}
              />
            </>
          }
        />

        <ProjectSection
          media={
            showCode && windowWidth > 600 ? (
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="unreal-project-slash"
              />
            ) : (
              <Carousel
                fixedHeight="var(--project-panel-height)"
                mobilePadding={false}
                swipeable={false}
                emulateTouch={false}
                showIndicators={false}
                width="100%"
                infiniteLoop={true}
                showArrows={true}
                showThumbs={windowWidth > 600}
              >
                {ImagesList(unrealEngineImages)}
              </Carousel>
            )
          }
          description={slashUnrealEngineProjectsDescriptionText}
        />
      </section>
    </>
  );
};

export default SlashUnrealEngine;
