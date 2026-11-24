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
  primary: "bg-brand-500 text-white border-none",
  secondary: "bg-brand-50 text-brand-900 border border-brand-100",
  ghost: "bg-transparent text-brand-500 border-none",
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
      className={`rounded-theme px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </button>
  );
});
