// Read-only GitHub source viewer with a collapsible explorer and resizable panes.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import RepositoryEditor from "./RepositoryEditor";
import RepositoryExplorer from "./RepositoryExplorer";
import { useExplorerResize } from "./useExplorerResize";
import { useRepositorySource } from "./useRepositorySource";
import styles from "./GitHubCodeViewer.module.css";

interface GitHubCodeViewerProps {
  repositoryUrl: string;
  owner: string;
  repository: string;
  branch?: string;
}

const GitHubCodeViewer = ({ repositoryUrl, owner, repository, branch = "main" }: GitHubCodeViewerProps) => {
  const { files, activeFile, setActivePath, source, isLoading, hasError } = useRepositorySource(owner, repository, branch);
  const { workspaceRef, explorerWidth, isResizing, separatorProps } = useExplorerResize();
  const viewerRef = useRef<HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChangingFullscreen, setIsChangingFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    const viewer = viewerRef.current;
    if (!viewer || isChangingFullscreen) return;
    setIsChangingFullscreen(true);
    setFullscreenError("");
    try {
      if (document.fullscreenElement === viewer) {
        await document.exitFullscreen();
      } else {
        await viewer.requestFullscreen();
      }
    } catch {
      setFullscreenError("Fullscreen is unavailable. Please try again.");
    } finally {
      setIsChangingFullscreen(false);
    }
  };

  return (
    <section
      ref={viewerRef}
      className={`${styles.viewer} ${isResizing ? styles.isResizing : ""} github-code-viewer`}
      style={{ "--explorer-width": `${explorerWidth}px` } as CSSProperties}
      aria-label={`${repository} source code`}
    >
      <header className={styles.titlebar}>
        <span className={styles.windowTitle}>{repository}</span>
        {fullscreenError && <span role="status">{fullscreenError}</span>}
        <button
          type="button"
          className={styles.fullscreenButton}
          onClick={toggleFullscreen}
          disabled={isChangingFullscreen}
          aria-label={isFullscreen ? "Exit code fullscreen" : "View code fullscreen"}
          aria-pressed={isFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "View code fullscreen"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={isFullscreen ? "M9 4v5H4M15 4v5h5M15 20v-5h5M9 20v-5H4" : "M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"} />
          </svg>
        </button>
      </header>

      <div ref={workspaceRef} className={styles.workspace}>
        <RepositoryExplorer
          repository={repository}
          files={files}
          activePath={activeFile.path}
          onSelectFile={setActivePath}
        />
        <div className={styles.explorerDivider} {...separatorProps} />
        <RepositoryEditor
          repository={repository}
          file={activeFile}
          fileUrl={`${repositoryUrl}/blob/${branch}/${activeFile.path}`}
          source={source}
          isLoading={isLoading}
          hasError={hasError}
        />
      </div>

      <footer className={styles.statusbar}>
        <span>{activeFile.language}</span>
        <span>{isLoading ? "Loading" : hasError ? "Offline" : "GitHub source"}</span>
        <span className={styles.statusSpacer} />
        <a href={`https://github.dev/${owner}/${repository}`} target="_blank" rel="noreferrer">VS Code Web ↗</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </section>
  );
};

export default GitHubCodeViewer;
