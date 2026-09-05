import { useLayoutEffect, useRef, useState, type ComponentProps, type CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import "./ProjectImageCarousel.css";

type Props = Partial<ComponentProps<typeof Carousel>> & {
  /** Inset the entire carousel by 5% on each side on mobile. */
  mobilePadding?: boolean;
  /** Fixed frame height (pixels or a CSS length). Omit for adaptive height. */
  fixedHeight?: number | string;
};

// Avoid relying on the library's mount-time measurement of lazy-loaded images.
const ProjectImageCarousel = ({ mobilePadding = true, fixedHeight, ...props }: Props) => {
  const root = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState(props.selectedItem ?? 0);
  const activeItem = props.selectedItem ?? selectedItem;

  const updateAspectRatio = () => {
    const image = root.current?.querySelector<HTMLImageElement>(".slide.selected img");
    if (image?.naturalWidth && image.naturalHeight) {
      root.current?.style.setProperty("--project-image-ratio", `${image.naturalWidth} / ${image.naturalHeight}`);
    }
  };

  useLayoutEffect(updateAspectRatio, [activeItem, props.children]);

  return (
    <div ref={root} className={`project-image-carousel${mobilePadding ? " project-image-carousel--mobile-padded" : ""}${fixedHeight !== undefined ? " project-image-carousel--fixed" : ""}`} style={{ "--project-image-height": typeof fixedHeight === "number" ? `${fixedHeight}px` : fixedHeight } as CSSProperties} onLoadCapture={updateAspectRatio}>
      <Carousel
        {...props}
        dynamicHeight={false}
        // The library selects its animation handler only in its constructor.
        key="fade"
        animationHandler="fade"
        selectedItem={activeItem}
        swipeable={false}
        emulateTouch={false}
        onChange={(index, item) => {
          setSelectedItem(index);
          props.onChange?.(index, item);
        }}
      />
    </div>
  );
};

export default ProjectImageCarousel;
