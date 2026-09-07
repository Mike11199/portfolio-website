// Bounded repository viewer for project cards. It fetches a GitHub tree, builds
// a collapsible file explorer, and renders the selected text file inside the
// card without mounting a full VS Code workbench or taking over the viewport.
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import HighlightedCode from "../../code-demo/HighlightedCode";
import styles from "./GitHubCodeViewer.module.css";

interface GitHubCodeViewerProps {
  repositoryUrl: string;
  owner: string;
  repository: string;
  branch?: string;
}

type FileLanguage =
  | "bash"
  | "cpp"
  | "csharp"
  | "css"
  | "docker"
  | "go"
  | "html"
  | "java"
  | "javascript"
  | "json"
  | "kotlin"
  | "markdown"
  | "python"
  | "ruby"
  | "rust"
  | "sql"
  | "text"
  | "typescript"
  | "xml"
  | "yaml";

interface RepositoryFile {
  path: string;
  language: FileLanguage;
  isBinary: boolean;
}

interface GitTreeResponse {
  tree?: Array<{ path: string; type: string }>;
}

interface DirectoryNode {
  type: "directory";
  name: string;
  path: string;
  children: TreeNode[];
}

interface FileNode extends RepositoryFile {
  type: "file";
  name: string;
}

type TreeNode = DirectoryNode | FileNode;

const fallbackFiles: RepositoryFile[] = [
  { path: "README.md", language: "markdown", isBinary: false },
];

const binaryFilePattern = /\.(7z|avif|bmp|class|dll|docx?|eot|exe|gif|ico|jpe?g|mov|mp3|mp4|otf|pdf|png|psd|so|tar|ttf|wav|webm|webp|woff2?|xlsx?|zip)$/i;
const MIN_EXPLORER_WIDTH = 144;
const MAX_EXPLORER_WIDTH = 320;

const getLanguage = (path: string): FileLanguage => {
  const lowerPath = path.toLowerCase();
  const fileName = lowerPath.split("/").pop() ?? lowerPath;

  if (fileName === "dockerfile" || fileName.endsWith(".dockerfile")) return "docker";
  if (fileName.endsWith(".md")) return "markdown";
  if (fileName.endsWith(".py")) return "python";
  if (fileName.endsWith(".sql")) return "sql";
  if (fileName.endsWith(".yml") || fileName.endsWith(".yaml")) return "yaml";
  if (fileName.endsWith(".json")) return "json";
  if (fileName.endsWith(".css")) return "css";
  if (fileName.endsWith(".html") || fileName.endsWith(".htm")) return "html";
  if (fileName.endsWith(".xml") || fileName.endsWith(".svg")) return "xml";
  if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) return "typescript";
  if (fileName.endsWith(".jsx") || fileName.endsWith(".js")) return "javascript";
  if (fileName.endsWith(".kt") || fileName.endsWith(".kts")) return "kotlin";
  if (fileName.endsWith(".java")) return "java";
  if (fileName.endsWith(".cs")) return "csharp";
  if (fileName.endsWith(".cpp") || fileName.endsWith(".cc") || fileName.endsWith(".c") || fileName.endsWith(".h") || fileName.endsWith(".hpp")) return "cpp";
  if (fileName.endsWith(".rs")) return "rust";
  if (fileName.endsWith(".go")) return "go";
  if (fileName.endsWith(".rb")) return "ruby";
  if (fileName.endsWith(".sh") || fileName.endsWith(".bash") || fileName.endsWith(".bat") || fileName.endsWith(".cmd") || fileName.endsWith(".ps1")) return "bash";
  return "text";
};

const getFileLabel = (path: string) => path.split("/").pop() ?? path;

const getInitialExplorerWidth = () => {
  return typeof window !== "undefined" && window.innerWidth <= 600 ? 160 : 224;
};

const getFileIcon = (file: RepositoryFile) => {
  const iconByLanguage: Partial<Record<FileLanguage, string>> = {
    python: "py",
    javascript: "JS",
    typescript: "TS",
    java: "{}",
    kotlin: "K",
    csharp: "C#",
    cpp: "C+",
    rust: "R",
    go: "Go",
    json: "{}",
    markdown: "M",
    css: "#",
    html: "<>",
    xml: "<> ",
    yaml: "Y",
    sql: "DB",
    docker: "◇",
    bash: "$",
  };
  return iconByLanguage[file.language] ?? file.path.split(".").pop()?.slice(0, 3).toUpperCase() ?? "•";
};

