import { useEffect, useRef, useState } from "react";
import { createRepositoryFile, type RepositoryFile } from "./repositoryFiles";
import { useRepositoryTabs } from "../tabs/useRepositoryTabs";

interface GitTreeResponse {
  tree?: Array<{ path: string; type: string }>;
}

const fallbackFiles = [createRepositoryFile("README.md")];

interface FileResult {
  path: string;
  source: string;
  hasError: boolean;
}

interface RepositorySourceOptions {
  owner: string;
  repository: string;
  branch: string;
  defaultFile?: string;
  defaultOpenFiles?: readonly string[];
}

export const useRepositorySource = ({ owner, repository, branch, defaultFile, defaultOpenFiles }: RepositorySourceOptions) => {
  const initialOpenFiles = useRef(defaultOpenFiles ?? []);
  const [files, setFiles] = useState<RepositoryFile[]>([]);
  const [isTreeLoading, setIsTreeLoading] = useState(true);
  const tabs = useRepositoryTabs();
  const { activePath, initializeTabs } = tabs;
  const [fileResult, setFileResult] = useState<FileResult | null>(null);
  const activeFile = files.find((file) => file.path === activePath) ?? null;

  useEffect(() => {
    let cancelled = false;

    const openInitialFiles = (availableFiles: RepositoryFile[]) => {
      if (cancelled) return;
      const preferredFile = availableFiles.find((file) => file.path === defaultFile) ?? availableFiles[0];
      const availablePaths = new Set(availableFiles.map((file) => file.path));
      setFiles(availableFiles);
      initializeTabs(preferredFile.path, initialOpenFiles.current.filter((path) => availablePaths.has(path)));
      setIsTreeLoading(false);
    };

    fetch(`https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the repository tree");
        return response.json() as Promise<GitTreeResponse>;
      })
      .then((tree) => {
        if (cancelled) return;
        const discoveredFiles = (tree.tree ?? [])
          .filter((entry) => entry.type === "blob")
          .map((entry) => createRepositoryFile(entry.path))
          .sort((left, right) => left.path.localeCompare(right.path, undefined, { numeric: true, sensitivity: "base" }));
        openInitialFiles(discoveredFiles.length > 0 ? discoveredFiles : fallbackFiles);
      })
      .catch(() => {
        openInitialFiles(fallbackFiles);
      });

    return () => {
      cancelled = true;
    };
  }, [branch, owner, repository, defaultFile, initializeTabs]);

  useEffect(() => {
    let cancelled = false;
    if (!activeFile || activeFile.isBinary) return;

    fetch(`https://raw.githubusercontent.com/${owner}/${repository}/${branch}/${activeFile.path}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${activeFile.path}`);
        return response.text();
      })
      .then((text) => {
        if (!cancelled) {
          setFileResult({ path: activeFile.path, source: text, hasError: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFileResult({ path: activeFile.path, source: "", hasError: true });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeFile, branch, owner, repository]);

  const currentResult = fileResult?.path === activePath ? fileResult : null;
  const isLoading = isTreeLoading || (!!activeFile && !activeFile.isBinary && !currentResult);
  return {
    files, activeFile, tabs, isLoading,
    source: currentResult?.source ?? "",
    hasError: currentResult?.hasError ?? false,
  };
};
