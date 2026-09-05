import { useState } from "react";
import styles from "./ReactVideoPlayer.module.css";
import ReactPlayer from "react-player";

interface ReactPlayerProps {
  URL: string;
  controls?: boolean;
  loadingIndicator?: boolean;
}

/**
 * React video player to embed a video on the website from YouTube.
 * @param {string} URL - The URL of the video.
 * @returns {JSX.Element} The React element representing the video player.
 */
const ReactVideoPlayer = ({ URL, controls = true, loadingIndicator = false }: ReactPlayerProps) => {

  const [settledUrl, setSettledUrl] = useState<string | null>(null);
  const isLoading = loadingIndicator && settledUrl !== URL;

  const youtubeOptions = {
    playerVars: {
      controls: controls ? 1 : 0,
      showinfo: 0,
      playsinline: 1,
    },
  };

  return (
    <div className={`player-wrapper ${loadingIndicator ? styles.frame : ""}`} aria-busy={isLoading}>
      <ReactPlayer
        playing
        onPlay={() => setSettledUrl(URL)}
        onError={() => setSettledUrl(URL)}
        width="100%"
        height="100%"
        url={URL}
        loop={true}
        muted={true}
        style={{ zIndex: 1 }}
        config={{
          youtube: youtubeOptions,
        }}
      />
      {isLoading && (
        <div className={styles.loading} role="status" aria-label="Loading climbing video">
          <span className={styles.spinner} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};


export default ReactVideoPlayer;
