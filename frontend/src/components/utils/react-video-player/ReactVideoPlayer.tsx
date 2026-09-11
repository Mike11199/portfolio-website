import { useState } from "react";
import styles from "./ReactVideoPlayer.module.css";
import ReactPlayerImport from "react-player";
import { useMediaView } from "../project-media-view/MediaViewContext";
import { useMediaVisibility } from "../project-media-view/useMediaVisibility";

// Vite 8 can expose react-player v2's CommonJS default as a nested export.
const ReactPlayer = (
  ReactPlayerImport as typeof ReactPlayerImport & { default?: typeof ReactPlayerImport }
).default ?? ReactPlayerImport;

interface ReactPlayerProps {
  URL: string;
  controls?: boolean;
  loadingIndicator?: boolean;
}

const ReactVideoPlayer = ({ URL, controls = true, loadingIndicator = false }: ReactPlayerProps) => {

  const [settledUrl, setSettledUrl] = useState<string | null>(null);
  const isLoading = loadingIndicator && settledUrl !== URL;
  const showCode = useMediaView()?.showCode ?? false;
  const { ref, isVisible } = useMediaVisibility();

  const youtubeOptions = {
    playerVars: {
      controls: controls ? 1 : 0,
      showinfo: 0,
      playsinline: 1,
    },
  };

  return (
    <div ref={ref} className={`player-wrapper ${styles.frame}`} aria-busy={isLoading}>
      <ReactPlayer
        playing={isVisible && !showCode}
        onPlay={() => setSettledUrl(URL)}
        onError={() => setSettledUrl(URL)}
        width="100%"
        height="100%"
        url={URL}
        loop={true}
        muted={true}
        playsinline
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
