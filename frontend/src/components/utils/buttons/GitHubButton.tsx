import GitHubLogo from "../../../images/githubButtonLogo.png";
import styles from "./Buttons.module.css";
import ButtonTooltip from "./button-tooltip/ButtonTooltip";

interface GitHubButtonProps {
  URL: string;
  className?: string;
}

const GitHubButton = ({ URL, className = "" }: GitHubButtonProps) => (
  <ButtonTooltip
    className={`${styles.button} ${styles.github} ${className}`}
    url={URL}
  >
    <img className={styles.logo} src={GitHubLogo} alt="" />
    GitHub Repo
  </ButtonTooltip>
);

export default GitHubButton;
