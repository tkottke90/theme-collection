const KEYFRAMES_ID = "theme-skeleton-shimmer-keyframes";
let injected = false;

export function ensureKeyframes(): void {
  if (injected || typeof document === "undefined") {
    return;
  }

  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `@keyframes theme-skeleton-shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }`;
  document.head.appendChild(style);
  injected = true;
}

export function prefersReducedMotion(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    );
  } catch {
    return false;
  }
}
