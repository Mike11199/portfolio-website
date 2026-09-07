const languagesByExtension = {
  md: "markdown",
  py: "python",
  sql: "sql",
  yml: "yaml",
  yaml: "yaml",
  json: "json",
  css: "css",
  html: "html",
  htm: "html",
  xml: "xml",
  svg: "xml",
  tsx: "typescript",
  ts: "typescript",
  jsx: "javascript",
  js: "javascript",
  kt: "kotlin",
  kts: "kotlin",
  java: "java",
  cs: "csharp",
  cpp: "cpp",
  cc: "cpp",
  c: "cpp",
  h: "cpp",
  hpp: "cpp",
  rs: "rust",
  go: "go",
  rb: "ruby",
  sh: "bash",
  bash: "bash",
  bat: "bash",
  cmd: "bash",
  ps1: "powershell",
} as const;

type FileLanguage = typeof languagesByExtension[keyof typeof languagesByExtension] | "docker" | "text";

const fileLanguages = new Map<string, FileLanguage>(Object.entries(languagesByExtension));

export interface RepositoryFile {
  path: string;
  language: FileLanguage;
  isBinary: boolean;
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

export type TreeNode = DirectoryNode | FileNode;

const binaryFilePattern = /\.(7z|avif|bmp|class|dll|docx?|eot|exe|gif|ico|jpe?g|mov|mp3|mp4|otf|pdf|png|psd|so|tar|ttf|wav|webm|webp|woff2?|xlsx?|zip)$/i;

const getLanguage = (path: string): FileLanguage => {
  const lowerPath = path.toLowerCase();
  const fileName = lowerPath.split("/").pop() ?? lowerPath;

  if (fileName === "dockerfile" || fileName.endsWith(".dockerfile")) return "docker";
  if (!fileName.includes(".")) return "text";
  const extension = fileName.slice(fileName.lastIndexOf(".") + 1);
  return fileLanguages.get(extension) ?? "text";
};

export const createRepositoryFile = (path: string): RepositoryFile => ({
  path,
  language: getLanguage(path),
  isBinary: binaryFilePattern.test(path),
});

const sortTreeNodes = (left: TreeNode, right: TreeNode) => {
  if (left.type !== right.type) return left.type === "directory" ? -1 : 1;
  return left.name.localeCompare(right.name, undefined, { numeric: true, sensitivity: "base" });
};

export const buildFileTree = (files: RepositoryFile[]): DirectoryNode => {
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
