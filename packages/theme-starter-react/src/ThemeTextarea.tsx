import type { JSX } from "preact";
import { forwardRef } from "preact/compat";

/**
 * Every native `<textarea>` prop is forwarded (`name`, `id`, `value` /
 * `defaultValue`, `required`, `onInput`, `onChange`, `aria-*`, ...), so the
 * control works in a plain `<form>`, controlled or uncontrolled. A `ref`
 * reaches the native `<textarea>`.
 */
export type ThemeTextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

const CLASSES =
  "rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-white resize-y cursor-text disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";

export const ThemeTextarea = forwardRef<HTMLTextAreaElement, ThemeTextareaProps>(
  function ThemeTextarea({ rows = 4, class: cls, className, ...rest }, ref) {
    return (
      <textarea
        {...rest}
        ref={ref}
        rows={rows}
        className={[CLASSES, cls, className].filter(Boolean).join(" ")}
      />
    );
  },
);
