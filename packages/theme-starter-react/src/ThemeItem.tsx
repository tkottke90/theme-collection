import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeItemTag = "li" | "div";

export interface ThemeItemProps {
  as?: ThemeItemTag;
  children?: ComponentChildren;
}

export function ThemeItem({ as = "li", children }: ThemeItemProps): JSX.Element {
  const Tag = as;

  return (
    <Tag
      style={{
        padding: "0.5rem 0.75rem",
        borderRadius: tokens.radiusTheme,
        backgroundColor: "white",
        border: `1px solid ${tokens.neutral100}`,
        color: tokens.neutral900,
      }}
    >
      {children}
    </Tag>
  );
}
