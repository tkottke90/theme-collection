import type { JSX } from "preact";

export interface ThemeSkeletonHeadingProps {
  width?: string;
}

export function ThemeSkeletonHeading({ width = "60%" }: ThemeSkeletonHeadingProps): JSX.Element {
  return <div className="theme-shimmer rounded-theme h-6 mb-2" style={{ width }} />;
}
