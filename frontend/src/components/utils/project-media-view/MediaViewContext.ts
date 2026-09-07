import { createContext, useContext, type RefObject } from "react";

export const MediaViewContext = createContext<{
  root: RefObject<HTMLDivElement>;
  isFullscreen: boolean;
  showCode: boolean;
} | null>(null);

export const useMediaView = () => useContext(MediaViewContext);
