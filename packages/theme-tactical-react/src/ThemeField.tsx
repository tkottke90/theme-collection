import { cloneElement, isValidElement, toChildArray } from "preact";
import type { ComponentChildren, JSX, VNode } from "preact";
import { useId } from "preact/hooks";

export interface ThemeFieldProps {
  label: string;
  /** The id of the control this field labels. Optional: see below. */
  htmlFor?: string;
  children?: ComponentChildren;
}

const LABEL_CLASSES = "text-sm font-semibold tracking-wide text-text uppercase";

/** Native elements a `<label for>` can point at. Components are assumed to render one. */
const LABELABLE = new Set(["input", "select", "textarea", "button", "meter", "output", "progress"]);

function singleControl(children: ComponentChildren): VNode<{ id?: string }> | null {
  const nodes = toChildArray(children);
  if (nodes.length !== 1 || !isValidElement(nodes[0])) return null;
  const node = nodes[0] as VNode<{ id?: string }>;
  return typeof node.type === "string" && !LABELABLE.has(node.type) ? null : node;
}

/**
 * A label stacked above a form control, associated natively with
 * `<label for>`, so clicking the label focuses the control and the label is
 * its accessible name.
 *
 * - One control child (a ThemeInput/ThemeSelect/ThemeTextarea or a native
 *   control): it is labelled. Its own `id` is used, else `htmlFor`, else a
 *   generated id (the control receives it as its `id`).
 * - Anything else (e.g. a `<div>` of radios): the label names the wrapper,
 *   rendered as `role="group"`, unless `htmlFor` points at one control.
 */
export function ThemeField({ label, htmlFor, children }: ThemeFieldProps): JSX.Element {
  const generatedId = useId();
  const only = singleControl(children);

  if (only) {
    const id = only.props.id ?? htmlFor ?? `theme-field-${generatedId}`;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className={LABEL_CLASSES}>
          {label}
        </label>
        {only.props.id === id ? only : cloneElement(only, { id })}
      </div>
    );
  }

  if (htmlFor) {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={htmlFor} className={LABEL_CLASSES}>
          {label}
        </label>
        {children}
      </div>
    );
  }

  const labelId = `theme-field-${generatedId}-label`;
  return (
    <div role="group" aria-labelledby={labelId} className="flex flex-col gap-1.5">
      <span id={labelId} className={LABEL_CLASSES}>
        {label}
      </span>
      {children}
    </div>
  );
}
