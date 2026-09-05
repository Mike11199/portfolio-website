import React, { useState } from "react";
import "../App.css";
import styles from "./styles/AboutMeTextCarousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import { TypeAnimation } from "react-type-animation";
import HexFooter from "./utils/HexFooter";
import FileDivider from "./utils/FileDivider";

interface AboutMeTextCarouselProps {
  descriptionList: string[];
  heightProp: string;
}

const AboutMeTextCarousel: React.FC<AboutMeTextCarouselProps> = ({
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
        style={{ height: "auto" }}
      >
        <div className="text-carousel-content">
          <button aria-label="Previous introduction paragraph" onClick={goToPrevious} className="carousel-button top-button">
            <FontAwesomeIcon icon={faArrowUp} size="sm" />
          </button>
          <div className="textWrapperMobile" style={{ height: heightProp }}>
            <div className={styles.mobileText} style={{ height: "100%" }}>
              <div className={styles.bio}>
                <FileDivider label="about_me.txt" hexText={decorationText} />
                {currentIndex == 0 && (
                  <p>
                    <TypeAnimation
                      cursor={true}
                      speed={{ type: "keyStrokeDelayInMs", value: 750 }}
                      sequence={["Hello! "]}
                    />
                  </p>
                )}
                <p>{descriptionList[currentIndex]}</p>
              </div>
              <HexFooter text={decorationText} fillOnly />
              <div style={{ textAlign: "center", marginTop: "1rem", flexShrink: 0 }}>
                {currentIndex + 1} / {totalChildren}
              </div>
            </div>
          </div>
          <button aria-label="Next introduction paragraph" onClick={goToNext} className="carousel-button bottom-button">
            <FontAwesomeIcon icon={faArrowDown} size="sm" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="normal-text-desktop-view"
    >
      <div className={`textWrapperDesktop ${styles.desktopText}`} style={{ width: "100%" }}>
        <div className={styles.bio}>
          <FileDivider label="about_me.txt" hexText={decorationText} />
          <div style={{ marginTop: "1rem", marginBottom: "1.25rem" }}>
            <TypeAnimation
              cursor={true}
              speed={{ type: "keyStrokeDelayInMs", value: 750 }}
              sequence={["Hello! "]}
            />
          </div>
          {descriptionList.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <HexFooter text={decorationText} />
      </div>
    </div>
  );
};

export default AboutMeTextCarousel;
