import GitHubLogo from "../../images/github_button_logo.png";
import { useEffect, React, useState } from "react";
import ReactPlayer from "react-player";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const youtubeOptions = {
  playerVars: {
    controls: 1,
    showinfo: 0,
    playsinline: 1,
  },
};

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const SmallShellProject = () => {
  const { width, height } = useWindowSize();

  let playerWidth_Climbing;
  let playerHeight_Climbing;
  let playerWidth_smallsh;
  let playerHeight_smallsh;
  let playerWidth_space_tau;
  let playerHeight_space_tau;

  if (width > 600) {
    playerWidth_Climbing = 400;
    playerHeight_Climbing = 710;
    playerWidth_smallsh = 1080;
    playerHeight_smallsh = 607;
    playerWidth_space_tau = 700;
    playerHeight_space_tau = 394;
  }

  if (width <= 600) {
    playerWidth_Climbing = 250;
    playerHeight_Climbing = 441;
    playerWidth_smallsh = 240;
    playerHeight_smallsh = 135;
    playerWidth_space_tau = 280;
    playerHeight_space_tau = 155;
  }

  return (
    <>
      {/* SECTION FOR PROJECT #5 */}
      <section className="smallsh_section">
        <h2 className="project_header">Small Shell (smallsh) - C Unix Shell</h2>
        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick("https://github.com/Mike11199/CS-344-Small-Shell")
            }
          >
            <img
              className="github_logo"
              src={GitHubLogo}
              alt="github logo"
            ></img>
            GitHub Link
          </button>
          {/* <button className="website_button" onClick={() => handleClick("https://spacetau.herokuapp.com/")}>
              Live Website Link
            </button> */}
        </div>
        <div className="project_card_smallsh">
          <div className="video_wrapper_smallsh">
            <ReactPlayer
              width={playerWidth_smallsh}
              height={playerHeight_smallsh}
              playing
              url="https://www.youtube.com/watch?v=vD2dPFSQ668?autoplay=1&modestbranding=1&frameborder=12"
              loop={true}
              muted={true}
              style={{ zIndex: 1 }}
              config={{
                youtube: youtubeOptions,
              }}
            />
          </div>
          <div className="text_description_smallsh">
            <ul>
              <li>
                Programmed a shell in C similar to the BASH shell, implementing
                parent/child process handling with the Unix process API. The
                shell can be ran in interactive mode, repeatedly prompting the
                user for input, or be fed commands from a file in
                non-interactive mode.
              </li>
              <li>
                Features implemented include forking of child processes to allow
                for commands fed to the shell to be ran in its own address
                space, execution of processes in the background with the "&"
                command, and use of the exec() family of functions to allow the
                shell to execute non-built in commands (searching for the
                command via the env path variable -
                https://linux.die.net/man/3/execvp).
              </li>
              <li>
                The shell repeatedly checks for background processes within the
                same process group and reports if any have exited along with
                their PID. The SIGCONT signal is sent to any stopped child
                background processes by the shell to resume their execution.
                https://linux.die.net/man/2/waitpid
              </li>
              <li>
                Parameter expansion - special shell parameters include $$ for
                the smallsh process ID GETPID(3), $? for the exit status of the
                last foreground process, and $! for the most recent background
                process. Occurrences of ${} allow for variable expansion for a
                named environment variable.
              </li>
              <li>
                Implemented custom behavior for SIGINT and SIGSTP signals,
                allowing the shell to ignore these signals while allowing child
                processes to respond via custom signal handlers and sigaction
                structure.
              </li>
              <li>
                Parsed command line input into semantic tokens via word
                splitting. Implemented redirection operators '&lt;', '&gt;', and
                '&gt;&gt;' to redirect STDIN and STDOUT to specific files.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmallShellProject;
