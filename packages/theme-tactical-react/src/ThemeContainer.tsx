import type { ComponentChildren, JSX } from "preact";

export type ThemeContainerTag = "div" | "ol" | "ul";

export interface ThemeContainerProps {
  as?: ThemeContainerTag;
  children?: ComponentChildren;
}

export function ThemeContainer({ as = "div", children }: ThemeContainerProps): JSX.Element {
  const Tag = as;

  // An ol keeps its numbers (muted, in the left gutter); ul and div show none.
  const layout =
    as === "ol" ? "list-decimal py-4 pr-5 pl-10 marker:text-text-muted" : "list-none px-5 py-4";

  return (
    <Tag
      className={`rounded-theme m-0 flex flex-col gap-2 border border-border bg-surface-alt text-text ${layout}`}
    >
      {children}
    </Tag>
  );
}
