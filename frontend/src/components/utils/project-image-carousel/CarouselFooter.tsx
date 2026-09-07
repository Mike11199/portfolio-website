import type { ReactNode } from "react";
import styles from "./CarouselFooter.module.css";

interface CarouselFooterProps {
  status: ReactNode;
  showArrows: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const CarouselFooter = ({ status, showArrows, hasPrevious, hasNext, onPrevious, onNext }: CarouselFooterProps) => (
  <div className={styles.footer}>
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
  </div>
);

export default CarouselFooter;
