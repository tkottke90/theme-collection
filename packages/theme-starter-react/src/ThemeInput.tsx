import type { JSX } from "preact";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

/**
 * Every native `<input>` prop is forwarded (`name`, `id`, `value` /
 * `defaultValue`, `checked` / `defaultChecked`, `required`, `onInput`,
 * `onChange`, `aria-*`, ...), so the control works in a plain `<form>`,
 * controlled or uncontrolled. `type` is narrowed to the types this theme styles.
 */
export interface ThemeInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: ThemeInputType;
}

const BOX_TYPES: ThemeInputType[] = ["text", "email", "password", "number"];

const BOX_CLASSES =
  "rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-white cursor-text disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";
const TOGGLE_CLASSES =
  "accent-brand-500 w-[1.1rem] h-[1.1rem] cursor-pointer disabled:cursor-not-allowed";

export function ThemeInput({
  type = "text",
  class: cls,
  className,
  ...rest
}: ThemeInputProps): JSX.Element {
  const base = BOX_TYPES.includes(type) ? BOX_CLASSES : TOGGLE_CLASSES;
  return (
    <input {...rest} type={type} className={[base, cls, className].filter(Boolean).join(" ")} />
  );
}
