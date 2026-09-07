import type { CSSProperties, ReactNode } from "react";
import styles from "./ProjectMediaFrame.module.css";

interface Props {
  children: ReactNode;
  paired?: boolean;
  background?: CSSProperties["background"];
}

/** Fits a video or a pair of portrait demos into the shared project panel. */
const ProjectMediaFrame = ({ children, paired = false, background }: Props) => (
  <div style={{ background }} className={`${styles.frame}${paired ? ` ${styles.paired}` : ""}`}>
    {children}
  </div>
);

export default ProjectMediaFrame;
