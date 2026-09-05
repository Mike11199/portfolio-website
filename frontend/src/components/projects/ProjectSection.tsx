import type { ReactNode } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import CustomTextCarousel from "../CustomTextCarousel";
import styles from "./ProjectSection.module.css";
import FileDivider from "../utils/FileDivider";
import HexFooter from "../utils/HexFooter";

interface ProjectSectionProps {
  media: ReactNode;
  description: string[];
  supplementalMedia?: ReactNode;
}

/** Owns panel sizing; media can inherit --project-panel-height for its frame. */
const ProjectSection = ({ media, description, supplementalMedia }: ProjectSectionProps) => {
  const isMobile = useWindowWidth() <= 600;
  const decorationText = description.join("\n\n");

  return (
    <div className={styles.layout}>
      <div className={styles.media}>
        {media}
        {supplementalMedia && <div className={styles.supplemental}>{supplementalMedia}</div>}
      </div>
      {isMobile ? (
        <div className={styles.mobileDescription}>
          <CustomTextCarousel descriptionList={description} heightProp="62vh" />
        </div>
      ) : (
        <div className={styles.description} role="region" aria-label="Project description" tabIndex={0}>
          <FileDivider label="project.txt" hexText={decorationText} />
          <ul className={styles.descriptionList}>
            {description.map((text) => <li key={text}>{text}</li>)}
          </ul>
          <HexFooter text={decorationText} />
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
