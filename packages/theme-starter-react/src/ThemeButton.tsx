import type { JSX } from "preact";

export type ThemeButtonVariant = "primary" | "secondary" | "ghost";

export interface ThemeButtonProps {
  label?: string;
  variant?: ThemeButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<ThemeButtonVariant, string> = {
  primary: "bg-brand-500 text-white border-none",
  secondary: "bg-brand-50 text-brand-900 border border-brand-100",
  ghost: "bg-transparent text-brand-500 border-none",
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
      className={`rounded-theme px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </button>
  );
}
