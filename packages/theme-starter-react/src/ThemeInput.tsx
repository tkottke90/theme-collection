import type { JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

export interface ThemeInputProps {
  type?: ThemeInputType;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: Event) => void;
}

const BOX_TYPES: ThemeInputType[] = ["text", "email", "password", "number"];

export function ThemeInput({
  type = "text",
  value,
  placeholder,
  disabled = false,
  onChange,
}: ThemeInputProps): JSX.Element {
  const isBoxType = BOX_TYPES.includes(type);

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      style={
        isBoxType
          ? {
              borderRadius: tokens.radiusTheme,
              border: `1px solid ${tokens.neutral300}`,
              padding: "0.5rem 0.75rem",
              font: "inherit",
              color: tokens.neutral900,
              backgroundColor: disabled ? tokens.neutral100 : "white",
              cursor: disabled ? "not-allowed" : "text",
            }
          : {
              accentColor: tokens.brand500,
              width: "1.1rem",
              height: "1.1rem",
              cursor: disabled ? "not-allowed" : "pointer",
            }
      }
    />
  );
}
