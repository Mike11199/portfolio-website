import type { ReactNode } from "react";
import styles from "./ProjectHeader.module.css";
import summaryStyles from "../project-summary/ProjectSummary.module.css";

interface ProjectHeaderProps {
  title: ReactNode;
  category: string;
  technologies?: string[];
  icons: ReactNode;
  actions?: ReactNode;
  trailingAction?: ReactNode;
  mobileAction?: ReactNode;
  centeredIcons?: boolean;
  className?: string;
}

const ProjectHeader = ({ title, technologies, icons, actions, trailingAction, mobileAction, className = "" }: ProjectHeaderProps) => (
  <div className={`${summaryStyles.projectHeader} ${styles.header} ${trailingAction ? styles.hasTrailingAction : ""} ${className}`}>
    <div className={summaryStyles.headerTitle}>
      <h2>{title}</h2>
      {technologies && <ul className={summaryStyles.technologyTags} aria-label="Project technologies">
        {technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>}
    </div>
    <div className={summaryStyles.stack}>{icons}</div>
    {(actions || mobileAction) && (
      <div className={summaryStyles.actions}>
        {actions}
        {mobileAction && <div className={styles.mobileAction}>{mobileAction}</div>}
      </div>
    )}
    {trailingAction && <div className={styles.trailingAction}>{trailingAction}</div>}
  </div>
);

export default ProjectHeader;
