import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeTextVariant = "body" | "caption";

export interface ThemeTextProps {
  variant?: ThemeTextVariant;
  children?: ComponentChildren;
}

export function ThemeText({ variant = "body", children }: ThemeTextProps): JSX.Element {
  if (variant === "caption") {
    return (
      <small
        style={{
          display: "block",
          margin: 0,
          fontSize: "0.75rem",
          color: tokens.neutral500,
        }}
      >
        {children}
      </small>
    );
  }

  return (
    <p
      style={{
        margin: 0,
        fontSize: "1rem",
        lineHeight: 1.5,
        color: tokens.neutral900,
      }}
    >
      {children}
    </p>
  );
}
