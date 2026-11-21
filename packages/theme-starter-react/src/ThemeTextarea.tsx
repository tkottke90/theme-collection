import type { JSX } from "preact";
import { tokens } from "./tokens.js";

export interface ThemeTextareaProps {
  value?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  onChange?: (event: Event) => void;
}

export function ThemeTextarea({
  value,
  placeholder,
  rows = 4,
  disabled = false,
  onChange,
}: ThemeTextareaProps): JSX.Element {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onChange={onChange}
      style={{
        borderRadius: tokens.radiusTheme,
        border: `1px solid ${tokens.neutral300}`,
        padding: "0.5rem 0.75rem",
        font: "inherit",
        color: tokens.neutral900,
        backgroundColor: disabled ? tokens.neutral100 : "white",
        cursor: disabled ? "not-allowed" : "text",
        resize: "vertical",
      }}
    />
  );
}
