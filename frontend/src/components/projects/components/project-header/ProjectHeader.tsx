import type { ReactNode } from "react";
import styles from "./ProjectHeader.module.css";

interface ProjectHeaderProps {
  title: ReactNode;
  icons: ReactNode;
  actions?: ReactNode;
  trailingAction?: ReactNode;
  mobileAction?: ReactNode;
  centeredIcons?: boolean;
  className?: string;
}

const ProjectHeader = ({ title, icons, actions, trailingAction, mobileAction, centeredIcons = false, className = "" }: ProjectHeaderProps) => (
  <div className={`${styles.header} ${trailingAction ? styles.hasTrailingAction : ""} ${centeredIcons ? styles.centeredIcons : ""} ${className}`}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.icons}>{icons}</div>
    {(actions || mobileAction) && (
      <div className={styles.actions}>
        {actions}
        {mobileAction && <div className={styles.mobileAction}>{mobileAction}</div>}
      </div>
    )}
    {trailingAction && <div className={styles.trailingAction}>{trailingAction}</div>}
  </div>
);

export default ProjectHeader;
