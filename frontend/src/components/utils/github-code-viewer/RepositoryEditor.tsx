import HighlightedCode from "../code/HighlightedCode";
import type { RepositoryFile } from "./repositoryFiles";
import RepositoryTabs from "./RepositoryTabs";
import styles from "./GitHubCodeViewer.module.css";

interface RepositoryEditorProps {
  panelId: string;
  repository: string;
  file: RepositoryFile | null;
  openPaths: string[];
  onSelectFile: (path: string) => void;
  onCloseFile: (path: string) => void;
  fileUrl: string;
  source: string;
  isLoading: boolean;
  hasError: boolean;
}

const SourceCode = ({ source, language }: { source: string; language: string }) => (
  <div className={styles.sourceCode}>
    <pre className={styles.lineNumbers} aria-hidden="true">
      {source.split("\n").map((_, index) => index + 1).join("\n")}
    </pre>
    <pre className={styles.sourceText}>
      <HighlightedCode code={source || " "} language={language} />
    </pre>
  </div>
);

const RepositoryEditor = ({
  panelId,
  repository,
  file,
  openPaths,
  onSelectFile,
  onCloseFile,
  fileUrl,
  source,
  isLoading,
  hasError,
}: RepositoryEditorProps) => (
  <div className={styles.editor}>
    <RepositoryTabs paths={openPaths} activePath={file?.path ?? null} panelId={panelId} onSelect={onSelectFile} onClose={onCloseFile} />
    {file && <div className={styles.breadcrumb}>
      {repository} <span aria-hidden="true">›</span> {file.path}
    </div>}
    <div id={panelId} className={styles.codeViewport} role="tabpanel" aria-label={file?.path ?? "No file open"} tabIndex={0}>
      {!file && <div className={styles.message}>Select a file from the explorer to open it.</div>}
      {file && isLoading && <div className={styles.message}>Loading source from GitHub…</div>}
      {file && hasError && (
        <div className={styles.message} role="alert">
          Could not load this file. <a href={fileUrl} target="_blank" rel="noreferrer">Open it on GitHub.</a>
        </div>
      )}
      {file && !isLoading && !hasError && file.isBinary && (
        <div className={styles.message}>
          This is a binary repository asset. <a href={fileUrl} target="_blank" rel="noreferrer">Open it on GitHub.</a>
        </div>
      )}
      {file && !isLoading && !hasError && !file.isBinary && (
        <SourceCode source={source} language={file.language} />
      )}
    </div>
  </div>
);

export default RepositoryEditor;
