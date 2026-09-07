import { useEffect, useRef } from "react";
import { useMediaView } from "../project-media-view/MediaViewContext";

export const useFullscreenSwipe = (onPrevious: () => void, onNext: () => void) => {
  const viewport = useRef<HTMLDivElement>(null);
  const { isFullscreen, showCode } = useMediaView() ?? {};

  useEffect(() => {
    const element = viewport.current;
    if (!element || !isFullscreen || showCode) return;

    let start: { x: number; y: number } | null = null;
    let swiped = false;

    const handleStart = (event: TouchEvent) => {
      swiped = false;
      start = event.touches.length === 1 && window.matchMedia("(max-width: 600px)").matches
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
    };
    const handleCancel = () => { start = null; };
    const handleEnd = (event: TouchEvent) => {
      if (!start || event.touches.length !== 0) return;
      const dx = event.changedTouches[0].clientX - start.x;
      const dy = event.changedTouches[0].clientY - start.y;
      start = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

      // A swipe must not also trigger the image's left/right tap button.
      event.preventDefault();
      swiped = true;
      if (dx < 0) onNext();
      else onPrevious();
    };
    const handleClick = (event: MouseEvent) => {
      if (!swiped) return;
      event.preventDefault();
      event.stopPropagation();
      swiped = false;
    };

    element.addEventListener("touchstart", handleStart, { passive: true });
    element.addEventListener("touchcancel", handleCancel);
    element.addEventListener("touchend", handleEnd, { passive: false });
    element.addEventListener("click", handleClick, true);
    return () => {
      element.removeEventListener("touchstart", handleStart);
      element.removeEventListener("touchcancel", handleCancel);
      element.removeEventListener("touchend", handleEnd);
      element.removeEventListener("click", handleClick, true);
    };
  }, [isFullscreen, showCode, onPrevious, onNext]);

  return viewport;
};
