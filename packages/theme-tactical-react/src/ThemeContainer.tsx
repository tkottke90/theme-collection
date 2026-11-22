import type { ComponentChildren, JSX } from "preact";

export type ThemeContainerTag = "div" | "ol" | "ul";

export interface ThemeContainerProps {
  as?: ThemeContainerTag;
  children?: ComponentChildren;
}

export function ThemeContainer({ as = "div", children }: ThemeContainerProps): JSX.Element {
  const Tag = as;

  return (
    <Tag className="rounded-theme m-0 flex list-none flex-col gap-2 border border-border bg-surface-alt px-5 py-4 text-text">
      {children}
    </Tag>
  );
}
