// Read-only GitHub source viewer with a collapsible explorer and resizable panes.
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useWindowWidth } from "@react-hook/window-size";
import FileContent from "./editor/FileContent";
import RepositoryTabs from "./tabs/RepositoryTabs";
import RepositoryEditor from "./editor/RepositoryEditor";
import RepositoryExplorer from "./explorer/RepositoryExplorer";
import { useExplorerResize } from "./explorer/useExplorerResize";
import { useRepositorySource } from "./data/useRepositorySource";
import { useMediaView } from "../project-media-view/MediaViewContext";
import styles from "./GitHubCodeViewer.module.css";
import themeStyles from "./ViewerThemes.module.css";

const THEMES = [
  { id: "current-dark", label: "Default Dark" },
  { id: "darcula", label: "Darcula" },
  { id: "monokai", label: "Monokai" },
  { id: "tokyo-night", label: "Tokyo Night" },
] as const;
type ViewerTheme = (typeof THEMES)[number]["id"];
const THEME_STORAGE_KEY = "github-code-viewer-theme";
const isViewerTheme = (value: string | null): value is ViewerTheme => THEMES.some(({ id }) => id === value);

const readTheme = (): ViewerTheme => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    // Preserve selections saved before correcting Dracula to JetBrains Darcula.
    if (saved === "dracula") return "darcula";
    return isViewerTheme(saved) ? saved : "current-dark";
  } catch {
    return "current-dark";
  }
};

interface ThemeSelectorProps {
  theme: ViewerTheme;
  onChange: (theme: ViewerTheme) => void;
}

