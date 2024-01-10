import { useEffect, useState } from "react";

/**
 * Custom React Hook to get and track the dimensions of the browser window.
 * Any function that uses react hooks such as useState or useEffect is considered a custom hook.
 *
 * @returns {{ width: number, height: number }} The width and height of the browser window.
 */
export function useBrowserWindowDimensions() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
