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

export const useRepositoryTabs = () => {
  const [tabs, setTabs] = useState<RepositoryTabState>({ paths: [], activePath: null });
  const hasInteracted = useRef(false);

  const selectPath = (path: string) => {
    hasInteracted.current = true;
    setTabs((current) => openTab(current, path));
  };

  const closePath = (path: string) => {
    hasInteracted.current = true;
    setTabs((current) => closeTab(current, path));
  };

  const closeOthers = (path: string) => {
    hasInteracted.current = true;
    setTabs({ paths: [path], activePath: path });
  };

  const closeAll = () => {
    hasInteracted.current = true;
    setTabs({ paths: [], activePath: null });
  };

  const initializeTabs = useCallback((activePath: string, paths: string[]) => {
    if (!hasInteracted.current) setTabs({ paths: [...new Set([activePath, ...paths])], activePath });
  }, []);

  return { ...tabs, selectPath, closePath, closeAll, closeOthers, initializeTabs };
};
