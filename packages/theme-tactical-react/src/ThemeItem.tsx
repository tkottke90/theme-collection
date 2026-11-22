import type { ComponentChildren, JSX } from "preact";

export type ThemeItemTag = "li" | "div";

export interface ThemeItemProps {
  as?: ThemeItemTag;
  children?: ComponentChildren;
}

export function ThemeItem({ as = "li", children }: ThemeItemProps): JSX.Element {
  const Tag = as;

  return (
    <Tag className="rounded-theme border border-border bg-surface px-3 py-2 text-text">
      {children}
    </Tag>
  );
}
