// Read-only GitHub source viewer with a collapsible explorer and resizable panes.
import type { CSSProperties } from "react";
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

  return (
    <section
      className={`${styles.viewer} ${isResizing ? styles.isResizing : ""} github-code-viewer`}
      style={{ "--explorer-width": `${explorerWidth}px` } as CSSProperties}
      aria-label={`${repository} source code`}
    >
      <header className={styles.titlebar}>
        <span className={styles.windowTitle}>{repository}</span>
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
