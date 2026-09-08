import { useEffect, useState, type ReactNode } from "react";
import useMediaFullscreen from "./useMediaFullscreen";
import MediaToolbar from "./MediaToolbar";
import { MediaViewContext } from "./MediaViewContext";
import styles from "./ProjectMediaView.module.css";

interface ProjectMediaViewProps {
  children: ReactNode;
  code?: ReactNode;
  className?: string;
  showCode?: boolean;
  showHeader?: boolean;
  mediaLayout?: "carousel" | "video" | "phone";
  onToggleCode?: () => void;
}

interface MediaLayerProps {
  hidden: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  children: ReactNode;
}

const MediaLayer = ({ hidden, hasHeader, hasFooter, children }: MediaLayerProps) => (
  <div className={`${styles.mediaLayer} ${hidden ? styles.hiddenMedia : ""}`} aria-hidden={hidden || undefined}>
    {hasHeader && <div className={styles.mediaHeader} aria-hidden="true" />}
    <div className={styles.mediaContent}>{children}</div>
    {hasFooter && <div className={styles.videoFooter} aria-hidden="true" />}
  </div>
);

/** Mount on first use, then preserve open files when switching back to images. */
const CodeLayer = ({ visible, children }: { visible: boolean; children: ReactNode }) => {
  const [hasOpened, setHasOpened] = useState(visible);
  useEffect(() => {
    if (visible) setHasOpened(true);
  }, [visible]);

  if ((!hasOpened && !visible) || !children) return null;
  return <div className={styles.codeLayer} hidden={!visible}>{children}</div>;
};

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
  const { root, isFullscreen, toggleFullscreen } = useMediaFullscreen();
  const hasHeader = showHeader && mediaLayout !== "phone";
  const viewClass = [
    styles.view,
    styles.adaptiveHeight,
    mediaLayout === "video" && !onToggleCode && styles.videoWithoutCode,
    isFullscreen && styles.expanded,
    !hasHeader && styles.overlayControls,
    showCode && styles.codeVisible,
    className,
    "project-media-view",
  ].filter(Boolean).join(" ");

  return (
    <MediaViewContext.Provider value={{ root, isFullscreen, showCode }}>
      <div className={isFullscreen ? styles.placeholder : undefined}>
        <div
          ref={root}
          data-fullscreen={isFullscreen || undefined}
          data-media-layout={mediaLayout}
          tabIndex={-1}
          role={isFullscreen ? "dialog" : "region"}
          aria-modal={isFullscreen || undefined}
          aria-label="Project media"
          className={viewClass}
        >
          <MediaToolbar
            mediaLayout={mediaLayout}
            onToggleCode={onToggleCode}
            onToggleFullscreen={toggleFullscreen}
          />
          <MediaLayer hidden={showCode} hasHeader={hasHeader} hasFooter={mediaLayout === "video"}>
            {children}
          </MediaLayer>
          <CodeLayer visible={showCode}>{code}</CodeLayer>
        </div>
      </div>
    </MediaViewContext.Provider>
  );
};

export default ProjectMediaView;
