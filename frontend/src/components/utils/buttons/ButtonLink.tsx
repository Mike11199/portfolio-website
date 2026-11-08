import styles from "./Buttons.module.css";
import ButtonTooltip from "./button-tooltip/ButtonTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.externalIcon} aria-hidden="true" />
  </ButtonTooltip>
);

export default ButtonLink;
