import GitHubButton from "../utils/GitHubButton";
import ReactVideoPlayer from "../utils/ReactVideoPlayer";
import CustomTextCarousel from "../CustomTextCarousel";

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

  return (
    <>
      <section className="smallsh_section">
        <h2 className="projectHeaderText">
          Small Shell (smallsh) - C Unix Shell
        </h2>

        {/* Buttons */}
        <div className="projectButtons">
          <GitHubButton
            URL={"https://github.com/Mike11199/CS-344-Small-Shell"}
          />
        </div>

        {/* Embedded YouTube Video */}
        <div className="project_card_smallsh">
          <div className="videoWrapperSmallShell">
            <ReactVideoPlayer
              URL={
                "https://www.youtube.com/watch?v=vD2dPFSQ668?autoplay=1&modestbranding=1"
              }
            />
          </div>

          {/* Text Description */}

          <CustomTextCarousel
            descriptionList={smallShellProjectDescriptionText}
            heightProp={"60vh"}
          />
        </div>
      </section>
    </>
  );
};

export default SmallShellProject;
