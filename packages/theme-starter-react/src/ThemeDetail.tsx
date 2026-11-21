import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export interface ThemeDetailProps {
  summary: string;
  children?: ComponentChildren;
}

export function ThemeDetail({ summary, children }: ThemeDetailProps): JSX.Element {
  return (
    <details
      style={{
        borderRadius: tokens.radiusTheme,
        border: `1px solid ${tokens.neutral100}`,
        padding: "0.5rem 0.75rem",
        backgroundColor: tokens.neutral50,
      }}
    >
      <summary
        style={{
          fontWeight: 600,
          cursor: "pointer",
          color: tokens.neutral900,
        }}
      >
        {summary}
      </summary>
      {children}
    </details>
  );
}
