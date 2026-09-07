import { useEffect, useMemo, useState } from "react";
import { buildFileTree } from "./repositoryFiles";
import type { RepositoryFile, TreeNode } from "./repositoryFiles";
import RepositoryIcon from "./RepositoryIcon";
import styles from "./GitHubCodeViewer.module.css";

interface FileTreeNodeProps {
  node: TreeNode;
  depth: number;
  activePath: string;
  expandedDirectories: Set<string>;
  onToggleDirectory: (path: string) => void;
  onSelectFile: (path: string) => void;
}

const FileTreeNode = ({ node, depth, activePath, expandedDirectories, onToggleDirectory, onSelectFile }: FileTreeNodeProps) => {
  const paddingLeft = `${0.7 + depth * 0.85}rem`;

  if (node.type === "directory") {
    const isExpanded = expandedDirectories.has(node.path);
    return (
      <div>
        <button
          type="button"
          className={styles.folder}
          style={{ paddingLeft }}
          aria-expanded={isExpanded}
          onClick={() => onToggleDirectory(node.path)}
        >
          <span className={styles.chevron} aria-hidden="true">{isExpanded ? "⌄" : "›"}</span>
          <RepositoryIcon path={node.path} folder expanded={isExpanded} />
          <span className={styles.treeLabel}>{node.name}</span>
        </button>
        {isExpanded && (
          <div role="group">
            {node.children.map((child) => (
              <FileTreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                activePath={activePath}
                expandedDirectories={expandedDirectories}
                onToggleDirectory={onToggleDirectory}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.file} ${node.path === activePath ? styles.activeFile : ""}`}
      style={{ paddingLeft }}
      aria-selected={node.path === activePath}
      role="treeitem"
      title={node.path}
      onClick={() => onSelectFile(node.path)}
    >
      <RepositoryIcon path={node.path} />
      <span className={styles.treeLabel}>{node.name}</span>
    </button>
  );
};

interface RepositoryExplorerProps {
  repository: string;
  files: RepositoryFile[];
  activePath: string;
  onSelectFile: (path: string) => void;
}

const RepositoryExplorer = ({ repository, files, activePath, onSelectFile }: RepositoryExplorerProps) => {
  const fileTree = useMemo(() => buildFileTree(files), [files]);
  const [expandedDirectories, setExpandedDirectories] = useState<Set<string>>(new Set());

  useEffect(() => {
    setExpandedDirectories(new Set());
  }, [files]);

  const toggleDirectory = (path: string) => {
    setExpandedDirectories((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  };

  return (
    <aside className={styles.explorer} aria-label="Repository files">
      <div className={styles.explorerTitle}>EXPLORER</div>
      <div className={styles.rootLabel}><span aria-hidden="true">▾</span> {repository}</div>
      <div className={styles.tree} role="tree" aria-label="Source files">
        {fileTree.children.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            depth={0}
            activePath={activePath}
            expandedDirectories={expandedDirectories}
            onToggleDirectory={toggleDirectory}
            onSelectFile={onSelectFile}
          />
        ))}
      </div>
    </aside>
  );
};

export default RepositoryExplorer;
