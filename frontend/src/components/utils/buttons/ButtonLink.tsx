import styles from "./Buttons.module.css";

interface ButtonLinkProps {
  URL: string;
  variant?: "red" | "blue";
  buttonText: string;
}

const ButtonLink = ({ URL, variant = "blue", buttonText }: ButtonLinkProps) => (
  <a
    className={`${styles.button} ${styles[variant]}`}
    href={URL}
    target="_blank"
    rel="noopener noreferrer"
    title={URL}
  >
    {buttonText}
  </a>
);

export default ButtonLink;
