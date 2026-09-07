import CodeViewButton from "../buttons/CodeViewButton";
import GitHubButton from "../buttons/GitHubButton";
import styles from "./RepositoryActions.module.css";

interface RepositoryActionsProps {
  repositoryUrl: string;
  showCode: boolean;
  onToggleCode: () => void;
}

const RepositoryActions = ({ repositoryUrl, showCode, onToggleCode }: RepositoryActionsProps) => (
  <div className={styles.actions} role="group" aria-label="Repository actions">
    <GitHubButton URL={repositoryUrl} className={styles.repositoryLink} />
    <CodeViewButton showCode={showCode} onToggleCode={onToggleCode} />
  </div>
);

export default RepositoryActions;
