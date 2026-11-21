import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export interface ThemeCardProps {
  heading?: string;
  children?: ComponentChildren;
}

export function ThemeCard({ heading, children }: ThemeCardProps): JSX.Element {
  return (
    <div
      style={{
        borderRadius: tokens.radiusTheme,
        backgroundColor: tokens.brand50,
        color: tokens.brand900,
        border: `1px solid ${tokens.brand100}`,
        padding: "1rem 1.25rem",
      }}
    >
      {heading ? <h2>{heading}</h2> : null}
      {children}
    </div>
  );
}
