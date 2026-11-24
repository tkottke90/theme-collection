import type { JSX } from "preact";

/**
 * Every native `<textarea>` prop is forwarded (`name`, `id`, `value` /
 * `defaultValue`, `required`, `onInput`, `onChange`, `aria-*`, ...), so the
 * control works in a plain `<form>`, controlled or uncontrolled.
 */
export type ThemeTextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

const CLASSES =
  "rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-white resize-y cursor-text disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";

export function ThemeTextarea({
  rows = 4,
  class: cls,
  className,
  ...rest
}: ThemeTextareaProps): JSX.Element {
  return (
    <textarea
      {...rest}
      rows={rows}
      className={[CLASSES, cls, className].filter(Boolean).join(" ")}
    />
  );
}
