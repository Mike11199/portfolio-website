import type { ReactNode } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import CustomTextCarousel from "../../../custom-text-carousel/CustomTextCarousel";
import styles from "./ProjectSection.module.css";
import FileDivider from "../../../utils/text-decoration/FileDivider";
import HexFooter from "../../../utils/text-decoration/HexFooter";
import ProjectMediaView from "../../../utils/project-media-view/ProjectMediaView";

interface ProjectSectionProps {
  media: ReactNode;
  code?: ReactNode;
  description: string[];
  showCode?: boolean;
  onToggleCode?: () => void;
  mediaLayout?: "carousel" | "video" | "phone";
}

/** Owns the shared height for media and description panels. */
const ProjectSection = ({
  media,
  code,
  description,
  showCode,
  onToggleCode,
  mediaLayout = "carousel",
}: ProjectSectionProps) => {
  const isMobile = useWindowWidth() <= 600;
  const decorationText = description.join("\n\n");

  return (
    <div className={styles.layout}>
      <ProjectMediaView
        className={styles.media}
        code={code}
        showCode={!isMobile && showCode}
        onToggleCode={isMobile ? undefined : onToggleCode}
        mediaLayout={mediaLayout}
      >
        {media}
      </ProjectMediaView>
      {isMobile ? (
        <div className={styles.mobileDescription}>
          <CustomTextCarousel descriptionList={description} heightProp="var(--project-total-height)" />
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
