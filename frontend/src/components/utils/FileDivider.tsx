import { useRef } from "react";
import useHexDump from "./useHexDump";
import styles from "./TextDecoration.module.css";

interface FileDividerProps {
  label: string;
  showCursor?: boolean;
  /** Include two hex rows above the label when source text is supplied. */
  hexText?: string;
}

const FileDivider = ({ label, showCursor = true, hexText }: FileDividerProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const headerHex = useHexDump(hexText, preRef, { maxRows: 2 });

  return (
    <div className={styles.fileHeader} aria-hidden="true">
      {hexText !== undefined && <pre ref={preRef} className={styles.headerHex}>{headerHex}</pre>}
      <div className={styles.divider}>
        {label}
        {showCursor && <span className={styles.cursor}>|</span>}
      </div>
    </div>
  );
};

export default FileDivider;
