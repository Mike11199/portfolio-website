import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import { TypeAnimation } from "react-type-animation";

interface AboutMeTextCarousel {
  descriptionList: string[];
  heightProp: string;
}

const AboutMeTextCarousel: React.FC<AboutMeTextCarousel> = ({
  descriptionList,
  heightProp,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const TextCarouselForMobileView = () => {
    return (
      <div
        className="carousel-container"
        style={{ height: heightProp, marginBottom: "12rem" }}
      >
        <div className="text-carousel-content">
          <button onClick={goToPrevious} className="carousel-button top-button">
            <FontAwesomeIcon icon={faArrowUp} size="sm" />
          </button>
          <div className="textWrapperMobile" style={{ height: heightProp }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
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
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
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
  };

  const TextWrapperForDesktopView = () => {
    return (
      <div
        className="normal-text-desktop-view"
        style={{ width: "100%", height: "fit-content", maxHeight: "60vh" }}
      >
        <div className="textWrapperDesktop" style={{ width: "100%" }}>
          <div style={{ marginBottom: "1.25rem" }}>
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
      </div>
    );
  };

  return (
    <>
      {isMobileView && <TextCarouselForMobileView />}
      {!isMobileView && <TextWrapperForDesktopView />}
    </>
  );
};

export default AboutMeTextCarousel;
