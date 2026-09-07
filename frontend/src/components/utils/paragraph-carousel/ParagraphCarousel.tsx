import { useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import FileDivider from "../text-decoration/FileDivider";
import HexFooter from "../text-decoration/HexFooter";
import styles from "./ParagraphCarousel.module.css";
import "../../custom-text-carousel/CustomTextCarousel.css";

interface ParagraphCarouselProps {
  paragraphs: string[];
  label: string;
  navigationLabel: string;
  minHeight: string;
  renderParagraph: (text: string, index: number) => ReactNode;
}

const ParagraphCarousel = ({ paragraphs, label, navigationLabel, minHeight, renderParagraph }: ParagraphCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeIndex = Math.min(selectedIndex, Math.max(0, paragraphs.length - 1));
  const decorationText = paragraphs.join("\n\n");
  const navigate = (step: number) => {
    if (paragraphs.length > 0) {
      setSelectedIndex((activeIndex + step + paragraphs.length) % paragraphs.length);
    }
  };

  return (
    <div className="carousel-container">
      <div className="text-carousel-content">
        <button
          type="button"
          className="carousel-button"
          aria-label={`Previous ${navigationLabel} paragraph`}
          disabled={paragraphs.length < 2}
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowUp} size="sm" />
        </button>
        <div className="textWrapperMobile">
          <div className={styles.panel} style={{ minHeight }}>
            <FileDivider label={label} hexText={decorationText} />
            <div className={styles.slideStack}>
              {paragraphs.map((text, index) => (
                <div key={index} className={styles.slide} aria-hidden={index !== activeIndex}>
                  <div className={styles.slideText}>{renderParagraph(text, index)}</div>
                  {index === activeIndex && <HexFooter text={decorationText} fillOnly />}
                </div>
              ))}
            </div>
            <div className={styles.pageCount} aria-live="polite" aria-atomic="true">
              {paragraphs.length === 0 ? 0 : activeIndex + 1} / {paragraphs.length}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="carousel-button"
          aria-label={`Next ${navigationLabel} paragraph`}
          disabled={paragraphs.length < 2}
          onClick={() => navigate(1)}
        >
          <FontAwesomeIcon icon={faArrowDown} size="sm" />
        </button>
      </div>
    </div>
  );
};

export default ParagraphCarousel;
