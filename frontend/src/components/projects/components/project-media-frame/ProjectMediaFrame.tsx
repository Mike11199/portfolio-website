import type { CSSProperties, ReactNode } from "react";
import styles from "./ProjectMediaFrame.module.css";

interface Props {
  children: ReactNode;
  layout?: "single" | "phone";
  background?: CSSProperties["background"];
}

/** Fits a video or a pair of portrait demos into the shared project panel. */
const ProjectMediaFrame = ({ children, layout = "single", background }: Props) => (
  <div style={{ background }} className={`${styles.frame}${layout === "phone" ? ` ${styles.paired} ${styles.phone}` : ""}`}>
    {children}
  </div>
);

export default ProjectMediaFrame;
