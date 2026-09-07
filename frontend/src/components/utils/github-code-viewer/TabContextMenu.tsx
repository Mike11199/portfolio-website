import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./TabContextMenu.module.css";

interface Props {
  position: { x: number; y: number };
  onCloseAll: () => void;
  onCloseOthers: () => void;
  onDismiss: () => void;
}

const TabContextMenu = ({ position, onCloseAll, onCloseOthers, onDismiss }: Props) => {
  const menu = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = menu.current;
    if (!element) return;
    element.style.left = `${Math.max(8, Math.min(position.x, window.innerWidth - element.offsetWidth - 8))}px`;
    element.style.top = `${Math.max(8, Math.min(position.y, window.innerHeight - element.offsetHeight - 8))}px`;
    element.querySelector("button")?.focus({ preventScroll: true });
  }, [position]);

  useEffect(() => {
    const dismissOutside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) onDismiss();
    };
    const dismissOnKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") onDismiss();
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnKey);
    document.addEventListener("scroll", onDismiss, true);
    document.addEventListener("fullscreenchange", onDismiss);
    window.addEventListener("resize", onDismiss);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnKey);
      document.removeEventListener("scroll", onDismiss, true);
      document.removeEventListener("fullscreenchange", onDismiss);
      window.removeEventListener("resize", onDismiss);
    };
  }, [onDismiss]);

  return createPortal(
    <div ref={menu} className={styles.menu} role="menu" aria-label="Tab actions">
      <button type="button" role="menuitem" onClick={onCloseOthers}>Close other tabs</button>
      <button type="button" role="menuitem" onClick={onCloseAll}>Close all tabs</button>
    </div>,
    document.fullscreenElement ?? document.body,
  );
};

export default TabContextMenu;
