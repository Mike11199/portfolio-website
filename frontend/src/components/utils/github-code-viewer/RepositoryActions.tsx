import GitHubButton from "../buttons/GitHubButton";
import styles from "./RepositoryActions.module.css";

interface RepositoryActionsProps {
  repositoryUrl: string;
}

const RepositoryActions = ({ repositoryUrl }: RepositoryActionsProps) => (
  <div className={styles.actions} role="group" aria-label="Repository actions">
    <GitHubButton URL={repositoryUrl} className={styles.repositoryLink} />
  </div>
);

export default RepositoryActions;
