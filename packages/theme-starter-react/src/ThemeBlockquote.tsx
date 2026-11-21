import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeBlockquoteType = keyof typeof tokens.blockquote;

export interface ThemeBlockquoteProps {
  type?: ThemeBlockquoteType;
  children?: ComponentChildren;
}

const LABELS: Record<ThemeBlockquoteType, string> = {
  info: "Info",
  tip: "Tip",
  question: "Question",
  success: "Success",
  warning: "Warning",
  failure: "Failure",
  danger: "Danger",
  bug: "Bug",
  example: "Example",
  quote: "Quote",
};

export function ThemeBlockquote({ type = "info", children }: ThemeBlockquoteProps): JSX.Element {
  const accent = tokens.blockquote[type];

  return (
    <blockquote
      style={{
        borderLeft: `4px solid ${accent}`,
        backgroundColor: `color-mix(in srgb, ${accent} 10%, white)`,
        padding: "0.75rem 1rem",
        borderRadius: tokens.radiusTheme,
        margin: 0,
      }}
    >
      <span
        style={{
          display: "block",
          fontWeight: 600,
          color: accent,
          marginBottom: "0.25rem",
        }}
      >
        {LABELS[type]}
      </span>
      {children}
    </blockquote>
  );
}
