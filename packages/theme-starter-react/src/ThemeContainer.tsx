import type { ComponentChildren, JSX } from "preact";

export type ThemeContainerTag = "div" | "ol" | "ul";

export interface ThemeContainerProps {
  as?: ThemeContainerTag;
  children?: ComponentChildren;
}

export function ThemeContainer({ as = "div", children }: ThemeContainerProps): JSX.Element {
  const Tag = as;

  // ol and ul keep their markers (numbers, bullets) in the left gutter; div shows none.
  const layout =
    as === "ol"
      ? "list-decimal pl-10 marker:text-neutral-500"
      : as === "ul"
        ? "list-disc pl-10 marker:text-neutral-500"
        : "list-none";

  return (
    <Tag
      className={`flex flex-col gap-2 m-0 border border-neutral-100 rounded-theme bg-neutral-50 ${layout}`}
    >
      {children}
    </Tag>
  );
}
