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
      <div
        className="carousel-container"
        style={{ height: "fit-content", minHeight: heightProp }}
      >
        <div className="text-carousel-content">
          <button onClick={goToPrevious} className="carousel-button top-button">
            <FontAwesomeIcon icon={faArrowUp} size="sm" />
          </button>
          <div
            className="textWrapperMobile"
            style={{ height: "fit-content", minHeight: heightProp }}
          >
            <div className={styles.mobileText} style={{ minHeight: heightProp }}>
              <div className={styles.bio}>
                <FileDivider label="project.txt" hexText={decorationText} />
                <ul style={{ marginBottom: "1rem" }}>
                  <li className="listTextItem">{descriptionList[currentIndex]}</li>
                </ul>
              </div>
              <HexFooter text={decorationText} />
              <div style={{textAlign: "center", marginTop: "1rem", flexShrink: 0}}>
                {currentIndex + 1} / {totalChildren}
              </div>
            </div>
          </div>
          <button onClick={goToNext} className="carousel-button bottom-button">
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
