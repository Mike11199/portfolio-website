import { useRef, type CSSProperties } from "react";
import FileDivider from "./FileDivider";
import useHexDump from "./useHexDump";
import styles from "./TextDecoration.module.css";

interface HexFooterProps {
  text: string;
  /** Use only spare space; never force a fixed-height biography to grow. */
  fillOnly?: boolean;
  rows?: number;
}

const HexFooter = ({ text, fillOnly = false, rows = 2 }: HexFooterProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const hexDump = useHexDump(text, preRef, { maxRows: rows });

  return (
    <div className={`${styles.hexFooter}${fillOnly ? ` ${styles.fillOnly}` : ""}`} style={{ "--hex-min-rows": rows } as CSSProperties} aria-hidden="true">
      <div className={styles.hexContent} style={{ visibility: hexDump ? "inherit" : "hidden" }}>
        <FileDivider label="end of file" />
        <pre ref={preRef}>{hexDump}</pre>
      </div>
    </div>
  );
};

export default HexFooter;
