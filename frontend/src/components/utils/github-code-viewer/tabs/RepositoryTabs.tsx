import { useLayoutEffect, useRef, useState } from "react";
import TabContextMenu, { type TabMenuAction } from "./TabContextMenu";
import RepositoryIcon from "../explorer/RepositoryIcon";
import styles from "./RepositoryTabs.module.css";

interface Props {
  paths: string[];
  activePath: string | null;
  panelId: string;
  onSelect: (path: string) => void;
  onClose: (path: string) => void;
  onCloseAll: () => void;
  onCloseOthers: (path: string) => void;
}

const RepositoryTabs = ({ paths, activePath, panelId, onSelect, onClose, onCloseAll, onCloseOthers }: Props) => {
  const [menu, setMenu] = useState<{ x: number; y: number; path: string } | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const activeTab = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tab = activeTab.current;
    const container = strip.current;
    if (!tab || !container) return;
    if (tab.offsetLeft < container.scrollLeft) container.scrollLeft = tab.offsetLeft;
    else if (tab.offsetLeft + tab.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = tab.offsetLeft + tab.offsetWidth - container.clientWidth;
    }
  }, [activePath, paths]);

  const dismissMenu = () => setMenu(null);
  const handleMenuAction = (action: TabMenuAction) => {
    if (!menu) return;
    switch (action) {
      case "close": onClose(menu.path); break;
      case "closeOthers": onCloseOthers(menu.path); break;
      case "closeAll": onCloseAll(); break;
    }
    dismissMenu();
  };

  return (
    <>
      <div ref={strip} className={styles.tabs} role="tablist" aria-label="Open files">
        {paths.map((path) => (
          <div
            key={path}
            ref={path === activePath ? activeTab : null}
            className={`${styles.tab}${path === activePath ? ` ${styles.active}` : ""}`}
            role="presentation"
            onContextMenu={(event) => {
              event.preventDefault();
              setMenu({ x: event.clientX, y: event.clientY, path });
            }}
          >
            <button
              type="button"
              role="tab"
              className={styles.select}
              title={path}
              aria-label={path}
              aria-selected={path === activePath}
              aria-controls={panelId}
              onClick={() => onSelect(path)}
            >
              <RepositoryIcon path={path} />
              <span>{path.split("/").pop()}</span>
            </button>
            <button
              type="button"
              className={styles.close}
              aria-label={`Close ${path}`}
              title="Close file"
              onClick={() => onClose(path)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" /></svg>
            </button>
          </div>
        ))}
      </div>
      {menu && (
        <TabContextMenu position={menu} onDismiss={dismissMenu} onAction={handleMenuAction} />
      )}
    </>
  );
};

export default RepositoryTabs;
