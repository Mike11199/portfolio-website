import { useRef } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import useHexDump from "./useHexDump";
import styles from "./TextDecoration.module.css";

interface FileDividerProps {
  label: string;
  showCursor?: boolean;
  /** Include one hex row on mobile and two on desktop. */
  hexText?: string;
}

const FileDivider = ({ label, showCursor = true, hexText }: FileDividerProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const windowWidth = useWindowWidth();
  const headerHex = useHexDump(hexText, preRef, { maxRows: windowWidth <= 600 ? 1 : 2 });

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
