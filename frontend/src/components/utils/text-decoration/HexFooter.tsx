import { useRef } from "react";
import FileDivider from "./FileDivider";
import useHexDump from "./useHexDump";
import styles from "./TextDecoration.module.css";

interface HexFooterProps {
  text: string;
  /** Use only spare space; never force a fixed-height biography to grow. */
  fillOnly?: boolean;
}

const HexFooter = ({ text, fillOnly = false }: HexFooterProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const hexDump = useHexDump(text, preRef, { frameRef });

  return (
    <div ref={frameRef} className={`${styles.hexFooter}${fillOnly ? ` ${styles.fillOnly}` : ""}`} aria-hidden="true">
      <div className={styles.hexContent} style={{ visibility: hexDump ? "visible" : "hidden" }}>
        <FileDivider label="end of file" />
        <pre ref={preRef}>{hexDump}</pre>
      </div>
    </div>
  );
};

export default HexFooter;
