import { useWindowWidth } from "@react-hook/window-size";
import CodeViewButton from "../buttons/CodeViewButton";
import { useMediaView } from "./MediaViewContext";
import styles from "./ProjectMediaView.module.css";

interface FullscreenButtonProps {
  isFullscreen: boolean;
  showBack?: boolean;
  onClick: () => void;
}

const FullscreenButton = ({ isFullscreen, showBack = false, onClick }: FullscreenButtonProps) => {
  const label = isFullscreen ? "Exit fullscreen" : "View media fullscreen";
  const iconPath = showBack ? "M20 12H4M11 5l-7 7 7 7" : isFullscreen
    ? "M9 4v5H4M15 4v5h5M15 20v-5h5M9 20v-5H4"
    : "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5";

  return (
    <button
      type="button"
      className={styles.fullscreenButton}
      onClick={onClick}
      aria-pressed={isFullscreen}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      <span className={styles.buttonLabel}>{showBack ? "Back" : isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
    </button>
  );
};

interface MediaToolbarProps {
  mediaLayout: "carousel" | "video" | "phone";
  onToggleCode?: () => void;
  onToggleFullscreen: () => void;
}

/** Keep mobile button order and media-specific controls in one place. */
const MediaToolbar = ({ mediaLayout, onToggleCode, onToggleFullscreen }: MediaToolbarProps) => {
  const { isFullscreen = false, showCode = false } = useMediaView() ?? {};
  const isMobile = useWindowWidth() <= 600;
  const codeToggleInProjectHeader = isMobile && mediaLayout === "video" && !isFullscreen;

  if (mediaLayout === "phone" && !showCode && !isFullscreen) return null;

  const fullscreenButton = (mediaLayout !== "video" || showCode || isFullscreen) && (
    <FullscreenButton
      isFullscreen={isFullscreen}
      showBack={isMobile && isFullscreen}
      onClick={onToggleFullscreen}
    />
  );

  return (
    <div className={styles.toolbar} role="group" aria-label="Media controls">
      {isMobile && fullscreenButton}
      {onToggleCode && !codeToggleInProjectHeader && (
        <CodeViewButton showCode={showCode} onToggleCode={onToggleCode} />
      )}
      {!isMobile && fullscreenButton}
      {isMobile && isFullscreen && !showCode && mediaLayout === "carousel" && (
        <p className={styles.swipeHint}>Swipe or Tap Sides to Browse</p>
      )}
    </div>
  );
};

export default MediaToolbar;
