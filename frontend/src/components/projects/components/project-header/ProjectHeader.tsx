import type { ReactNode } from "react";
import styles from "./ProjectHeader.module.css";

interface ProjectHeaderProps {
  title: ReactNode;
  icons: ReactNode;
  actions?: ReactNode;
  trailingAction?: ReactNode;
  centeredIcons?: boolean;
  className?: string;
}

const ProjectHeader = ({ title, icons, actions, trailingAction, centeredIcons = false, className = "" }: ProjectHeaderProps) => (
  <div className={`${styles.header} ${trailingAction ? styles.hasTrailingAction : ""} ${centeredIcons ? styles.centeredIcons : ""} ${className}`}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.icons}>{icons}</div>
    {actions && <div className={styles.actions}>{actions}</div>}
    {trailingAction && <div className={styles.trailingAction}>{trailingAction}</div>}
  </div>
);

export default ProjectHeader;
