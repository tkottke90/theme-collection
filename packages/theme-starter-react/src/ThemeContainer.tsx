import type { ComponentChildren, JSX } from "preact";

export type ThemeContainerTag = "div" | "ol" | "ul";

export interface ThemeContainerProps {
  as?: ThemeContainerTag;
  children?: ComponentChildren;
}

export function ThemeContainer({ as = "div", children }: ThemeContainerProps): JSX.Element {
  const Tag = as;

  return (
    <Tag className="flex flex-col gap-2 m-0 list-none border border-neutral-100 rounded-theme bg-neutral-50">
      {children}
    </Tag>
  );
}
