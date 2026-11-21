import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeHeadingLevel = 1 | 2 | 3 | 4;

export interface ThemeHeadingProps {
  level?: ThemeHeadingLevel;
  children?: ComponentChildren;
}

const FONT_SIZES: Record<ThemeHeadingLevel, string> = {
  1: "2.25rem",
  2: "1.875rem",
  3: "1.5rem",
  4: "1.25rem",
};

export function ThemeHeading({ level = 1, children }: ThemeHeadingProps): JSX.Element {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";

  return (
    <Tag
      style={{
        margin: 0,
        fontSize: FONT_SIZES[level],
        fontWeight: 700,
        color: tokens.neutral900,
      }}
    >
      {children}
    </Tag>
  );
}
