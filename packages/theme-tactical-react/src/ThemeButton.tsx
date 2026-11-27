import { forwardRef } from "preact/compat";

export type ThemeButtonVariant = "primary" | "secondary" | "ghost";

export interface ThemeButtonProps {
  label?: string;
  variant?: ThemeButtonVariant;
  /** Defaults to "button"; use "submit" or "reset" inside a form. */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<ThemeButtonVariant, string> = {
  primary: "bg-brand-500 text-neutral-900 shadow-glow border-none hover:bg-brand-600",
  secondary: "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-900",
  ghost: "bg-transparent text-brand-500 border-none hover:bg-brand-900",
};

/** A `ref` reaches the native `<button>`. */
export const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(function ThemeButton(
  { label = "Click me", variant = "primary", type = "button", disabled = false, onClick },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-theme cursor-pointer px-4 py-2 text-sm font-semibold tracking-wide uppercase disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-alt disabled:text-text-muted disabled:opacity-60 disabled:shadow-none ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </button>
  );
});
