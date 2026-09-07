import GitHubLogo from "../../../images/githubButtonLogo.png";
import styles from "./Buttons.module.css";

interface GitHubButtonProps {
  URL: string;
  className?: string;
}

const GitHubButton = ({ URL, className = "" }: GitHubButtonProps) => (
  <a
    className={`${styles.button} ${styles.github} ${className}`}
    href={URL}
    target="_blank"
    rel="noopener noreferrer"
    title={URL}
  >
    <img className={styles.logo} src={GitHubLogo} alt="" />
    GitHub Repo
  </a>
);

export default GitHubButton;
