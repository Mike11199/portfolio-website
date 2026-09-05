import ReactVideoPlayer from "../utils/ReactVideoPlayer";
import ProjectSection from "./ProjectSection";
import ProjectMediaFrame from "./ProjectMediaFrame";

const description = [
  `Experimented with C# scripts to automate launches in Kerbal Space Program
  using kRPC (Remote Procedure Calls).  This game has taught me much about physics and orbital
  mechanics in a fun, sandbox way.`,
  `This was not truly a large coding project.  At the time I thought it would be interesting to mess
  around with an old game I liked and apply programming to it, short of implementing a Unity mod or a larger endeavor.`,
  `kRPC is a mod that runs a server inside the game, allowing external scripts to
  connect, read flight data, and send commands to a spacecraft. This brings C# programming
  into the game, and can automate launches/docking and other tasks.`,
  `The code briefly shown in the gameplay video automates the launch, staging, and gravity turn as the rocket reaches orbit.`,
  `This would have also worked with Python, C++, Java, or other languages which use their own
  libraries to connect to the server, not just C#.`,
];

const KspScripting = () => (
  <section className="portfolio-project ksp_scripting_section">
    <div className="projectHeaderTextContainer">
      <h3 className="projectHeaderText">
        C# KSP Automated Scripting - kRPC (Remote Procedure Calls)
      </h3>
      <div className="devIconsContainer">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"
          alt="C# logo"
          style={{ width: "3.5rem", height: "auto" }}
        />
      </div>
    </div>
    <ProjectSection
      media={
        <ProjectMediaFrame>
          <ReactVideoPlayer URL="https://www.youtube.com/watch?v=wl0nVNRrcf0" />
        </ProjectMediaFrame>
      }
      description={description}
    />
  </section>
);

export default KspScripting;
