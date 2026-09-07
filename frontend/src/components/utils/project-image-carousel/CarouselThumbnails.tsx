import { useLayoutEffect, useRef } from "react";
import type { ProjectMedia } from "./ProjectMediaSlide";
import styles from "./CarouselThumbnails.module.css";

interface CarouselThumbnailsProps {
  items: ProjectMedia[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const CarouselThumbnails = ({
  items,
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: CarouselThumbnailsProps) => {
  const strip = useRef<HTMLDivElement>(null);
  const selected = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const container = strip.current;
    const button = selected.current;
    if (!container || !button) return;
    const left = button.offsetLeft;
    const right = left + button.offsetWidth;
    if (left < container.scrollLeft) container.scrollLeft = left;
    else if (right > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = right - container.clientWidth;
    }
  }, [activeIndex]);

  return (
    <div className={styles.ribbon}>
      <button type="button" className={styles.scrollButton} aria-label="Previous image from thumbnails" onClick={onPrevious} disabled={!hasPrevious}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg>
      </button>
      <div ref={strip} className={styles.strip} role="group" aria-label="Choose image">
        {items.map((item, index) => (
          <button
            key={item.src}
            ref={index === activeIndex ? selected : null}
            type="button"
            aria-label={`Show image ${index + 1}: ${item.alt}`}
            aria-pressed={index === activeIndex}
            onClick={() => onSelect(index)}
          >
            <img src={item.thumbnail ?? item.poster ?? item.src} alt="" />
          </button>
        ))}
      </div>
      <button type="button" className={styles.scrollButton} aria-label="Next image from thumbnails" onClick={onNext} disabled={!hasNext}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
      </button>
    </div>
  );
};

export default CarouselThumbnails;
