import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import HexFooter from "./utils/HexFooter";
import FileDivider from "./utils/FileDivider";
import styles from "./styles/AboutMeTextCarousel.module.css";

interface CustomTextCarouselProps {
  descriptionList: string[];
  heightProp: string;
}

const CustomTextCarousel: React.FC<CustomTextCarouselProps> = ({
  descriptionList,
  heightProp,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const decorationText = descriptionList.join("\n\n");
  const totalChildren = descriptionList?.length;
  const windowWidth = useWindowWidth();
  const isMobileView = windowWidth <= 600;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalChildren);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalChildren) % totalChildren
    );
  };

  if (isMobileView) {
    return (
      <div className="carousel-container">
        <div className="text-carousel-content">
          <button type="button" aria-label="Previous project paragraph" onClick={goToPrevious} className="carousel-button top-button" disabled={totalChildren < 2}>
            <FontAwesomeIcon icon={faArrowUp} size="sm" />
          </button>
          <div className="textWrapperMobile">
            <div className={styles.mobileText} style={{ minHeight: heightProp.replace("vh", "svh") }}>
              <FileDivider label="project.txt" hexText={decorationText} />
              <div className={styles.slideStack}>
                {descriptionList.map((text, index) => (
                  <div key={index} className={styles.slide} aria-hidden={index !== currentIndex}>
                    <div className={styles.slideText}>
                      <ul style={{ marginBottom: "1rem" }}>
                        <li className="listTextItem">{text}</li>
                      </ul>
                    </div>
                    {index === currentIndex && <HexFooter text={decorationText} fillOnly />}
                  </div>
                ))}
              </div>
              <div className={styles.pageCount} aria-live="polite" aria-atomic="true">
                {currentIndex + 1} / {totalChildren}
              </div>
            </div>
          </div>
          <button type="button" aria-label="Next project paragraph" onClick={goToNext} className="carousel-button bottom-button" disabled={totalChildren < 2}>
            <FontAwesomeIcon icon={faArrowDown} size="sm" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="normal-text-desktop-view">
      <div className={`textWrapperDesktop ${styles.desktopText}`}>
        <FileDivider label="project.txt" hexText={decorationText} />
        <ul style={{display: "flex", gap: "2rem", flexDirection: "column", flexShrink: 0, marginBlock: "1rem"}}>
          {descriptionList.map((x) => (
            <li key={x}><span>{x}</span></li>
          ))}
        </ul>
        <HexFooter text={decorationText} />
      </div>
    </div>
  );
};

export default CustomTextCarousel;
