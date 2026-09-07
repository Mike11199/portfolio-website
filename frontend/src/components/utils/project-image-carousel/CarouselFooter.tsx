import type { ReactNode } from "react";
import styles from "./CarouselFooter.module.css";

interface CarouselFooterProps {
  status: ReactNode;
  showArrows: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  hasFirst: boolean;
  hasLast: boolean;
  onFirst: () => void;
  onLast: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const CarouselFooter = ({ status, showArrows, hasPrevious, hasNext, hasFirst, hasLast, onFirst, onLast, onPrevious, onNext }: CarouselFooterProps) => (
  <div className={styles.footer}>
    {showArrows && (
      <button type="button" className={styles.first} onClick={onFirst} disabled={!hasFirst} aria-label="First slide" title="First slide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14m12-14-8 7 8 7" /></svg>
      </button>
    )}
    {showArrows && (
      <button type="button" className={styles.previous} onClick={onPrevious} disabled={!hasPrevious} aria-label="Previous slide">
        <span className={styles.chevron} aria-hidden="true" />
        Previous
      </button>
    )}
    <span className={styles.status} aria-live="polite" aria-atomic="true">{status}</span>
    {showArrows && (
      <button type="button" className={styles.next} onClick={onNext} disabled={!hasNext} aria-label="Next slide">
        Next
        <span className={styles.chevron} aria-hidden="true" />
      </button>
    )}
    {showArrows && (
      <button type="button" className={styles.last} onClick={onLast} disabled={!hasLast} aria-label="Last slide" title="Last slide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14M6 5l8 7-8 7" /></svg>
      </button>
    )}
  </div>
);

export default CarouselFooter;
