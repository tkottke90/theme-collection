import type { JSX } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

/**
 * Every native `<select>` prop is forwarded (`name`, `id`, `value`,
 * `required`, `onChange`, `aria-*`, ...), so the control works in a plain
 * `<form>`, controlled (`value`) or uncontrolled (`defaultValue`, or a
 * `selected` option).
 */
export type ThemeSelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

const CLASSES =
  "rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-white cursor-pointer disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";

export function ThemeSelect({
  defaultValue,
  class: cls,
  className,
  children,
  ...rest
}: ThemeSelectProps): JSX.Element {
  const ref = useRef<HTMLSelectElement>(null);

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
    <select {...rest} ref={ref} className={[CLASSES, cls, className].filter(Boolean).join(" ")}>
      {children}
    </select>
  );
}
