import { useEffect, useRef, useState, type ReactNode } from "react";
import CodeViewButton from "../buttons/CodeViewButton";
import { MediaViewContext } from "./MediaViewContext";
import styles from "./ProjectMediaView.module.css";

interface Props {
  children: ReactNode;
  code?: ReactNode;
  className?: string;
  showCode?: boolean;
  onToggleCode?: () => void;
}

/** Keep the fullscreen element and toolbar mounted when switching media views. */
const ProjectMediaView = ({ children, code, className = "", showCode = false, onToggleCode }: Props) => {
  const root = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChangingFullscreen, setIsChangingFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    const element = root.current;
    if (!element || isChangingFullscreen) return;
    setIsChangingFullscreen(true);
    setFullscreenError("");
    try {
      if (document.fullscreenElement === element) await document.exitFullscreen();
      else await element.requestFullscreen();
    } catch {
      setFullscreenError("Fullscreen is unavailable. Please try again.");
    } finally {
      setIsChangingFullscreen(false);
    }
  };

  return (
    <MediaViewContext.Provider value={{ root, isFullscreen, showCode }}>
      <div ref={root} tabIndex={-1} role="region" aria-label="Project media"
        className={`${styles.view} ${className} project-media-view`}>
        <div className={styles.toolbar} role="group" aria-label="Media controls">
          {onToggleCode && <CodeViewButton showCode={showCode} onToggleCode={onToggleCode} />}
          <button type="button" className={styles.fullscreenButton} onClick={toggleFullscreen}
            disabled={isChangingFullscreen} aria-pressed={isFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "View media fullscreen"}
            title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={isFullscreen ? "M9 4v5H4M15 4v5h5M15 20v-5h5M9 20v-5H4" : "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"} />
            </svg>
          </button>
        </div>
        {fullscreenError && <div className={styles.error} role="status">{fullscreenError}</div>}
        <div className={`${styles.mediaLayer}${showCode ? ` ${styles.hiddenMedia}` : ""}`} aria-hidden={showCode || undefined}>
          {children}
        </div>
        {showCode && code && <div className={styles.codeLayer}>{code}</div>}
      </div>
    </MediaViewContext.Provider>
  );
};

export default ProjectMediaView;
