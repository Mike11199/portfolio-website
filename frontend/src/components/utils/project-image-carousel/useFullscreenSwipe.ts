import { useLayoutEffect, useRef } from "react";
import type { TouchEvent, MouseEvent } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { useMediaView } from "../project-media-view/MediaViewContext";

interface SwipeOptions {
  activeIndex: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

interface Drag {
  x: number;
  y: number;
  startedAt: number;
  width: number;
  offset: number;
  horizontal: boolean;
}

const position = (offset: number) => `translateX(calc(-100% + ${offset}px))`;

/** Move the three-slide strip directly while dragging; commit selection after it settles. */
export const useFullscreenSwipe = ({ activeIndex, hasPrevious, hasNext, onPrevious, onNext }: SwipeOptions) => {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const animation = useRef<Animation | null>(null);
  const suppressClick = useRef(false);
  const { isFullscreen, showCode } = useMediaView() ?? {};
  const width = useWindowWidth();
  const enabled = !!isFullscreen && !showCode &&
    (width <= 600 || window.matchMedia("(pointer: coarse)").matches);

  // Recenter on the newly selected slide before the browser paints.
  useLayoutEffect(() => {
    animation.current?.cancel();
    animation.current = null;
    drag.current = null;
    if (track.current) track.current.style.transform = position(0);
    return () => { animation.current?.cancel(); };
  }, [activeIndex, enabled]);

  const settle = (direction: number) => {
    const gesture = drag.current;
    const strip = track.current;
    drag.current = null;
    if (!gesture || !strip) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = strip.animate(
      [{ transform: position(gesture.offset) }, { transform: position(-direction * gesture.width) }],
      { duration: reducedMotion ? 0 : 200, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" },
    );
    animation.current = motion;
    motion.onfinish = () => {
      if (direction < 0) onPrevious();
      else if (direction > 0) onNext();
      else {
        strip.style.transform = position(0);
        motion.cancel();
        animation.current = null;
      }
    };
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!enabled) return;
    suppressClick.current = !!animation.current;
    if (event.touches.length !== 1) { settle(0); return; }
    if (animation.current) return;
    const touch = event.touches[0];
    drag.current = {
      x: touch.clientX, y: touch.clientY, startedAt: performance.now(),
      width: event.currentTarget.clientWidth, offset: 0, horizontal: false,
    };
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const gesture = drag.current;
    if (!gesture) return;
    if (event.touches.length !== 1) { settle(0); return; }
    const dx = event.touches[0].clientX - gesture.x;
    const dy = event.touches[0].clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dy) >= Math.abs(dx)) { drag.current = null; return; }
      gesture.horizontal = true;
      suppressClick.current = true;
    }
    const atEdge = dx > 0 ? !hasPrevious : !hasNext;
    gesture.offset = Math.max(-gesture.width, Math.min(gesture.width, dx * (atEdge ? 0.2 : 1)));
    if (track.current) track.current.style.transform = position(gesture.offset);
  };

  const onTouchEnd = () => {
    const gesture = drag.current;
    if (!gesture) return;
    if (!gesture.horizontal) { drag.current = null; return; }
    const distance = Math.abs(gesture.offset);
    const speed = distance / Math.max(1, performance.now() - gesture.startedAt);
    const passedThreshold = distance > gesture.width * 0.2 || (distance > 25 && speed > 0.5);
    const direction = gesture.offset < 0 ? 1 : -1;
    const canMove = direction > 0 ? hasNext : hasPrevious;
    settle(passedThreshold && canMove ? direction : 0);
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current && !animation.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  return {
    enabled, track,
    handlers: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: () => settle(0), onClickCapture },
  };
};
