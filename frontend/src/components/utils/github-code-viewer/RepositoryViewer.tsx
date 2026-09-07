// Read-only GitHub source viewer with a collapsible explorer and resizable panes.
import { useId, useState, type CSSProperties } from "react";
import RepositoryEditor from "./RepositoryEditor";
import RepositoryExplorer from "./RepositoryExplorer";
import { useExplorerResize } from "./useExplorerResize";
import { useRepositorySource } from "./useRepositorySource";
import styles from "./GitHubCodeViewer.module.css";

export interface GitHubCodeViewerProps {
  repositoryUrl: string;
  owner: string;
  repository: string;
  branch?: string;
}

const RepositoryViewer = ({ repositoryUrl, owner, repository, branch = "main" }: GitHubCodeViewerProps) => {
  const panelId = useId();
  const [showFiles, setShowFiles] = useState(false);
  const { files, activeFile, openPaths, setActivePath, closePath, closeAll, closeOthers, source, isLoading, hasError } = useRepositorySource(owner, repository, branch);
  const { workspaceRef, explorerWidth, isResizing, separatorProps } = useExplorerResize();
  return (
    <section
      className={`${styles.viewer} ${isResizing ? styles.isResizing : ""} github-code-viewer`}
      style={{ "--explorer-width": `${explorerWidth}px` } as CSSProperties}
      aria-label={`${repository} source code`}
    >
      <header className={styles.titlebar}>
        <span className={styles.windowTitle}>{repository}</span>
      </header>

      <button
        type="button"
        className={styles.filesToggle}
        aria-expanded={showFiles}
        onClick={() => setShowFiles((visible) => !visible)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7V5h6l2 2h10v13H3Z" />
        </svg>
        <span>{showFiles ? "Back to code" : "Files"}</span>
        <svg className={styles.filesChevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>
      <div ref={workspaceRef} className={`${styles.workspace} ${showFiles ? styles.mobileFilesOpen : ""}`}>
        <RepositoryExplorer
          repository={repository}
          files={files}
          activePath={activeFile?.path ?? ""}
          onSelectFile={(path) => {
            setActivePath(path);
            setShowFiles(false);
          }}
        />
        <div className={styles.explorerDivider} {...separatorProps} />
        <RepositoryEditor
          panelId={panelId}
          repository={repository}
          file={activeFile}
          openPaths={openPaths}
          onSelectFile={setActivePath}
          onCloseFile={closePath}
          onCloseAll={closeAll}
          onCloseOthers={closeOthers}
          fileUrl={activeFile ? `${repositoryUrl}/blob/${branch}/${activeFile.path}` : repositoryUrl}
          source={source}
          isLoading={isLoading}
          hasError={hasError}
        />
      </div>

      <footer className={styles.statusbar}>
        <span>{activeFile?.language ?? "No file open"}</span>
        <span>{activeFile && isLoading ? "Loading" : activeFile && hasError ? "Offline" : "GitHub source"}</span>
        <span className={styles.statusSpacer} />
        <a href={`https://github.dev/${owner}/${repository}`} target="_blank" rel="noreferrer">VS Code Web ↗</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </section>
  );
};

const GitHubCodeViewer = (props: GitHubCodeViewerProps) => (
  <RepositoryViewer key={`${props.owner}/${props.repository}/${props.branch ?? "main"}`} {...props} />
);

export default GitHubCodeViewer;
