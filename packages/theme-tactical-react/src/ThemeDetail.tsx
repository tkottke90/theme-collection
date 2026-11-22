import type { ComponentChildren, JSX } from "preact";

export interface ThemeDetailProps {
  summary: string;
  children?: ComponentChildren;
}

export function ThemeDetail({ summary, children }: ThemeDetailProps): JSX.Element {
  return (
    <details className="rounded-theme border border-border bg-surface-alt px-4 py-3 text-text">
      <summary className="cursor-pointer font-semibold text-brand-500">{summary}</summary>
      {children}
    </details>
  );
}
