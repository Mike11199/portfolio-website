import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export const DIVIDER_HEIGHT = 8;
const INITIAL_RATIO = 188 / (320 - DIVIDER_HEIGHT);
const MIN_TERMINAL_HEIGHT = 40;

/** Keeps resize gestures and keyboard handling out of the demo's presentation. */
export const useResizablePanel = () => {
  const panelsRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(320);
  const [editorRatio, setEditorRatio] = useState(INITIAL_RATIO);
  const availableHeight = Math.max(0, panelHeight - DIVIDER_HEIGHT);
  const minHeight = Math.min(80, availableHeight / 2);
  const maxHeight = Math.max(minHeight, availableHeight - MIN_TERMINAL_HEIGHT);
  const clampHeight = (height: number) => Math.min(maxHeight, Math.max(minHeight, height));
  const editorHeight = clampHeight(editorRatio * availableHeight);
  const drag = useRef<{ pointerId: number; startY: number; startHeight: number } | null>(null);

  // Desktop height follows the neighboring photos; preserve the split on resize.
  useLayoutEffect(() => {
    const panels = panelsRef.current;
    if (!panels) return;
    const measure = () => setPanelHeight(panels.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panels);
    return () => observer.disconnect();
  }, []);

  const setEditorHeight = (height: number) => {
    if (availableHeight > 0) setEditorRatio(clampHeight(height) / availableHeight);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointerId: event.pointerId, startY: event.clientY, startHeight: editorHeight };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    setEditorHeight(clampHeight(current.startHeight + event.clientY - current.startY));
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp": setEditorHeight(editorHeight - 16); break;
      case "ArrowDown": setEditorHeight(editorHeight + 16); break;
      case "Home": setEditorHeight(minHeight); break;
      case "End": setEditorHeight(maxHeight); break;
      default: return;
    }
    event.preventDefault();
  };

  return {
    panelsRef,
    editorHeight,
    separatorProps: {
      role: "separator",
      tabIndex: 0,
      "aria-orientation": "horizontal" as const,
      "aria-valuemin": minHeight,
      "aria-valuemax": maxHeight,
      "aria-valuenow": editorHeight,
      "aria-valuetext": `Code ${Math.round(editorHeight)} pixels, terminal ${Math.round(availableHeight - editorHeight)} pixels`,
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onLostPointerCapture: onPointerEnd,
      onKeyDown,
      onDoubleClick: () => setEditorRatio(INITIAL_RATIO),
    },
  };
};
