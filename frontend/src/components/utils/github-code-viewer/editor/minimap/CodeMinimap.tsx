import { useEffect, useRef } from "react";
import { getMinimapGeometry, scrollFromMinimap, scrollFromMinimapPoint } from "./minimapGeometry";
import styles from "./CodeMinimap.module.css";

interface Props {
  viewport: HTMLDivElement | null;
  panelId: string;
}

/** A canvas overview of the mounted source, controlling the existing scrollport. */
const CodeMinimap = ({ viewport, panelId }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const thumb = thumbRef.current;
    if (!viewport || !track || !canvas || !thumb) return;

    let source: HTMLElement | null = null;
    let frame = 0;
    let needsPaint = false;
    let drag: { id: number; offset: number } | null = null;
    let lineHeight = 20;
    let rows: { text: string; top: number; height: number }[] = [];
    let color = "";
    let paintedOffset = -1;
    const geometry = () => getMinimapGeometry(track.clientHeight, viewport.clientHeight, viewport.scrollHeight, viewport.scrollTop, lineHeight);

    const measure = () => {
      // Cache document-space row positions only on content/layout changes, not
      // scroll. Wrapped rows retain their actual offsets and vertical extent.
      const origin = viewport.getBoundingClientRect().top + viewport.clientTop - viewport.scrollTop;
      const elements = source ? Array.from(source.querySelectorAll("pre")) : [];
      lineHeight = elements[0] ? parseFloat(getComputedStyle(elements[0]).lineHeight) || 20 : 20;
      rows = elements.map(row => {
        const rect = row.getBoundingClientRect();
        return { text: (row.textContent ?? "").replace(/\t/g, "    ").slice(0, 200), top: rect.top - origin, height: rect.height };
      });
      color = getComputedStyle(track).color;
    };
    const paint = (current: ReturnType<typeof geometry>) => {
      if (!source || !track.clientWidth || !track.clientHeight) return;
      const width = track.clientWidth;
      const height = track.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      // Keep the bitmap track-sized even for huge files; draw only its window.
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.textBaseline = "top";
      context.font = `${Math.min(3, lineHeight * current.scale)}px Consolas, "Courier New", monospace`;
      for (const row of rows) {
        const y = row.top * current.scale - current.offset;
        if (y + row.height * current.scale < 0) continue;
        if (y >= height) break;
        context.fillText(row.text, 4, y);
      }
      paintedOffset = current.offset;
    };

    const schedule = (repaint = false) => {
      needsPaint ||= repaint;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // The sticky overview shares the native scrollport but must never grow
        // with the source or add extra scroll range. Padding lives on the source.
        if (needsPaint) {
          track.style.height = `${viewport.clientHeight}px`;
          measure();
        }
        const current = geometry();
        thumb.style.height = `${current.height}px`;
        thumb.style.transform = `translateY(${current.top}px)`;
        track.setAttribute("aria-valuemax", String(Math.round(current.maxScroll)));
        track.setAttribute("aria-valuenow", String(Math.round(Math.max(0, Math.min(current.maxScroll, viewport.scrollTop)))));
        track.setAttribute("aria-disabled", String(current.maxScroll === 0));
        if (needsPaint || paintedOffset !== current.offset) paint(current);
        needsPaint = false;
      });
    };
    const onScroll = () => schedule();
    const onResize = () => schedule(true);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    const refreshSource = () => {
      const next = viewport.querySelector<HTMLElement>("[data-code-minimap-source]");
      if (source !== next) {
        if (source) resizeObserver.unobserve(source);
        source = next;
        if (source) resizeObserver.observe(source);
      }
      track.toggleAttribute("data-active", source !== null);
      schedule(true);
    };
    const contentObserver = new MutationObserver(refreshSource);
    contentObserver.observe(viewport, { childList: true, subtree: true, characterData: true });
    const themeObserver = new MutationObserver(onResize);
    const theme = viewport.closest("[data-viewer-theme]");
    if (theme) themeObserver.observe(theme, { attributes: true, attributeFilter: ["data-viewer-theme"] });

    const pan = (clientY: number, offset: number) => {
      viewport.scrollTop = scrollFromMinimap(clientY - track.getBoundingClientRect().top - offset, geometry());
      schedule();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || drag || !geometry().maxScroll) return;
      event.preventDefault();
      track.focus({ preventScroll: true });
      const current = geometry();
      const y = event.clientY - track.getBoundingClientRect().top;
      if (y < current.top || y > current.top + current.height) {
        viewport.scrollTop = scrollFromMinimapPoint(y, current);
      }
      // Rebase after a click: moving content shifts the highlight away from the
      // clicked row. A stationary captured pointer must not cause another jump.
      drag = { id: event.pointerId, offset: y - geometry().top };
      track.setPointerCapture(event.pointerId);
      track.setAttribute("data-dragging", "");
      schedule();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (drag?.id === event.pointerId) pan(event.clientY, drag.offset);
    };
    const endDrag = (event: PointerEvent) => {
      if (drag?.id !== event.pointerId) return;
      drag = null;
      track.removeAttribute("data-dragging");
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const line = source ? parseFloat(getComputedStyle(source).lineHeight) || 20 : 20;
      const targets: Record<string, number> = {
        ArrowUp: viewport.scrollTop - line,
        ArrowDown: viewport.scrollTop + line,
        PageUp: viewport.scrollTop - viewport.clientHeight,
        PageDown: viewport.scrollTop + viewport.clientHeight,
        Home: 0,
        End: geometry().maxScroll,
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      viewport.scrollTop = targets[event.key];
      schedule();
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !geometry().maxScroll) return;
      event.preventDefault();
      viewport.scrollTop += event.deltaY * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? viewport.clientHeight : 1);
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);
    track.addEventListener("keydown", onKeyDown);
    track.addEventListener("wheel", onWheel, { passive: false });
    refreshSource();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      contentObserver.disconnect();
      themeObserver.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("lostpointercapture", endDrag);
      track.removeEventListener("keydown", onKeyDown);
      track.removeEventListener("wheel", onWheel);
      if (drag && track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
      track.removeAttribute("data-dragging");
    };
  }, [viewport]);

  return (
    <div ref={trackRef} className={styles.minimap} role="scrollbar" tabIndex={0}
      aria-label="Code minimap" aria-controls={panelId} aria-orientation="vertical"
      aria-valuemin={0} aria-valuemax={0} aria-valuenow={0}
      title="Click or drag to navigate code. Arrow keys, Page Up/Down, Home/End also scroll.">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div ref={thumbRef} className={styles.thumb} aria-hidden="true" />
    </div>
  );
};

export default CodeMinimap;
