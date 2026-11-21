import type { ComponentChildren, JSX } from "preact";

export type ThemeItemTag = "li" | "div";

export interface ThemeItemProps {
  as?: ThemeItemTag;
  children?: ComponentChildren;
}

export function ThemeItem({ as = "li", children }: ThemeItemProps): JSX.Element {
  const Tag = as;

  return (
    <Tag className="py-2 px-3 rounded-theme bg-white border border-neutral-100 text-neutral-900">
      {children}
    </Tag>
  );
}
