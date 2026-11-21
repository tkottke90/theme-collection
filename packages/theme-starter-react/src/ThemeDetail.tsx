import type { ComponentChildren, JSX } from "preact";

export interface ThemeDetailProps {
  summary: string;
  children?: ComponentChildren;
}

export function ThemeDetail({ summary, children }: ThemeDetailProps): JSX.Element {
  return (
    <details className="rounded-theme border border-neutral-100 py-2 px-3 bg-neutral-50">
      <summary className="font-semibold cursor-pointer text-neutral-900">{summary}</summary>
      {children}
    </details>
  );
}
