import { useLayoutEffect, useState, type RefObject } from "react";

interface HexDumpOptions {
  /** Limit header rows; omit when the enclosing frame determines the height. */
  maxRows?: number;
  frameRef?: RefObject<HTMLElement>;
}

/** Render complete UTF-8 byte pairs and rows that fit the current font and panel. */
export default function useHexDump(
  text: string | undefined,
  preRef: RefObject<HTMLPreElement>,
  { maxRows = Infinity, frameRef }: HexDumpOptions = {},
) {
  const [hexDump, setHexDump] = useState("");

  useLayoutEffect(() => {
    const pre = preRef.current;
    if (!pre || text === undefined) return;
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return;
    const bytes = new TextEncoder().encode(text);
    const frame = frameRef?.current;

    const measure = () => {
      const style = window.getComputedStyle(pre);
      context.font = style.font;
      // Budget for the longest address and a pixel of rounding at the right edge.
      const address = `0x${Math.max(0, bytes.length - 1).toString(16).padStart(4, "0")}  `;
      let columns = 16;
      const fits = (count: number) =>
        context.measureText(address + Array(count).fill("ff").join(" ")).width <= pre.clientWidth - 1;
      while (columns > 0 && !fits(columns)) {
        columns--;
      }

      const lineHeight = parseFloat(style.lineHeight);
      const availableHeight = frame ? frame.getBoundingClientRect().bottom - pre.getBoundingClientRect().top : Infinity;
      const rowLimit = frame
        ? Math.min(maxRows, lineHeight > 0 ? Math.max(0, Math.floor(availableHeight / lineHeight)) : 0)
        : maxRows;
      const rows: string[] = [];
      // Short descriptions still supply the four decorative rows used on mobile.
      const length = Math.max(bytes.length, columns * 4);
      for (let offset = 0; columns > 0 && offset < length && rows.length < rowLimit; offset += columns) {
        const hex = Array.from(bytes.slice(offset, offset + columns),
          byte => byte.toString(16).padStart(2, "0")).join(" ");
        rows.push(`0x${offset.toString(16).padStart(4, "0")}  ${hex}`);
      }
      setHexDump(rows.join("\n"));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(pre);
    if (frame) observer.observe(frame);
    if (frame && pre.previousElementSibling) observer.observe(pre.previousElementSibling);
    document.fonts?.addEventListener("loadingdone", measure);
    return () => {
      observer.disconnect();
      document.fonts?.removeEventListener("loadingdone", measure);
    };
  }, [text, preRef, maxRows, frameRef]);

  return hexDump;
}
