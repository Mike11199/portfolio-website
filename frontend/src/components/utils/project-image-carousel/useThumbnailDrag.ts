import { useRef, useState, type MouseEvent, type PointerEvent } from "react";

/** Drag the strip without selecting a thumbnail when the mouse is released. */
const useThumbnailDrag = (enabled: boolean) => {
  const [isDragging, setIsDragging] = useState(false);
  const start = useRef<{ x: number; scrollLeft: number } | null>(null);
  const moved = useRef(false);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || event.pointerType !== "mouse" || event.button !== 0) return;
    start.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
    moved.current = false;
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const distance = event.clientX - start.current.x;
    if (!moved.current && Math.abs(distance) < 5) return;

    // Capture after movement so a normal thumbnail click keeps its target.
    if (!moved.current) {
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }
    moved.current = true;
    event.currentTarget.scrollLeft = start.current.scrollLeft - distance;
  };

  const stopDragging = () => {
    start.current = null;
    setIsDragging(false);
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!moved.current || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
    moved.current = false;
  };

  return {
    isDragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: stopDragging,
      onPointerCancel: stopDragging,
      onLostPointerCapture: stopDragging,
      onPointerLeave: () => { if (!moved.current) stopDragging(); },
      onClickCapture,
    },
  };
};

export default useThumbnailDrag;
