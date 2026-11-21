import type { JSX } from "preact";

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
  const classes = isBoxType
    ? "rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-white cursor-text disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    : "accent-brand-500 w-[1.1rem] h-[1.1rem] cursor-pointer disabled:cursor-not-allowed";

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className={classes}
    />
  );
}
