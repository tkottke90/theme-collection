import type { JSX } from "preact";

export interface ThemeSkeletonTextProps {
  width?: string;
}

export function ThemeSkeletonText({ width = "100%" }: ThemeSkeletonTextProps): JSX.Element {
  return <div className="theme-shimmer rounded-theme h-3.5 mb-1.5" style={{ width }} />;
}
