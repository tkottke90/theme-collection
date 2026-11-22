import type { ComponentChildren, JSX } from "preact";

export type ThemeHeadingLevel = 1 | 2 | 3 | 4;

export interface ThemeHeadingProps {
  level?: ThemeHeadingLevel;
  children?: ComponentChildren;
}

const SIZE_CLASSES: Record<ThemeHeadingLevel, string> = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
};

export function ThemeHeading({ level = 1, children }: ThemeHeadingProps): JSX.Element {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";

  return (
    <Tag className={`m-0 font-bold tracking-wide text-text uppercase ${SIZE_CLASSES[level]}`}>
      {children}
    </Tag>
  );
}
