import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export interface ThemeSelectProps {
  value?: string;
  disabled?: boolean;
  onChange?: (event: Event) => void;
  children?: ComponentChildren;
}

export function ThemeSelect({
  value,
  disabled = false,
  onChange,
  children,
}: ThemeSelectProps): JSX.Element {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      style={{
        borderRadius: tokens.radiusTheme,
        border: `1px solid ${tokens.neutral300}`,
        padding: "0.5rem 0.75rem",
        font: "inherit",
        color: tokens.neutral900,
        backgroundColor: disabled ? tokens.neutral100 : "white",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </select>
  );
}
