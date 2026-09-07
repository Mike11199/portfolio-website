import { Children, isValidElement, useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type CSSProperties, type ReactElement } from "react";
import { Carousel } from "react-responsive-carousel";
import ProjectMediaSlide, { type ProjectMedia } from "./ProjectMediaSlide";
import CarouselFooter from "./CarouselFooter";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProjectImageCarousel.css";

type Props = Partial<ComponentProps<typeof Carousel>> & {
  /** Inset the entire carousel by 5% on each side on mobile. */
  mobilePadding?: boolean;
  /** Fixed frame height (pixels or a CSS length). Omit for adaptive height. */
  fixedHeight?: number | string;
};

const isMediaSlide = (slide: unknown): slide is ReactElement<{ media: ProjectMedia }> => {
  return isValidElement<{ media: ProjectMedia }>(slide) && slide.type === ProjectMediaSlide;
};

// Avoid relying on the library's mount-time measurement of lazy-loaded images.
const ProjectImageCarousel = ({ mobilePadding = true, fixedHeight, ...props }: Props) => {
  const root = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<Carousel>(null);
  const [selectedItem, setSelectedItem] = useState(props.selectedItem ?? 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeItem = props.selectedItem ?? selectedItem;
  const slides = Children.toArray(props.children);
  const showArrows = props.showArrows !== false && slides.length > 1;
  const showStatus = props.showStatus !== false;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === root.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleArrowKey = (event: KeyboardEvent) => {
      if (document.fullscreenElement !== root.current || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]")) return;

      event.preventDefault();
      // Handle fullscreen navigation once, before the library's keyboard listener.
      event.stopPropagation();
      if (event.key === "ArrowLeft") {
        carouselRef.current?.onClickPrev();
      } else {
        carouselRef.current?.onClickNext();
      }
    };

    document.addEventListener("keydown", handleArrowKey, true);
    return () => document.removeEventListener("keydown", handleArrowKey, true);
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    const element = root.current;
    if (!element) return;

    try {
      if (document.fullscreenElement === element) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  const updateAspectRatio = () => {
    const image = root.current?.querySelector<HTMLImageElement>(".slide.selected img");
    const video = root.current?.querySelector<HTMLVideoElement>(".slide.selected video");
    const width = video?.videoWidth || image?.naturalWidth;
    const height = video?.videoHeight || image?.naturalHeight;
    if (width && height) {
      root.current?.style.setProperty("--project-image-ratio", `${width} / ${height}`);
    }
  };

  useLayoutEffect(updateAspectRatio, [activeItem, props.children]);

  return (
    <div ref={root} data-infinite-loop={Boolean(props.infiniteLoop)} className={`project-image-carousel${mobilePadding ? " project-image-carousel--mobile-padded" : ""}${fixedHeight !== undefined ? " project-image-carousel--fixed" : ""}`} style={{ "--project-image-height": typeof fixedHeight === "number" ? `${fixedHeight}px` : fixedHeight } as CSSProperties} onLoadCapture={updateAspectRatio} onLoadedMetadataCapture={updateAspectRatio}>
      <button type="button" className="carousel-fullscreen-button" onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "View carousel fullscreen"}
        aria-pressed={isFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "View carousel fullscreen"}>
        <svg className="carousel-fullscreen-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
        </svg>
      </button>
      <Carousel
        ref={carouselRef}
        {...props}
        showArrows={slides.length > 1}
        // Use the library's navigation slots so hit areas stay inside the media frame.
        renderArrowPrev={(onClick, available, label) => slides.length > 1 && (
          <button type="button" className="carousel-slide-navigation carousel-slide-navigation--previous"
            onClick={onClick} disabled={!available} aria-label={label} />
        )}
        renderArrowNext={(onClick, available, label) => slides.length > 1 && (
          <button type="button" className="carousel-slide-navigation carousel-slide-navigation--next"
            onClick={onClick} disabled={!available} aria-label={label} />
        )}
        showStatus={false}
        dynamicHeight={false}
        // The library selects its animation handler only in its constructor.
        key="fade"
        animationHandler="fade"
        selectedItem={activeItem}
        swipeable={false}
        emulateTouch={false}
        // Use uploaded stills; eager loading keeps the ribbon populated before navigation.
        renderThumbs={() => slides.map((slide, index) => isMediaSlide(slide) ? (
          <img key={slide.key} loading="eager" decoding="async" alt={slide.props.media.alt}
            src={slide.props.media.thumbnail ?? slide.props.media.poster ?? slide.props.media.src} />
        ) : <span key={index}>{index + 1}</span>)}
        onChange={(index, item) => {
          setSelectedItem(index);
          props.onChange?.(index, item);
        }}
      />
      {slides.length > 0 && (showArrows || showStatus) && (
        <CarouselFooter
          status={showStatus ? (props.statusFormatter?.(activeItem + 1, slides.length) ?? `${activeItem + 1} of ${slides.length}`) : null}
          showArrows={showArrows}
          hasPrevious={activeItem > 0 || Boolean(props.infiniteLoop)}
          hasNext={activeItem < slides.length - 1 || Boolean(props.infiniteLoop)}
          hasFirst={activeItem > 0}
          hasLast={activeItem < slides.length - 1}
          onFirst={() => carouselRef.current?.moveTo(0)}
          onLast={() => carouselRef.current?.moveTo(slides.length - 1)}
          onPrevious={() => carouselRef.current?.onClickPrev()}
          onNext={() => carouselRef.current?.onClickNext()}
        />
      )}
    </div>
  );
};

export default ProjectImageCarousel;
