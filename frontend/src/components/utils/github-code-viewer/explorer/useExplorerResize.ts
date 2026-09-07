import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

const MIN_EXPLORER_WIDTH = 48;
const MAX_EXPLORER_WIDTH = 600;
const clampWidth = (width: number) => Math.min(MAX_EXPLORER_WIDTH, Math.max(MIN_EXPLORER_WIDTH, width));

export const useExplorerResize = () => {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [explorerWidth, setExplorerWidth] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 600 ? 160 : 224
  );
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = workspaceRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const nextWidth = clampWidth(event.clientX - bounds.left);
      setExplorerWidth(nextWidth);
    };
    const stopResizing = () => setIsResizing(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResizing);
    window.addEventListener("pointercancel", stopResizing);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResizing);
      window.removeEventListener("pointercancel", stopResizing);
    };
  }, [isResizing]);

  const startExplorerResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsResizing(true);
  };

  const handleExplorerResizeKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === "ArrowRight" ? 16 : event.key === "ArrowLeft" ? -16 : 0;
    if (delta === 0) return;
    event.preventDefault();
    setExplorerWidth((current) => clampWidth(current + delta));
  };

  return {
    workspaceRef,
    explorerWidth,
    isResizing,
    separatorProps: {
      role: "separator",
      tabIndex: 0,
      "aria-label": "Resize file explorer",
      "aria-orientation": "vertical" as const,
      "aria-valuemin": MIN_EXPLORER_WIDTH,
      "aria-valuemax": MAX_EXPLORER_WIDTH,
      "aria-valuenow": Math.round(explorerWidth),
      onPointerDown: startExplorerResize,
      onKeyDown: handleExplorerResizeKeyDown,
    },
  };
};
