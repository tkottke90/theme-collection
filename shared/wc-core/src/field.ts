import { LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";

/** Elements a field can label: the theme's controls and native ones. */
const CONTROLS = "theme-input, theme-select, theme-textarea, input, select, textarea";

/** Radios, which are labelled one by one; a field labels their group instead. */
const RADIOS = 'theme-input[type="radio"], input[type="radio"]';

/** Marks an `aria-label` the field set, so it can update or remove its own and never a consumer's. */
const OWNED = "data-field-label";

/** Marks a `role="radiogroup"` the field set on a radio wrapper, for the same reason. */
const OWNED_ROLE = "data-field-role";

/** A wrapper of radios (rather than a control itself), which the field labels as a group. */
function isRadioGroup(el: Element): boolean {
  return !el.matches(CONTROLS) && el.querySelector(RADIOS) !== null;
}

/**
 * Base for each theme's `theme-field`: a visible label plus the control
 * slotted into it. Subclasses only supply `render()` and styles.
 *
 * The visible label lives in the field's shadow root, where a `for`
 * attribute can't reach the control slotted in from outside. So the field
 * links them itself: it gives the control the label as its accessible name
 * (`aria-label`, unless the control already has its own) and makes clicking
 * the label focus the control, or toggle it for a checkbox or radio. The
 * theme's controls (see `FormControlElement`) forward that `aria-label` to
 * their inner native element.
 *
 * The control is the element whose id matches `for`, if set; otherwise the
 * first control slotted in (or inside a slotted wrapper).
 *
 * Radios are the exception: each has its own label (its option text), so the
 * field never names one. When the first control is a radio inside a slotted
 * wrapper, the field labels the wrapper instead, as a `radiogroup` (unless
 * the wrapper already has a role), and clicking the label focuses the
 * checked radio without changing the selection. Radios slotted without a
 * wrapper (or each in its own slotted `<label>`) have nothing to name, so
 * the field leaves them alone; `for` can point at a group element instead.
 *
 * In `render()`, bind `@click=${this.onLabelClick}` on the label and
 * `@slotchange=${this.link}` on the default slot.
 */
export abstract class FieldElement extends LitElement {
  @property({ type: String }) label = "";
  /** Optional id of the control to label, when it isn't the first one slotted. */
  @property({ type: String }) for = "";

  private control: HTMLElement | null = null;

  /** The control this field labels, if one is found. */
  get labelledControl(): HTMLElement | null {
    return this.control;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.release();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    this.link();
  }

  private findControl(): HTMLElement | null {
    if (this.for) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const byId = root.getElementById?.(this.for);
      if (byId) return byId;
    }
    const slot = this.renderRoot.querySelector("slot");
    for (const el of slot?.assignedElements({ flatten: true }) ?? []) {
      const control = el.matches(CONTROLS) ? el : el.querySelector<HTMLElement>(CONTROLS);
      if (!control) continue;
      if (!control.matches(RADIOS)) return control as HTMLElement;
      // A radio: label its group, if there's a wrapper to stand for one.
      return el !== control && el.localName !== "label" ? (el as HTMLElement) : null;
    }
    return null;
  }

  /** Name the current control with the label (if it isn't named already). */
  protected link(): void {
    const next = this.findControl();
    if (next !== this.control) this.release();
    this.control = next;
    if (!next) return;

    const label = this.label.trim();
    const ours = next.hasAttribute(OWNED);
    const named = next.hasAttribute("aria-label") || next.hasAttribute("aria-labelledby");
    if (named && !ours) return; // the consumer named it; leave it alone

    if (label) {
      next.setAttribute("aria-label", label);
      next.setAttribute(OWNED, "");
      if (isRadioGroup(next) && !next.hasAttribute("role")) {
        next.setAttribute("role", "radiogroup");
        next.setAttribute(OWNED_ROLE, "");
      }
    } else if (ours) {
      unname(next);
    }
  }

  /** Remove the name this field gave a control it no longer labels. */
  private release(): void {
    const old = this.control;
    if (old?.hasAttribute(OWNED)) unname(old);
    this.control = null;
  }

  /**
   * Focus the control, or toggle it for a checkbox or radio. For a radio
   * group, focus the checked radio (else the first) without selecting it.
   */
  protected onLabelClick(): void {
    const control = this.control;
    if (!control) return;
    if (isRadioGroup(control)) {
      const radios = [...control.querySelectorAll<HTMLElement & { checked?: boolean }>(RADIOS)];
      (radios.find((r) => r.checked) ?? radios[0])?.focus();
      return;
    }
    const type = control.getAttribute("type") ?? (control as HTMLInputElement).type;
    if (type === "checkbox" || type === "radio") control.click();
    else control.focus();
  }
}

/** Remove the name (and any group role) a field gave an element. */
function unname(el: HTMLElement): void {
  el.removeAttribute("aria-label");
  el.removeAttribute(OWNED);
  if (el.hasAttribute(OWNED_ROLE)) {
    el.removeAttribute("role");
    el.removeAttribute(OWNED_ROLE);
  }
}
