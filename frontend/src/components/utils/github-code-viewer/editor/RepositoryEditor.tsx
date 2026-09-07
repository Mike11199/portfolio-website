import type { ReactNode } from "react";
import styles from "../GitHubCodeViewer.module.css";

interface Props {
  panelId: string;
  repository: string;
  filePath?: string;
  tabs: ReactNode;
  children: ReactNode;
}

const RepositoryEditor = ({ panelId, repository, filePath, tabs, children }: Props) => (
  <div className={styles.editor}>
    {tabs}
    {filePath && (
      <div className={styles.breadcrumb}>
        {repository} <span aria-hidden="true">›</span> {filePath}
      </div>
    )}
    <div id={panelId} className={styles.codeViewport} role="tabpanel" aria-label={filePath ?? "No file open"} tabIndex={0}>
      {children}
    </div>
  </div>
);

export default RepositoryEditor;
