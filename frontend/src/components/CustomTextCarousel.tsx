import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";

interface CustomTextCarouselProps {
  descriptionList: string[];
  heightProp: string;
}

const CustomTextCarousel: React.FC<CustomTextCarouselProps> = ({
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
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <ul>
              <li>{descriptionList[currentIndex]}</li>
            </ul>
            <div style={{textAlign: "center", marginBottom: "1rem"}}>
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
      <div className="normal-text-desktop-view">
        <div className="textWrapperDesktop">
          <ul style={{display: "flex", gap: "2rem", flexDirection: "column"}}>
            {descriptionList.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
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

export default CustomTextCarousel;
