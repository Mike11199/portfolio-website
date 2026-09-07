import { LinuxIcon, CIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./SmallShellProject.css";
import { useState } from "react";
import ReactVideoPlayer from "../../utils/react-video-player/ReactVideoPlayer";
import ProjectSection from "../components/project-section/ProjectSection";
import ProjectMediaFrame from "../components/project-media-frame/ProjectMediaFrame";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";

const SmallShellProject = () => {
  const smallShellProjectDescriptionText = [
    `Programmed a shell in C similar to the BASH shell, implementing
    parent/child process handling with the Unix process API. The
    shell can be ran in interactive mode, repeatedly prompting the
    user for input, or be fed commands from a file in
    non-interactive mode.`,

    `The shell repeatedly checks for background processes within the
    same process group and reports if any have exited along with
    their PID. The SIGCONT signal is sent to any stopped child
    background processes by the shell to resume their execution.
    https://linux.die.net/man/2/waitpid`,

    `Parameter expansion - special shell parameters include $$ for
    the smallsh process ID GETPID(3), $? for the exit status of the
    last foreground process, and $! for the most recent background
    process. Occurrences of \${} allow for variable expansion for a
    named environment variable.`,

    `Implemented custom behavior for SIGINT and SIGSTP signals,
    allowing the shell to ignore these signals while allowing child
    processes to respond via custom signal handlers and sigaction
    structure.`,

    `Parsed command line input into semantic tokens via word
    splitting. Implemented redirection operators '&lt;', '&gt;', and
    '&gt;&gt;' to redirect STDIN and STDOUT to specific files.`,
  ];

  const [showCode, setShowCode] = useState(false);
  const repositoryUrl = "https://github.com/Mike11199/CS-344-Small-Shell";

  return (
    <>
      <section className="portfolio-project smallsh_section">
        <ProjectHeader
          title={"Small Shell (smallsh) - C Unix Shell"}
          icons={
            <>
              <LinuxIcon />
              <CIcon />
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
          mediaLayout="video"
          showCode={showCode}
          onToggleCode={() => setShowCode((visible) => !visible)}
          code={
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="CS-344-Small-Shell"
                defaultFile="smallsh.c"
                defaultOpenFiles={["README.md"]}
              />
          }
          media={
              <ProjectMediaFrame>
                <ReactVideoPlayer
                URL={
                  "https://www.youtube.com/watch?v=vD2dPFSQ668?autoplay=1&modestbranding=1"
                }
              />
              </ProjectMediaFrame>
          }
          description={smallShellProjectDescriptionText}
        />
      </section>
    </>
  );
};

export default SmallShellProject;
