import styles from "./Buttons.module.css";
import ButtonTooltip from "./button-tooltip/ButtonTooltip";

interface ButtonLinkProps {
  URL: string;
  variant?: "red" | "blue";
  buttonText: string;
}

const ButtonLink = ({ URL, variant = "blue", buttonText }: ButtonLinkProps) => (
  <ButtonTooltip
    className={`${styles.button} ${styles[variant]}`}
    url={URL}
  >
    {buttonText}
  </ButtonTooltip>
);

export default ButtonLink;