const sortTreeNodes = (left: TreeNode, right: TreeNode) => {
  if (left.type !== right.type) return left.type === "directory" ? -1 : 1;
  return left.name.localeCompare(right.name, undefined, { numeric: true, sensitivity: "base" });
};

const buildFileTree = (files: RepositoryFile[]): DirectoryNode => {
  const root: DirectoryNode = { type: "directory", name: "", path: "", children: [] };

  files.forEach((file) => {
    const parts = file.path.split("/").filter(Boolean);
    let directory = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      if (isFile) {
        directory.children.push({ type: "file", name: part, ...file });
        return;
      }

      const path = parts.slice(0, index + 1).join("/");
      let child = directory.children.find((node): node is DirectoryNode => node.type === "directory" && node.path === path);
      if (!child) {
        child = { type: "directory", name: part, path, children: [] };
        directory.children.push(child);
      }
      directory = child;
    });
  });

  const sortChildren = (directory: DirectoryNode) => {
    directory.children.sort(sortTreeNodes);
    directory.children.forEach((node) => {
      if (node.type === "directory") sortChildren(node);
    });
  };
  sortChildren(root);
  return root;
};

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
          <span className={styles.folderIcon} aria-hidden="true">{isExpanded ? "▾" : "▸"}</span>
          <span className={styles.treeLabel}>{node.name}</span>
        </button>
        {isExpanded && (
          <div role="group">
            {node.children.map((child) => (
              <FileTreeNode
                key={child.type === "directory" ? child.path : child.path}
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
      <span className={`${styles.fileIcon} ${styles[`language${node.language}`]}`} aria-hidden="true">{getFileIcon(node)}</span>
      <span className={styles.treeLabel}>{node.name}</span>
    </button>
  );
};

const GitHubCodeViewer = ({ repositoryUrl, owner, repository, branch = "main" }: GitHubCodeViewerProps) => {
  const browserEditorUrl = `https://github.dev/${owner}/${repository}`;
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<RepositoryFile[]>(fallbackFiles);
  const [activePath, setActivePath] = useState(fallbackFiles[0].path);
  const [expandedDirectories, setExpandedDirectories] = useState<Set<string>>(new Set());
  const [explorerWidth, setExplorerWidth] = useState(getInitialExplorerWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const fileTree = useMemo(() => buildFileTree(files), [files]);
  const activeFile = files.find((file) => file.path === activePath) ?? files[0];

  useEffect(() => {
    if (!isResizing) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = workspaceRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const nextWidth = Math.min(MAX_EXPLORER_WIDTH, Math.max(MIN_EXPLORER_WIDTH, event.clientX - bounds.left));
      setExplorerWidth(nextWidth);
    };
    const stopResizing = () => setIsResizing(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResizing);
    window.addEventListener("pointercancel", stopResizing);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResizing);
      window.removeEventListener("pointercancel", stopResizing);
    };
  }, [isResizing]);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the repository tree");
        return response.json() as Promise<GitTreeResponse>;
      })
      .then((tree) => {
        if (cancelled || !tree.tree) return;
        // Keep every tracked blob so the explorer mirrors GitHub's real tree.
        // Only the selected file is fetched, so binary assets do not make the
        // initial card slow or push the explorer outside its scroll area.
        const discoveredFiles = tree.tree
          .filter((entry) => entry.type === "blob")
          .map((entry) => ({ path: entry.path, language: getLanguage(entry.path), isBinary: binaryFilePattern.test(entry.path) }))
          .sort((left, right) => left.path.localeCompare(right.path, undefined, { numeric: true, sensitivity: "base" }));
        if (discoveredFiles.length > 0) {
          const preferredFile = discoveredFiles.find((file) => /hash_map_oa\.py$/i.test(file.path)) ?? discoveredFiles[0];
          setFiles(discoveredFiles);
          setActivePath(preferredFile.path);
          setExpandedDirectories(new Set());
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [branch, owner, repository]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setHasError(false);
    setSource("");

    if (activeFile.isBinary) {
      setIsLoading(false);
      return () => {
        cancelled = true;
      };
    }

    fetch(`https://raw.githubusercontent.com/${owner}/${repository}/${branch}/${activeFile.path}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${activeFile.path}`);
        return response.text();
      })
      .then((text) => {
        if (!cancelled) {
          setSource(text);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeFile.isBinary, activeFile.path, branch, owner, repository]);

  const toggleDirectory = (path: string) => {
    setExpandedDirectories((current) => {
      const next = new Set(current);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  };

  const startExplorerResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsResizing(true);
  };

  const handleExplorerResizeKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === "ArrowRight" ? 16 : event.key === "ArrowLeft" ? -16 : 0;
    if (delta === 0) return;
    event.preventDefault();
    setExplorerWidth((current) => Math.min(MAX_EXPLORER_WIDTH, Math.max(MIN_EXPLORER_WIDTH, current + delta)));
  };

  return (
    <section
      className={`${styles.viewer} ${isResizing ? styles.isResizing : ""} github-code-viewer`}
      style={{ "--explorer-width": `${explorerWidth}px` } as CSSProperties}
      aria-label={`${repository} source code`}
    >
      <header className={styles.titlebar}>
        <span className={styles.windowTitle}>{repository}</span>
      </header>

      <div ref={workspaceRef} className={styles.workspace}>
        <aside className={styles.explorer} aria-label="Repository files">
          <div className={styles.explorerTitle}>EXPLORER</div>
          <div className={styles.rootLabel}><span aria-hidden="true">▾</span> {repository}</div>
          <div className={styles.tree} role="tree" aria-label="Source files">
            {fileTree.children.map((node) => (
              <FileTreeNode
                key={node.type === "directory" ? node.path : node.path}
                node={node}
                depth={0}
                activePath={activePath}
                expandedDirectories={expandedDirectories}
                onToggleDirectory={toggleDirectory}
                onSelectFile={setActivePath}
              />
            ))}
          </div>
        </aside>

        <div
          className={styles.explorerDivider}
          role="separator"
          tabIndex={0}
          aria-label="Resize file explorer"
          aria-orientation="vertical"
          aria-valuemin={MIN_EXPLORER_WIDTH}
          aria-valuemax={MAX_EXPLORER_WIDTH}
          aria-valuenow={Math.round(explorerWidth)}
          onPointerDown={startExplorerResize}
          onKeyDown={handleExplorerResizeKeyDown}
        />

        <main className={styles.editor}>
          <div className={styles.tab}>
            <span className={`${styles.fileIcon} ${styles[`language${activeFile.language}`]}`}>{getFileIcon(activeFile)}</span>
            <span className={styles.tabName}>{getFileLabel(activeFile.path)}</span>
          </div>
          <div className={styles.breadcrumb}>
            {repository} <span aria-hidden="true">›</span> {activeFile.path}
          </div>
          <div className={styles.codeViewport}>
            {isLoading && <div className={styles.message}>Loading source from GitHub…</div>}
            {hasError && (
              <div className={styles.message} role="alert">
                Could not load this file. <a href={`${repositoryUrl}/blob/${branch}/${activeFile.path}`} target="_blank" rel="noreferrer">Open it on GitHub.</a>
              </div>
            )}
            {!isLoading && !hasError && activeFile.isBinary && (
              <div className={styles.message}>
                This is a binary repository asset. <a href={`${repositoryUrl}/blob/${branch}/${activeFile.path}`} target="_blank" rel="noreferrer">Open it on GitHub.</a>
              </div>
            )}
            {!isLoading && !hasError && !activeFile.isBinary && (
              <div className={styles.codeLines}>
                {source.split("\n").map((line, index) => (
                  <div className={styles.codeLine} key={`${activeFile.path}-${index}`}>
                    <span className={styles.lineNumber} aria-hidden="true">{index + 1}</span>
                    <HighlightedCode code={line || " "} language={activeFile.language} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className={styles.statusbar}>
        <span>{activeFile.language}</span>
        <span>{isLoading ? "Loading" : hasError ? "Offline" : "GitHub source"}</span>
        <span className={styles.statusSpacer} />
        <a href={browserEditorUrl} target="_blank" rel="noreferrer">VS Code Web ↗</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </section>
  );
};

export default GitHubCodeViewer;
