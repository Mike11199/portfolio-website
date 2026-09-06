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
}

/** Play uploaded videos directly, with the same looping behavior as GIFs. */
export default function ProjectMediaSlide({ media }: Props) {
  return (
    <div>
      {/\.(webm|mp4)(?:$|[?#])/i.test(media.src) ? (
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          controls={false}
          autoPlay
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
}
