import { useState, type ReactNode } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ProjectSummary from "../project-summary/ProjectSummary";
import type { ProjectContent } from "../project-summary/ProjectSummary.types";
import styles from "../project-summary/ProjectSummary.module.css";
import ProjectMediaView from "../../../utils/project-media-view/ProjectMediaView";

// Set to false to hide code view on mobile. Desktop is unaffected.
const SHOW_CODE_ON_MOBILE = true;

interface ProjectSectionProps {
  content: ProjectContent;
  media: ReactNode;
  code?: ReactNode;
  description: string[];
  showCode?: boolean;
  defaultDesktopView?: "media" | "code";
  onToggleCode?: () => void;
  mediaLayout?: "carousel" | "video" | "phone";
}

/** Owns the shared height for media and description panels. */
const ProjectSection = ({
  content,
  media,
  code,
  description,
  showCode,
  defaultDesktopView = "media",
  onToggleCode,
  mediaLayout = "carousel",
}: ProjectSectionProps) => {
  const isMobile = useWindowWidth() <= 600;
  const [selectedCodeView, setSelectedCodeView] = useState<boolean | null>(null);
  const codeVisible = showCode ?? selectedCodeView ?? (!isMobile && defaultDesktopView === "code");
  const toggleCode = onToggleCode ?? (() => setSelectedCodeView(!codeVisible));
  const canShowCode = !isMobile || (SHOW_CODE_ON_MOBILE && mediaLayout !== "phone");

  return (
    <div className={`${styles.projectLayout} ${styles.projectBody}`}>
      <ProjectMediaView
        code={code}
        showCode={codeVisible && canShowCode}
        onToggleCode={canShowCode && code ? toggleCode : undefined}
        mediaLayout={mediaLayout}
      >
        {media}
      </ProjectMediaView>
      <ProjectSummary content={content} description={description} />
    </div>
  );
};

export default ProjectSection;
