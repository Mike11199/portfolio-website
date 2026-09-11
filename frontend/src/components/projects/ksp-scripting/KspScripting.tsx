import { CSharpIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./KspScripting.css";
import ReactVideoPlayer from "../../utils/react-video-player/ReactVideoPlayer";
import ProjectSection from "../components/project-section/ProjectSection";
import ProjectMediaFrame from "../components/project-media-frame/ProjectMediaFrame";

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
    <ProjectHeader
      title={"C# KSP Automated Scripting - kRPC (Remote Procedure Calls)"}
      centeredIcons
      icons={<CSharpIcon />}
    />
    <ProjectSection
      mediaLayout="video"
      media={
        <ProjectMediaFrame>
          <ReactVideoPlayer title="C# KSP Automated Scripting - kRPC (Remote Procedure Calls)" URL="https://assets.michael-iwanek-portfolio.com/videos/ksp-scripting-1080p-v1.mp4" />
        </ProjectMediaFrame>
      }
      description={description}
    />
  </section>
);

export default KspScripting;
