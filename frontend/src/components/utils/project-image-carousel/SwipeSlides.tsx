import type { RefObject } from "react";
import ProjectMediaSlide, { type ProjectMedia } from "./ProjectMediaSlide";
import { getSlideIndex } from "./carouselNavigation";

interface Props {
  items: ProjectMedia[];
  activeIndex: number;
  loop: boolean;
  track: RefObject<HTMLDivElement>;
}

/** Neighbors on both sides let the last and first images drag seamlessly into view. */
const SwipeSlides = ({ items, activeIndex, loop, track }: Props) => (
  <div ref={track} className="carousel-swipe-track">
    {[-1, 0, 1].map((offset) => {
      const outside = activeIndex + offset < 0 || activeIndex + offset >= items.length;
      const item = items[getSlideIndex(activeIndex, offset, items.length, loop)];
      return (
        <div className="carousel-swipe-slide" key={offset} aria-hidden={offset !== 0}>
          {item && (loop || !outside) && <ProjectMediaSlide media={item} active={offset === 0} />}
        </div>
      );
    })}
  </div>
);

export default SwipeSlides;
