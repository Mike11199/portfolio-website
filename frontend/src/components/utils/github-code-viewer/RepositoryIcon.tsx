import { getIconForFile, getIconForFolder, getIconForOpenFolder } from "vscode-icons-js";
import styles from "./GitHubCodeViewer.module.css";

const iconBaseUrl = "https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@v11.6.0/icons/";

interface RepositoryIconProps {
  path: string;
  folder?: boolean;
  expanded?: boolean;
}

const RepositoryIcon = ({ path, folder = false, expanded = false }: RepositoryIconProps) => {
  const name = path.split("/").pop() ?? path;
  const icon = folder
    ? (expanded ? getIconForOpenFolder(name) : getIconForFolder(name))
    : (getIconForFile(name) ?? "default_file.svg");

  return <img className={styles.fileIcon} src={iconBaseUrl + icon} alt="" width={18} height={18} draggable={false} />;
};

export default RepositoryIcon;
