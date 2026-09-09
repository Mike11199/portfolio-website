import { useState, type ReactNode } from "react";
import CodeMinimap from "./minimap/CodeMinimap";
import minimapStyles from "./minimap/CodeMinimap.module.css";
import styles from "../GitHubCodeViewer.module.css";

interface Props {
  panelId: string;
  repository: string;
  filePath?: string;
  tabs: ReactNode;
  children: ReactNode;
}

const RepositoryEditor = ({ panelId, repository, filePath, tabs, children }: Props) => {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  return (
    <div className={styles.editor}>
      {tabs}
      {filePath && (
        <div className={styles.breadcrumb}>
          {repository} <span aria-hidden="true">›</span> {filePath}
        </div>
      )}
      <div ref={setViewport} id={panelId} className={styles.codeViewport} role="tabpanel" aria-label={filePath ?? "No file open"} tabIndex={0}>
        <div className={minimapStyles.editorBody}>
          <div className={minimapStyles.editorContent}>{children}</div>
          <CodeMinimap viewport={viewport} panelId={panelId} />
        </div>
      </div>
    </div>
  );
};

export default RepositoryEditor;
