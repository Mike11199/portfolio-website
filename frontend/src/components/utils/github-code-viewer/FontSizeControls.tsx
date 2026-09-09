import styles from "./GitHubCodeViewer.module.css";

interface FontSizeButtonProps {
  direction: "decrease" | "increase";
  disabled: boolean;
  onClick: () => void;
}

const FontSizeButton = ({ direction, disabled, onClick }: FontSizeButtonProps) => {
  const label = direction === "decrease" ? "Decrease code font size" : "Increase code font size";

  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="10" r="6" />
        <path d={direction === "decrease" ? "m15 15 6 6M7 10h6" : "m15 15 6 6M7 10h6M10 7v6"} />
      </svg>
    </button>
  );
};

interface FontSizeControlsProps {
  fontSize: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const FontSizeControls = ({ fontSize, onDecrease, onIncrease }: FontSizeControlsProps) => (
  <div className={styles.fontControls} role="group" aria-label="Code font size">
    <FontSizeButton direction="decrease" disabled={fontSize <= 6} onClick={onDecrease} />
    <FontSizeButton direction="increase" disabled={fontSize >= 24} onClick={onIncrease} />
  </div>
);

export default FontSizeControls;
