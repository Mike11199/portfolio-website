import { useEffect, useRef, useState, type ReactNode } from "react";
import CodeViewButton from "../buttons/CodeViewButton";
import { MediaViewContext } from "./MediaViewContext";
import styles from "./ProjectMediaView.module.css";

interface FullscreenButtonProps {
  isFullscreen: boolean;
  disabled: boolean;
  onClick: () => void;
}

const FullscreenButton = ({ isFullscreen, disabled, onClick }: FullscreenButtonProps) => {
  const label = isFullscreen ? "Exit fullscreen" : "View media fullscreen";
  const iconPath = isFullscreen
    ? "M9 4v5H4M15 4v5h5M15 20v-5h5M9 20v-5H4"
    : "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5";

  return (
    <button
      type="button"
      className={styles.fullscreenButton}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isFullscreen}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      <span className={styles.buttonLabel}>{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
    </button>
  );
};

interface MediaToolbarProps {
  showCode: boolean;
  onToggleCode?: () => void;
  children: ReactNode;
}

const MediaToolbar = ({ showCode, onToggleCode, children }: MediaToolbarProps) => (
  <div className={styles.toolbar} role="group" aria-label="Media controls">
    {onToggleCode && <CodeViewButton showCode={showCode} onToggleCode={onToggleCode} />}
    {children}
  </div>
);

const useMediaFullscreen = () => {
  const root = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChangingFullscreen, setIsChangingFullscreen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    const element = root.current;
    if (!element || isChangingFullscreen) return;

    setIsChangingFullscreen(true);
    setError("");
    try {
      if (document.fullscreenElement === element) await document.exitFullscreen();
      else await element.requestFullscreen();
    } catch {
      setError("Fullscreen is unavailable. Please try again.");
    } finally {
      setIsChangingFullscreen(false);
    }
  };

  return { root, isFullscreen, isChangingFullscreen, error, toggleFullscreen };
};

interface ProjectMediaViewProps {
  children: ReactNode;
  code?: ReactNode;
  className?: string;
  showCode?: boolean;
  showHeader?: boolean;
  mediaLayout?: "carousel" | "video" | "phone";
  onToggleCode?: () => void;
}

/** Keep the fullscreen element and toolbar mounted when switching media views. */
const ProjectMediaView = ({
  children,
  code,
  className = "",
  showCode = false,
  showHeader = true,
  mediaLayout = "carousel",
  onToggleCode,
}: ProjectMediaViewProps) => {
  const { root, isFullscreen, isChangingFullscreen, error, toggleFullscreen } = useMediaFullscreen();
  const [hasOpenedCode, setHasOpenedCode] = useState(showCode);
  useEffect(() => {
    if (showCode) setHasOpenedCode(true);
  }, [showCode]);

  const headerClass = showHeader && mediaLayout !== "phone" ? "" : styles.overlayControls;
  const mediaClass = showCode ? `${styles.mediaLayer} ${styles.hiddenMedia}` : styles.mediaLayer;

  return (
    <MediaViewContext.Provider value={{ root, isFullscreen, showCode }}>
      <div
        ref={root}
        tabIndex={-1}
        role="region"
        aria-label="Project media"
        className={`${styles.view} ${headerClass} ${showCode ? styles.codeVisible : ""} ${className} project-media-view`}
      >
        {(mediaLayout !== "phone" || showCode) && (
          <MediaToolbar showCode={showCode} onToggleCode={onToggleCode}>
            {(mediaLayout !== "video" || showCode) && (
              <FullscreenButton
                isFullscreen={isFullscreen}
                disabled={isChangingFullscreen}
                onClick={toggleFullscreen}
              />
            )}
          </MediaToolbar>
        )}
        {error && <div className={styles.error} role="status">{error}</div>}
        <div className={mediaClass} aria-hidden={showCode || undefined}>
          {showHeader && mediaLayout !== "phone" && <div className={styles.mediaHeader} aria-hidden="true" />}
          <div className={styles.mediaContent}>{children}</div>
          {mediaLayout === "video" && <div className={styles.videoFooter} aria-hidden="true" />}
        </div>
        {(hasOpenedCode || showCode) && code && (
          <div className={styles.codeLayer} hidden={!showCode}>{code}</div>
        )}
      </div>
    </MediaViewContext.Provider>
  );
};

export default ProjectMediaView;
