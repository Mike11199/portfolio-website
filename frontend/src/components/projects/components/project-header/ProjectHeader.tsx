import type { ReactNode } from "react";
import styles from "./ProjectHeader.module.css";

interface ProjectHeaderProps {
  title: ReactNode;
  icons: ReactNode;
  actions?: ReactNode;
  centeredIcons?: boolean;
  className?: string;
}

const ProjectHeader = ({ title, icons, actions, centeredIcons = false, className = "" }: ProjectHeaderProps) => (
  <div className={`${styles.header} ${centeredIcons ? styles.centeredIcons : ""} ${className}`}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.icons}>{icons}</div>
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>
);

export default ProjectHeader;
