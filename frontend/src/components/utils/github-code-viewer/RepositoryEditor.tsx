import HighlightedCode from "../../about-me-section/code-demo/HighlightedCode";
import type { RepositoryFile } from "./repositoryFiles";
import RepositoryIcon from "./RepositoryIcon";
import styles from "./GitHubCodeViewer.module.css";

interface RepositoryEditorProps {
  repository: string;
  file: RepositoryFile;
  fileUrl: string;
  source: string;
  isLoading: boolean;
  hasError: boolean;
}

const RepositoryEditor = ({ repository, file, fileUrl, source, isLoading, hasError }: RepositoryEditorProps) => (
  <main className={styles.editor}>
    <div className={styles.tab}>
      <RepositoryIcon path={file.path} />
      <span className={styles.tabName}>{file.path.split("/").pop()}</span>
    </div>
    <div className={styles.breadcrumb}>
      {repository} <span aria-hidden="true">›</span> {file.path}
    </div>
    <div className={styles.codeViewport}>
      {isLoading && <div className={styles.message}>Loading source from GitHub…</div>}
      {hasError && (
        <div className={styles.message} role="alert">
          Could not load this file. <a href={fileUrl} target="_blank" rel="noreferrer">Open it on GitHub.</a>
        </div>
      )}
      {!isLoading && !hasError && file.isBinary && (
        <div className={styles.message}>
          This is a binary repository asset. <a href={fileUrl} target="_blank" rel="noreferrer">Open it on GitHub.</a>
        </div>
      )}
      {!isLoading && !hasError && !file.isBinary && (
        <div className={styles.codeLines}>
          {source.split("\n").map((line, index) => (
            <div className={styles.codeLine} key={`${file.path}-${index}`}>
              <span className={styles.lineNumber} aria-hidden="true">{index + 1}</span>
              <HighlightedCode code={line || " "} language={file.language} />
            </div>
          ))}
        </div>
      )}
    </div>
  </main>
);

export default RepositoryEditor;
