import { useEffect, useState } from "react";
import { createRepositoryFile } from "./repositoryFiles";

interface GitTreeResponse {
  tree?: Array<{ path: string; type: string }>;
}

const fallbackFiles = [createRepositoryFile("README.md")];

export const useRepositorySource = (owner: string, repository: string, branch: string) => {
  const [files, setFiles] = useState(fallbackFiles);
  const [activePath, setActivePath] = useState(fallbackFiles[0].path);
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const activeFile = files.find((file) => file.path === activePath) ?? files[0];

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load the repository tree");
        return response.json() as Promise<GitTreeResponse>;
      })
      .then((tree) => {
        if (cancelled || !tree.tree) return;
        const discoveredFiles = tree.tree
          .filter((entry) => entry.type === "blob")
          .map((entry) => createRepositoryFile(entry.path))
          .sort((left, right) => left.path.localeCompare(right.path, undefined, { numeric: true, sensitivity: "base" }));
        if (discoveredFiles.length > 0) {
          const preferredFile = discoveredFiles.find((file) => /hash_map_oa\.py$/i.test(file.path)) ?? discoveredFiles[0];
          setFiles(discoveredFiles);
          setActivePath(preferredFile.path);
        }
      })
      .catch(() => {
        // If the tree is unavailable, keep README available as a fallback.
      });

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

  return { files, activeFile, setActivePath, source, isLoading, hasError };
};
