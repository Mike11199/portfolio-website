import { useEffect, useRef, useState } from "react";
import ProjectMediaSlide, { type ProjectMedia } from "./ProjectMediaSlide";
import CarouselFooter from "./CarouselFooter";
import CarouselThumbnails from "./CarouselThumbnails";
import { useMediaView } from "../project-media-view/MediaViewContext";
import { getSlideIndex } from "./carouselNavigation";
import { useFullscreenSwipe } from "./useFullscreenSwipe";
import SwipeSlides from "./SwipeSlides";
import "./ProjectImageCarousel.css";

interface ProjectImageCarouselProps {
  items: ProjectMedia[];
  loop?: boolean;
}

interface SlideNavigationProps {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}

const SlideNavigation = ({ direction, disabled, onClick }: SlideNavigationProps) => {
  const [flash, setFlash] = useState(0);

  return (
    <button
      type="button"
      className={`carousel-slide-navigation carousel-slide-navigation--${direction}`}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} image`}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        setFlash((value) => value + 1);
        onClick();
      }}
    >
      {flash > 0 && <span key={flash} className="carousel-navigation-flash" aria-hidden="true" />}
    </button>
  );
};

const useFullscreenNavigation = (onPrevious: () => void, onNext: () => void) => {
  const mediaView = useMediaView();
  const { root, isFullscreen, showCode } = mediaView ?? {};

  useEffect(() => {
    if (!isFullscreen || showCode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]")) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();
      root?.current?.focus({ preventScroll: true });
      if (event.key === "ArrowLeft") onPrevious();
      else onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [root, isFullscreen, showCode, onPrevious, onNext]);
};

const ProjectImageCarousel = ({ items, loop = true }: ProjectImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const activeIndex = Math.min(selectedIndex, Math.max(0, items.length - 1));
  const hasMultipleSlides = items.length > 1;
  const hasPrevious = hasMultipleSlides && (loop || activeIndex > 0);
  const hasNext = hasMultipleSlides && (loop || activeIndex < items.length - 1);
  const previous = () => setSelectedIndex(getSlideIndex(activeIndex, -1, items.length, loop));
  const next = () => setSelectedIndex(getSlideIndex(activeIndex, 1, items.length, loop));

  useFullscreenNavigation(previous, next);
  const swipe = useFullscreenSwipe({ activeIndex, hasPrevious, hasNext, onPrevious: previous, onNext: next });

  return (
    <div ref={root} className="project-image-carousel" role="region" aria-label="Project media carousel">
      <div className={`carousel-viewport ${swipe.enabled ? "carousel-viewport--swipe" : ""}`} {...swipe.handlers}>
        {swipe.enabled ? (
          <SwipeSlides items={items} activeIndex={activeIndex} loop={loop} track={swipe.track} />
        ) : items.map((item, index) => (
          <div className="carousel-slide" key={item.src} aria-hidden={index !== activeIndex}>
            <ProjectMediaSlide media={item} active={index === activeIndex} />
          </div>
        ))}
        {hasMultipleSlides && (
          <>
            <SlideNavigation direction="previous" disabled={!hasPrevious} onClick={previous} />
            <SlideNavigation direction="next" disabled={!hasNext} onClick={next} />
          </>
        )}
      </div>
      {items.length > 0 && (
        <>
          <CarouselThumbnails
            items={items}
            activeIndex={activeIndex}
            onSelect={setSelectedIndex}
          />
          <CarouselFooter
            status={`${activeIndex + 1} of ${items.length}`}
            showArrows={hasMultipleSlides}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            hasFirst={activeIndex > 0}
            hasLast={activeIndex < items.length - 1}
            onFirst={() => setSelectedIndex(0)}
            onLast={() => setSelectedIndex(items.length - 1)}
            onPrevious={previous}
            onNext={next}
          />
        </>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
