import type { JSX } from "preact";
import { forwardRef, type ForwardedRef } from "preact/compat";
import { useLayoutEffect, useRef } from "preact/hooks";

/**
 * Every native `<select>` prop is forwarded (`name`, `id`, `value`,
 * `required`, `onChange`, `aria-*`, ...), so the control works in a plain
 * `<form>`, controlled (`value`) or uncontrolled (`defaultValue`, or a
 * `selected` option). A `ref` reaches the native `<select>`.
 */
export type ThemeSelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

const CLASSES =
  "rounded-theme border border-border bg-surface-alt px-3 py-2 [font:inherit] text-text cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";

/** Point a forwarded ref (object or callback) at the element. */
function assignRef<T>(ref: ForwardedRef<T>, value: T | null): void {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

export const ThemeSelect = forwardRef<HTMLSelectElement, ThemeSelectProps>(function ThemeSelect(
  { defaultValue, class: cls, className, children, ...rest },
  forwarded,
) {
  const ref = useRef<HTMLSelectElement | null>(null);

  // A <select> has no `defaultValue` DOM property, so mark the matching
  // option as the default instead: it becomes selected now, and is what
  // `form.reset()` returns to.
  useLayoutEffect(() => {
    const select = ref.current;
    if (!select || defaultValue === undefined) return;
    const wanted = String(
      typeof defaultValue === "object" && defaultValue !== null ? defaultValue.value : defaultValue,
    );
    for (const option of Array.from(select.options)) {
      option.defaultSelected = option.value === wanted;
    }
    // Applied once, on mount, like a native default.
  }, []);

  return (
    <select
      {...rest}
      ref={(el: HTMLSelectElement | null) => {
        ref.current = el;
        assignRef(forwarded, el);
      }}
      className={[CLASSES, cls, className].filter(Boolean).join(" ")}
    >
      {children}
    </select>
  );
});
