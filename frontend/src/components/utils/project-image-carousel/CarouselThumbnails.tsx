import { useLayoutEffect, useRef, useState } from "react";
import type { ProjectMedia } from "./ProjectMediaSlide";
import styles from "./CarouselThumbnails.module.css";

interface CarouselThumbnailsProps {
  items: ProjectMedia[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const CarouselThumbnails = ({
  items,
  activeIndex,
  onSelect,
}: CarouselThumbnailsProps) => {
  const strip = useRef<HTMLDivElement>(null);
  const selected = useRef<HTMLButtonElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useLayoutEffect(() => {
    const container = strip.current;
    if (!container) return;
    const updateOverflow = () => setHasOverflow(container.scrollWidth > container.clientWidth + 1);
    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(container);
    return () => observer.disconnect();
  }, [items.length]);

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

  const scrollThumbnails = (direction: number) => {
    const container = strip.current;
    if (!container) return;
    container.scrollBy({
      left: direction * container.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div className={`${styles.ribbon} ${hasOverflow ? "" : styles.noOverflow}`}>
      <button type="button" className={styles.scrollButton} aria-label="Scroll thumbnails left" onClick={() => scrollThumbnails(-1)}>
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
      <button type="button" className={styles.scrollButton} aria-label="Scroll thumbnails right" onClick={() => scrollThumbnails(1)}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
      </button>
    </div>
  );
};

export default CarouselThumbnails;
