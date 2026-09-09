// Read-only GitHub source viewer with a collapsible explorer and resizable panes.
import { useId, useState, type CSSProperties } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import FileContent from "./editor/FileContent";
import RepositoryTabs from "./tabs/RepositoryTabs";
import RepositoryEditor from "./editor/RepositoryEditor";
import RepositoryExplorer from "./explorer/RepositoryExplorer";
import { useExplorerResize } from "./explorer/useExplorerResize";
import { useRepositorySource } from "./data/useRepositorySource";
import { useMediaView } from "../project-media-view/MediaViewContext";
import styles from "./GitHubCodeViewer.module.css";

export interface GitHubCodeViewerProps {
  repositoryUrl: string;
  owner: string;
  repository: string;
  branch?: string;
  defaultFile?: string;
  defaultOpenFiles?: readonly string[];
}

interface FontSizeButtonProps {
  direction: "decrease" | "increase";
  disabled: boolean;
  onClick: () => void;
}

const FontSizeButton = ({ direction, disabled, onClick }: FontSizeButtonProps) => {
  const label = direction === "decrease" ? "Decrease code font size" : "Increase code font size";

  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="10" r="6" />
        <path d={direction === "decrease" ? "m15 15 6 6M7 10h6" : "m15 15 6 6M7 10h6M10 7v6"} />
      </svg>
    </button>
  );
};

interface FontSizeControlsProps {
  fontSize: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const FontSizeControls = ({ fontSize, onDecrease, onIncrease }: FontSizeControlsProps) => (
  <div className={styles.fontControls} role="group" aria-label="Code font size">
    <FontSizeButton direction="decrease" disabled={fontSize <= 6} onClick={onDecrease} />
    <FontSizeButton direction="increase" disabled={fontSize >= 24} onClick={onIncrease} />
  </div>
);

const RepositoryViewer = ({ repositoryUrl, owner, repository, branch = "main", defaultFile, defaultOpenFiles }: GitHubCodeViewerProps) => {
  const panelId = useId();
  const isMobile = useWindowWidth() <= 600;
  const [showFiles, setShowFiles] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const isFullscreen = useMediaView()?.isFullscreen ?? false;
  const showFontControls = !isMobile || isFullscreen;
  const [revealRequest, setRevealRequest] = useState(0);
  const { files, activeFile, tabs, source, isLoading, hasError } = useRepositorySource({
    owner,
    repository,
    branch,
    defaultFile,
    defaultOpenFiles: isMobile ? undefined : defaultOpenFiles,
  });
  const { workspaceRef, explorerWidth, isResizing, separatorProps } = useExplorerResize();
  return (
    <section
      className={`${styles.viewer} ${isResizing ? styles.isResizing : ""} github-code-viewer`}
      style={{ "--explorer-width": `${explorerWidth}px`, "--code-font-size": showFontControls ? `${fontSize}px` : undefined } as CSSProperties}
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
          revealRequest={revealRequest}
          files={files}
          activePath={activeFile?.path ?? ""}
          onSelectFile={(path) => {
            tabs.selectPath(path);
            setShowFiles(false);
          }}
        />
        <div className={styles.explorerDivider} {...separatorProps} />
        <RepositoryEditor
          panelId={panelId}
          repository={repository}
          filePath={activeFile?.path}
          tabs={
            <RepositoryTabs
              panelId={panelId}
              paths={tabs.paths}
              activePath={tabs.activePath}
              onSelect={(path) => {
                tabs.selectPath(path);
                setRevealRequest((request) => request + 1);
              }}
              onClose={tabs.closePath}
              onCloseAll={tabs.closeAll}
              onCloseOthers={tabs.closeOthers}
            />
          }
        >
          <FileContent
            file={activeFile}
            repositoryUrl={repositoryUrl}
            branch={branch}
            fileUrl={activeFile ? `${repositoryUrl}/blob/${branch}/${activeFile.path}` : repositoryUrl}
            source={source}
            isLoading={isLoading}
            hasError={hasError}
          />
        </RepositoryEditor>
      </div>

      <footer className={styles.statusbar}>
        <span>{activeFile?.language ?? "No file open"}</span>
        {activeFile && !isLoading && hasError && <span>Offline</span>}
        <span className={styles.statusSpacer} />
        {showFontControls && (
          <FontSizeControls
            fontSize={fontSize}
            onDecrease={() => setFontSize((size) => Math.max(6, size - 1))}
            onIncrease={() => setFontSize((size) => Math.min(24, size + 1))}
          />
        )}

        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </section>
  );
};

const GitHubCodeViewer = (props: GitHubCodeViewerProps) => (
  <RepositoryViewer key={`${props.owner}/${props.repository}/${props.branch ?? "main"}`} {...props} />
);

export default GitHubCodeViewer;
