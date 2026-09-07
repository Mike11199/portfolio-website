import { useEffect, useRef } from "react";
import { useMediaView } from "../project-media-view/MediaViewContext";
import { useMediaVisibility } from "../project-media-view/useMediaVisibility";

export interface ProjectMedia {
  alt: string;
  src: string;
  /** Still image displayed before video playback. */
  poster?: string;
  /** Small uploaded image used by the carousel's thumbnail row. */
  thumbnail?: string;
}

interface Props {
  media: ProjectMedia;
  active?: boolean;
}

/** Play uploaded videos directly, with the same looping behavior as GIFs. */
const ProjectMediaSlide = ({ media, active = true }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showCode = useMediaView()?.showCode ?? false;
  const { ref, isVisible } = useMediaVisibility();
  const shouldPlay = active && isVisible && !showCode;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay) video.pause();
    else void video.play().catch(() => { /* Autoplay may be unavailable. */ });
  }, [shouldPlay, media.src]);

  return (
    <div ref={ref}>
      {/\.(webm|mp4)(?:$|[?#])/i.test(media.src) ? (
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          controls={false}
          autoPlay={shouldPlay}
          muted
          loop
          playsInline
          tabIndex={-1}
        />
      ) : (
        <img loading="lazy" decoding="async" alt={media.alt} src={media.src} />
      )}
    </div>
  );
};

export default ProjectMediaSlide;
