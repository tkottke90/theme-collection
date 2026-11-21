import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export interface ThemeFieldProps {
  label: string;
  htmlFor?: string;
  children?: ComponentChildren;
}

export function ThemeField({ label, htmlFor, children }: ThemeFieldProps): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
      }}
    >
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: tokens.neutral900,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
