import ReactPlayer from "react-player";

interface ReactPlayerProps {
  URL: string;
}

/**
 * React video player to embed a video on the website from YouTube.
 * @param {string} URL - The URL of the video.
 * @returns {JSX.Element} The React element representing the video player.
 */
const ReactVideoPlayer = ({
  URL,
  }: ReactPlayerProps) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        playing
        width='100%'
        height='100%'
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
