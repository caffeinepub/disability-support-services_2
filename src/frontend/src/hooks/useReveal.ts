import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    // Observe the container and all .reveal elements inside
    const items = el.querySelectorAll(".reveal");
    for (const item of items) observer.observe(item);
    if (el.classList.contains("reveal")) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
