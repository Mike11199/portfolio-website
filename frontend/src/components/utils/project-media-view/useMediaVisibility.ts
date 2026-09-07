import { useEffect, useRef, useState } from "react";

/** Start media near the viewport and pause it when the project leaves view. */
export const useMediaVisibility = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: "100px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};
