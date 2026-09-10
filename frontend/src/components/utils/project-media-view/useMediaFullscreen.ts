/**
 * Keeps fullscreen behavior out of ProjectMediaView.
 * Uses an in-page overlay to avoid browser fullscreen prompts and keep mobile navigation visible.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

/** Wrap Tab navigation at the edges of the expanded view. */
const keepFocusInside = (event: KeyboardEvent, container: HTMLElement) => {
  const controls = Array.from(container.querySelectorAll<HTMLElement>(
    'button:not(:disabled), a[href], [tabindex="0"]',
  )).filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  const focused = document.activeElement;

  if (event.shiftKey && (focused === first || focused === container)) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && focused === last) {
    event.preventDefault();
    first?.focus();
  }
};

/** Show the keyboard hint for mouse/trackpad users. */
const showExitHint = () => {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  return toast("Press Esc to Exit Fullscreen", { duration: 1200 });
};

/** Expand media within the page, keeping browser controls available. */
const useMediaFullscreen = () => {
  const root = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const mediaView = root.current;
    if (!isFullscreen || !mediaView) return;

    // Keep the page behind the expanded view from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mediaView.focus({ preventScroll: true });
    const hint = showExitHint();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
      if (event.key === "Tab") keepFocusInside(event, mediaView);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (hint) toast.dismiss(hint);
      // Keep focus nearby without highlighting the fullscreen button.
      mediaView.focus({ preventScroll: true });
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => setIsFullscreen((current) => !current);
  const openFullscreen = useCallback(() => setIsFullscreen(true), []);
  return { root, isFullscreen, toggleFullscreen, openFullscreen };
};

export default useMediaFullscreen;
