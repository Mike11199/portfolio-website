import { useCallback, useRef, useState } from "react";

export interface RepositoryTabState {
  paths: string[];
  activePath: string | null;
}

export const openTab = (state: RepositoryTabState, path: string): RepositoryTabState => ({
  paths: state.paths.includes(path) ? state.paths : [...state.paths, path],
  activePath: path,
});

export const closeTab = (state: RepositoryTabState, path: string): RepositoryTabState => {
  const index = state.paths.indexOf(path);
  if (index === -1) return state;
  const paths = state.paths.filter((entry) => entry !== path);
  return {
    paths,
    activePath: state.activePath === path
      ? paths[Math.min(index, paths.length - 1)] ?? null
      : state.activePath,
  };
};

export const useRepositoryTabs = (initialPath: string) => {
  const [tabs, setTabs] = useState<RepositoryTabState>({ paths: [initialPath], activePath: initialPath });
  const hasInteracted = useRef(false);

  const selectPath = (path: string) => {
    hasInteracted.current = true;
    setTabs((current) => openTab(current, path));
  };

  const closePath = (path: string) => {
    hasInteracted.current = true;
    setTabs((current) => closeTab(current, path));
  };

  const selectInitialPath = useCallback((path: string) => {
    if (!hasInteracted.current) setTabs({ paths: [path], activePath: path });
  }, []);

  return { ...tabs, selectPath, closePath, selectInitialPath };
};
