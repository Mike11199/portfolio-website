import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { THEMES, type ViewerTheme } from "./viewerTheme";
import styles from "./GitHubCodeViewer.module.css";
import themeStyles from "./ViewerThemes.module.css";

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

export default ThemeSelector;
