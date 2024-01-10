import ReactPlayer from "react-player";

interface ReactPlayerProps {
  URL: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * React video player to embed a video on the website from YouTube.
 * @param {string} URL - The URL of the video.
 * @param {number} width - The width of the video player.
 * @param {number} height - The height of the video player.
 * @param {string} className - Classname for div that surrounds the video as a wrapper.
 * @returns {JSX.Element} The React element representing the video player.
 */
const ReactVideoPlayer = ({
  URL,
  width,
  height,
  className,
}: ReactPlayerProps) => {
  return (
    <div className={`${className}`}>
      <ReactPlayer
        width={width}
        height={height}
        playing
        url={URL}
        loop={true}
        muted={true}
        style={{ zIndex: 1 }}
        config={{
          youtube: youtubeOptions,
        }}
      />
    </div>
  );
};

const youtubeOptions = {
  playerVars: {
    controls: 1,
    showinfo: 0,
    playsinline: 1,
  },
};

export default ReactVideoPlayer;
