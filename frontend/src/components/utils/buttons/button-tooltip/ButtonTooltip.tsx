import { useId, useState, type ReactNode } from "react";
import styles from "./ButtonTooltip.module.css";

interface Props {
  url: string;
  className: string;
  children: ReactNode;
}

/** A link button with a destination tooltip on hover or keyboard focus. */
const ButtonTooltip = ({ url, className, children }: Props) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={url}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={open ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {children}
      </a>
      {open && <span id={id} role="tooltip" className={styles.tooltip}>{url}</span>}
    </div>
  );
};

export default ButtonTooltip;