const ThemeSelector = ({ theme, onChange }: ThemeSelectorProps) => {
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = THEMES.findIndex(({ id }) => id === theme);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const close = () => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };
  const show = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  useLayoutEffect(() => {
    if (!open || !menu.current || !trigger.current) return;
    const element = menu.current;
    const rect = trigger.current.getBoundingClientRect();
    element.style.left = `${Math.max(8, Math.min(rect.right - element.offsetWidth, window.innerWidth - element.offsetWidth - 8))}px`;
    // The status-bar control opens upwards, outside the clipped viewer.
    element.style.top = `${Math.max(8, Math.min(rect.top - element.offsetHeight - 4, window.innerHeight - element.offsetHeight - 8))}px`;
  }, [open]);

  useLayoutEffect(() => {
    if (open) menu.current?.querySelectorAll<HTMLButtonElement>("button")[activeIndex]?.focus({ preventScroll: true });
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: Event) => {
      const target = event.target as Node;
      if (!menu.current?.contains(target) && !trigger.current?.contains(target)) {
        setOpen(false);
        // Do not steal focus from another control clicked outside the menu.
        if (event.type === "pointerdown" && menu.current?.contains(document.activeElement)) {
          trigger.current?.focus({ preventScroll: true });
        }
      }
    };
    const dismissOnLayoutChange = (event: Event) => {
      if (event.type === "scroll" && menu.current?.contains(event.target as Node)) return;
      setOpen(false);
      if (menu.current?.contains(document.activeElement)) trigger.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    document.addEventListener("scroll", dismissOnLayoutChange, true);
    document.addEventListener("fullscreenchange", dismissOnLayoutChange);
    window.addEventListener("resize", dismissOnLayoutChange);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
      document.removeEventListener("scroll", dismissOnLayoutChange, true);
      document.removeEventListener("fullscreenchange", dismissOnLayoutChange);
      window.removeEventListener("resize", dismissOnLayoutChange);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={styles.themeSelector}
        aria-label={`Code viewer theme: ${THEMES[selectedIndex].label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        title="Code viewer theme"
        onClick={() => open ? close() : show()}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            show();
          } else if (event.key === "Escape" && open) {
            event.preventDefault();
            event.stopPropagation();
            close();
          }
        }}
      >
        {THEMES[selectedIndex].label} <span aria-hidden="true">▾</span>
      </button>
      {open && createPortal(
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label="Code viewer theme"
          className={`${styles.themeMenu} ${themeStyles.theme}`}
          data-viewer-theme={theme}
          onKeyDown={(event) => {
            let nextIndex: number | undefined;
            if (event.key === "ArrowDown") nextIndex = (activeIndex + 1) % THEMES.length;
            if (event.key === "ArrowUp") nextIndex = (activeIndex + THEMES.length - 1) % THEMES.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = THEMES.length - 1;
            if (nextIndex !== undefined) {
              event.preventDefault();
              setActiveIndex(nextIndex);
            } else if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              close();
            } else if (event.key === "Tab") {
              // Return to the trigger before the browser advances tab order.
              close();
            } else if (event.key.length === 1 && event.key !== " ") {
              const match = THEMES.findIndex(({ label }) => label.toLowerCase().startsWith(event.key.toLowerCase()));
              if (match !== -1) {
                event.preventDefault();
                setActiveIndex(match);
              }
            }
          }}
        >
          {THEMES.map(({ id, label }, index) => (
            <button
              key={id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === id}
              tabIndex={activeIndex === index ? 0 : -1}
              className={styles.themeOption}
              onFocus={() => setActiveIndex(index)}
              onClick={() => { onChange(id); close(); }}
            >
              <span className={styles.themeCheck} aria-hidden="true">{theme === id ? "✓" : ""}</span>
              {label}
            </button>
          ))}
        </div>,
        document.fullscreenElement ?? trigger.current?.closest('.project-media-view[data-fullscreen]') ?? document.body,
      )}
    </>
  );
};

export interface GitHubCodeViewerProps {
  repositoryUrl: string;
  owner: string;
  repository: string;
  branch?: string;
  defaultFile?: string;
  defaultOpenFiles?: readonly string[];
}

interface FontSizeButtonProps {
  direction: "decrease" | "increase";
  disabled: boolean;
  onClick: () => void;
}

const FontSizeButton = ({ direction, disabled, onClick }: FontSizeButtonProps) => {
  const label = direction === "decrease" ? "Decrease code font size" : "Increase code font size";

  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="10" r="6" />
        <path d={direction === "decrease" ? "m15 15 6 6M7 10h6" : "m15 15 6 6M7 10h6M10 7v6"} />
      </svg>
    </button>
  );
};

interface FontSizeControlsProps {
  fontSize: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const FontSizeControls = ({ fontSize, onDecrease, onIncrease }: FontSizeControlsProps) => (
  <div className={styles.fontControls} role="group" aria-label="Code font size">
    <FontSizeButton direction="decrease" disabled={fontSize <= 6} onClick={onDecrease} />
    <FontSizeButton direction="increase" disabled={fontSize >= 24} onClick={onIncrease} />
  </div>
);

const RepositoryViewer = ({ repositoryUrl, owner, repository, branch = "main", defaultFile, defaultOpenFiles }: GitHubCodeViewerProps) => {
  const panelId = useId();
  const isMobile = useWindowWidth() <= 600;
  const [showFiles, setShowFiles] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<ViewerTheme>(readTheme);
  const changeTheme = (nextTheme: ViewerTheme) => {
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Keep the control usable when browser storage is unavailable.
    }
  };
  const isFullscreen = useMediaView()?.isFullscreen ?? false;
  const showFontControls = !isMobile || isFullscreen;
  const [revealRequest, setRevealRequest] = useState(0);
  const { files, activeFile, tabs, source, isLoading, hasError } = useRepositorySource({
    owner,
    repository,
    branch,
    defaultFile,
    defaultOpenFiles: isMobile ? undefined : defaultOpenFiles,
  });
  const { workspaceRef, explorerWidth, isResizing, separatorProps } = useExplorerResize();
  return (
    <section
      className={`${styles.viewer} ${themeStyles.theme} ${isResizing ? styles.isResizing : ""} github-code-viewer`}
      data-viewer-theme={theme}
      style={{ "--explorer-width": `${explorerWidth}px`, "--code-font-size": showFontControls ? `${fontSize}px` : undefined } as CSSProperties}
      aria-label={`${repository} source code`}
    >
      <header className={styles.titlebar}>
        <span className={styles.windowTitle}>{repository}</span>
      </header>

      <button
        type="button"
        className={styles.filesToggle}
        aria-expanded={showFiles}
        onClick={() => setShowFiles((visible) => !visible)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7V5h6l2 2h10v13H3Z" />
        </svg>
        <span>{showFiles ? "Back to code" : "Files"}</span>
        <svg className={styles.filesChevron} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>
      <div ref={workspaceRef} className={`${styles.workspace} ${showFiles ? styles.mobileFilesOpen : ""}`}>
        <RepositoryExplorer
          repository={repository}
          revealRequest={revealRequest}
          files={files}
          activePath={activeFile?.path ?? ""}
          onSelectFile={(path) => {
            tabs.selectPath(path);
            setShowFiles(false);
          }}
        />
        <div className={styles.explorerDivider} {...separatorProps} />
        <RepositoryEditor
          panelId={panelId}
          repository={repository}
          filePath={activeFile?.path}
          tabs={
            <RepositoryTabs
              theme={theme}
              panelId={panelId}
              paths={tabs.paths}
              activePath={tabs.activePath}
              onSelect={(path) => {
                tabs.selectPath(path);
                setRevealRequest((request) => request + 1);
              }}
              onClose={tabs.closePath}
              onCloseAll={tabs.closeAll}
              onCloseOthers={tabs.closeOthers}
            />
          }
        >
          <FileContent
            file={activeFile}
            repositoryUrl={repositoryUrl}
            branch={branch}
            fileUrl={activeFile ? `${repositoryUrl}/blob/${branch}/${activeFile.path}` : repositoryUrl}
            source={source}
            isLoading={isLoading}
            hasError={hasError}
          />
        </RepositoryEditor>
      </div>

      <footer className={styles.statusbar}>
        <span>{activeFile?.language ?? "No file open"}</span>
        {activeFile && !isLoading && hasError && <span>Offline</span>}
        <span className={styles.statusSpacer} />
        {!isMobile && <ThemeSelector theme={theme} onChange={changeTheme} />}
        {showFontControls && (
          <FontSizeControls
            fontSize={fontSize}
            onDecrease={() => setFontSize((size) => Math.max(6, size - 1))}
            onIncrease={() => setFontSize((size) => Math.min(24, size + 1))}
          />
        )}

        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </section>
  );
};

const GitHubCodeViewer = (props: GitHubCodeViewerProps) => (
  <RepositoryViewer key={`${props.owner}/${props.repository}/${props.branch ?? "main"}`} {...props} />
);

export default GitHubCodeViewer;
