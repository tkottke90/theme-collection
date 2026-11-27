import type { ComponentChildren, JSX } from "preact";

export type ThemeContainerTag = "div" | "ol" | "ul";

export interface ThemeContainerProps {
  as?: ThemeContainerTag;
  children?: ComponentChildren;
}

export function ThemeContainer({ as = "div", children }: ThemeContainerProps): JSX.Element {
  const Tag = as;

  // ol and ul keep their markers (muted numbers, square bullets) in the left gutter; div shows none.
  const layout =
    as === "ol"
      ? "list-decimal py-4 pr-5 pl-10 marker:text-text-muted"
      : as === "ul"
        ? "list-[square] py-4 pr-5 pl-10 marker:text-text-muted"
        : "list-none px-5 py-4";

  return (
    <Tag
      className={`rounded-theme m-0 flex flex-col gap-2 border border-border bg-surface-alt text-text ${layout}`}
    >
      {children}
    </Tag>
  );
}
