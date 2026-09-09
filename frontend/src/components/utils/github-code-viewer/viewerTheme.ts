export const THEMES = [
  { id: "current-dark", label: "Default Dark" },
  { id: "darcula", label: "Darcula" },
  { id: "monokai", label: "Monokai" },
  { id: "tokyo-night", label: "Tokyo Night" },
] as const;
export type ViewerTheme = (typeof THEMES)[number]["id"];
export const THEME_STORAGE_KEY = "github-code-viewer-theme";
const isViewerTheme = (value: string | null): value is ViewerTheme => THEMES.some(({ id }) => id === value);

export const readTheme = (): ViewerTheme => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    // Preserve selections saved before correcting Dracula to JetBrains Darcula.
    if (saved === "dracula") return "darcula";
    return isViewerTheme(saved) ? saved : "current-dark";
  } catch {
    return "current-dark";
  }
};
