import { useRef, type ReactNode } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import useHexDump from "./useHexDump";
import styles from "./TextDecoration.module.css";

interface FileDividerProps {
  label: string;
  showCursor?: boolean;
  /** Include one hex row on mobile and two on desktop. */
  hexText?: string;
  hexRows?: number;
  action?: ReactNode;
}

const FileDivider = ({ label, showCursor = true, hexText, hexRows, action }: FileDividerProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const windowWidth = useWindowWidth();
  const headerHex = useHexDump(hexText, preRef, { maxRows: hexRows ?? (windowWidth <= 600 ? 1 : 2) });

  return (
    <div className={styles.fileHeader}>
      {hexText !== undefined && <pre ref={preRef} className={styles.headerHex} aria-hidden="true">{headerHex}</pre>}
      <div className={styles.headerRow}>
      <div className={styles.divider} aria-hidden="true">
        {label}
        {showCursor && <span className={styles.cursor}>|</span>}
      </div>
      {action}
      </div>
    </div>
  );
};

export default FileDivider;
