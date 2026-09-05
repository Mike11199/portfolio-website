import React, { useMemo, useState } from "react";
import "../App.css";
import styles from "./styles/AboutMeTextCarousel.module.css";
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
  const hexDump = useMemo(() => {
    const bytes = new TextEncoder().encode(descriptionList.join("\n\n"));
    const rows: string[] = [];
    for (let offset = 0; offset < bytes.length; offset += 16) {
      const hex = Array.from(bytes.slice(offset, offset + 16),
        byte => byte.toString(16).padStart(2, "0")).join(" ");
      rows.push(`0x${offset.toString(16).padStart(4, "0")}  ${hex}`);
    }
    return rows.join("\n");
  }, [descriptionList]);
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
        <div style={{ marginBottom: "1.25rem" }}>
          <TypeAnimation
            cursor={true}
            speed={{ type: "keyStrokeDelayInMs", value: 750 }}
            sequence={["Hello! "]}
          />
        </div>
        <div className={styles.divider} aria-hidden="true">about_me.txt</div>
        {descriptionList.map((text) => (
          <p key={text}>{text}</p>
      ))}
        </div>
        <div className={styles.hexFooter} aria-hidden="true">
          <div className={styles.hexContent}>
            <div className={styles.divider}>end of file<span className={styles.cursor}>?</span></div>
            <pre>{hexDump}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeTextCarousel;
