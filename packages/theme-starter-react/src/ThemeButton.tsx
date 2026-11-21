import type { JSX } from "preact";
import { tokens } from "./tokens.js";

export type ThemeButtonVariant = "primary" | "secondary" | "ghost";

export interface ThemeButtonProps {
  label?: string;
  variant?: ThemeButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
}

const VARIANT_STYLES: Record<
  ThemeButtonVariant,
  { background: string; color: string; border: string }
> = {
  primary: {
    background: tokens.brand500,
    color: "white",
    border: "none",
  },
  secondary: {
    background: tokens.brand50,
    color: tokens.brand900,
    border: `1px solid ${tokens.brand100}`,
  },
  ghost: {
    background: "transparent",
    color: tokens.brand500,
    border: "none",
  },
};

export function ThemeButton({
  label = "Click me",
  variant = "primary",
  disabled = false,
  onClick,
}: ThemeButtonProps): JSX.Element {
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        borderRadius: tokens.radiusTheme,
        backgroundColor: variantStyle.background,
        color: variantStyle.color,
        border: variantStyle.border,
        padding: "0.5rem 1rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}
