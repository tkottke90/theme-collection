import type { JSX } from "preact";

export type ThemeButtonVariant = "primary" | "secondary" | "ghost";

export interface ThemeButtonProps {
  label?: string;
  variant?: ThemeButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<ThemeButtonVariant, string> = {
  primary: "bg-brand-500 text-neutral-900 shadow-glow border-none hover:bg-brand-600",
  secondary: "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-900",
  ghost: "bg-transparent text-brand-500 border-none hover:bg-brand-900",
};

export function ThemeButton({
  label = "Click me",
  variant = "primary",
  disabled = false,
  onClick,
}: ThemeButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-theme cursor-pointer px-4 py-2 text-sm font-semibold tracking-wide uppercase disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-alt disabled:text-text-muted disabled:opacity-60 disabled:shadow-none ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </button>
  );
}
