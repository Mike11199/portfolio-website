import styles from "./CodeViewButton.module.css";

interface CodeViewButtonProps {
  showCode: boolean;
  onToggleCode: () => void;
}

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m9 18-6-6 6-6" />
    <path d="m15 6 6 6-6 6" />
  </svg>
);

const ImageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

const CodeViewButton = ({ showCode, onToggleCode }: CodeViewButtonProps) => {
  const actionLabel = showCode ? "View Images" : "View Code";

  return (
    <button
      className={styles.codeButton}
      type="button"
      aria-pressed={showCode}
      aria-label={actionLabel}
      title={actionLabel}
      onClick={onToggleCode}
    >
      {showCode ? <ImageIcon /> : <CodeIcon />}
    </button>
  );
};

export default CodeViewButton;
