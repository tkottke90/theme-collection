import type { JSX } from "preact";
import { forwardRef } from "preact/compat";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

/**
 * Every native `<input>` prop is forwarded (`name`, `id`, `value` /
 * `defaultValue`, `checked` / `defaultChecked`, `required`, `onInput`,
 * `onChange`, `aria-*`, ...), so the control works in a plain `<form>`,
 * controlled or uncontrolled. `type` is narrowed to the types this theme styles.
 * A `ref` reaches the native `<input>` (e.g. for form libraries).
 */
export interface ThemeInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: ThemeInputType;
}

const BOX_TYPES: ThemeInputType[] = ["text", "email", "password", "number"];

const BOX_CLASSES =
  "rounded-theme border border-border bg-surface-alt px-3 py-2 [font:inherit] text-text placeholder:text-text-muted cursor-text disabled:opacity-60 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";
const TOGGLE_CLASSES =
  "accent-brand-500 h-[1.1rem] w-[1.1rem] cursor-pointer disabled:cursor-not-allowed";

export const ThemeInput = forwardRef<HTMLInputElement, ThemeInputProps>(function ThemeInput(
  { type = "text", class: cls, className, ...rest },
  ref,
) {
  const base = BOX_TYPES.includes(type) ? BOX_CLASSES : TOGGLE_CLASSES;
  return (
    <input
      {...rest}
      ref={ref}
      type={type}
      className={[base, cls, className].filter(Boolean).join(" ")}
    />
  );
});
