export const THEMES = [
  { id: "tokyo-night", label: "Tokyo Night" },
  { id: "current-dark", label: "Default Dark" },
  { id: "darcula", label: "Darcula" },
  { id: "monokai", label: "Monokai" },
] as const;
export type ViewerTheme = (typeof THEMES)[number]["id"];
export const THEME_STORAGE_KEY = "github-code-viewer-theme";
const isViewerTheme = (value: string | null): value is ViewerTheme => THEMES.some(({ id }) => id === value);

export const readTheme = (): ViewerTheme => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isViewerTheme(saved) ? saved : "tokyo-night";
  } catch {
    return "tokyo-night";
  }
};
