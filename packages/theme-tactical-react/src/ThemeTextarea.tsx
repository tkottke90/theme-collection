import type { JSX } from "preact";

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
      className="rounded-theme border border-border bg-surface-alt px-3 py-2 [font:inherit] text-text placeholder:text-text-muted resize-y cursor-text disabled:opacity-60 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    />
  );
}
