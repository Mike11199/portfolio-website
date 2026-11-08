import type { ReactNode } from "react";
import styles from "./ProjectHeader.module.css";
import caseStyles from "../case-study/CaseStudy.module.css";

interface ProjectHeaderProps {
  title: ReactNode;
  category: string;
  subtitle?: string;
  icons: ReactNode;
  actions?: ReactNode;
  trailingAction?: ReactNode;
  mobileAction?: ReactNode;
  centeredIcons?: boolean;
  className?: string;
}

const ProjectHeader = ({ title, category, subtitle, icons, actions, trailingAction, mobileAction, className = "" }: ProjectHeaderProps) => (
  <div className={`${caseStyles.caseHeader} ${styles.header} ${trailingAction ? styles.hasTrailingAction : ""} ${className}`}>
    <div className={caseStyles.headerTitle}>
      <p className={caseStyles.eyebrow}>{category}</p>
      <h2>{title}</h2>
      {subtitle && <ul className={caseStyles.technologyTags} aria-label="Project technologies">
        {subtitle.split(" / ").map((technology) => <li key={technology}>{technology}</li>)}
      </ul>}
    </div>
    <div className={caseStyles.stack}>{icons}</div>
    {(actions || mobileAction) && (
      <div className={caseStyles.actions}>
        {actions}
        {mobileAction && <div className={styles.mobileAction}>{mobileAction}</div>}
      </div>
    )}
    {trailingAction && <div className={styles.trailingAction}>{trailingAction}</div>}
  </div>
);

export default ProjectHeader;
