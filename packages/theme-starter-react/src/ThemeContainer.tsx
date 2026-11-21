import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeContainerTag = "div" | "ol" | "ul";

export interface ThemeContainerProps {
  as?: ThemeContainerTag;
  children?: ComponentChildren;
}

export function ThemeContainer({ as = "div", children }: ThemeContainerProps): JSX.Element {
  const Tag = as;

  return (
    <Tag
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: 0,
        margin: 0,
        listStyle: "none",
        border: `1px solid ${tokens.neutral100}`,
        borderRadius: tokens.radiusTheme,
        backgroundColor: tokens.neutral50,
      }}
    >
      {children}
    </Tag>
  );
}
