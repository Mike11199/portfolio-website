import { useRef, type CSSProperties } from "react";
import FileDivider from "./FileDivider";
import useHexDump from "./useHexDump";
import styles from "./TextDecoration.module.css";

interface HexFooterProps {
  text: string;
  /** Use only spare space; never force a fixed-height biography to grow. */
  fillOnly?: boolean;
  rows?: number;
  expand?: boolean;
}

const HexFooter = ({ text, fillOnly = false, rows = 2, expand = false }: HexFooterProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hexDump = useHexDump(text, preRef, { maxRows: expand ? Infinity : rows, frameRef: expand ? frameRef : undefined });

  return (
    <div ref={frameRef} className={`${styles.hexFooter}${fillOnly ? ` ${styles.fillOnly}` : ""}${expand ? ` ${styles.expand}` : ""}`} style={{ "--hex-min-rows": rows } as CSSProperties} aria-hidden="true">
      <div className={styles.hexContent} style={{ visibility: hexDump ? "inherit" : "hidden" }}>
        <FileDivider label="end of file" />
        <pre ref={preRef}>{hexDump}</pre>
      </div>
    </div>
  );
};

export default HexFooter;
