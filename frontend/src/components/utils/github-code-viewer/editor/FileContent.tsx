import { lazy, Suspense } from "react";
import HighlightedCode from "../../code/HighlightedCode";
import type { RepositoryFile } from "../data/repositoryFiles";
import styles from "../GitHubCodeViewer.module.css";

const MarkdownFile = lazy(() => import("../markdown/MarkdownFile"));

interface Props {
  file: RepositoryFile | null;
  repositoryUrl: string;
  branch: string;
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

const FileContent = ({ file, repositoryUrl, branch, fileUrl, source, isLoading, hasError }: Props) => {
  if (isLoading) return <div className={styles.message} role="status">{file ? "Loading source from GitHub…" : "Loading repository…"}</div>;
  if (!file) return <div className={styles.message}>Select a file from the explorer to open it.</div>;
  if (hasError) return (
    <div className={styles.message} role="alert">
      Could not load this file. <a href={fileUrl} target="_blank" rel="noreferrer">Open it on GitHub.</a>
    </div>
  );
  if (file.isBinary) return (
    <div className={styles.message}>
      This is a binary repository asset. <a href={fileUrl} target="_blank" rel="noreferrer">Open it on GitHub.</a>
    </div>
  );

  const sourceView = <SourceCode source={source} language={file.language} />;
  if (file.language !== "markdown") return sourceView;

  return (
    <Suspense fallback={<div className={styles.message}>Loading Markdown preview…</div>}>
      <MarkdownFile key={file.path} source={source} filePath={file.path} repositoryUrl={repositoryUrl} branch={branch}>
        {sourceView}
      </MarkdownFile>
    </Suspense>
  );
};

export default FileContent;
