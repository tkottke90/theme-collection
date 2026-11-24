import { LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";

/** Elements a field can label: the theme's controls and native ones. */
const CONTROLS = "theme-input, theme-select, theme-textarea, input, select, textarea";

/** Marks an `aria-label` the field set, so it can update or remove its own and never a consumer's. */
const OWNED = "data-field-label";

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
      if (el.matches(CONTROLS)) return el as HTMLElement;
      const inner = el.querySelector<HTMLElement>(CONTROLS);
      if (inner) return inner;
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
    } else if (ours) {
      next.removeAttribute("aria-label");
      next.removeAttribute(OWNED);
    }
  }

  /** Remove the name this field gave a control it no longer labels. */
  private release(): void {
    const old = this.control;
    if (old?.hasAttribute(OWNED)) {
      old.removeAttribute("aria-label");
      old.removeAttribute(OWNED);
    }
    this.control = null;
  }

  /** Focus the control, or toggle it for a checkbox or radio. */
  protected onLabelClick(): void {
    const control = this.control;
    if (!control) return;
    const type = control.getAttribute("type") ?? (control as HTMLInputElement).type;
    if (type === "checkbox" || type === "radio") control.click();
    else control.focus();
  }
}
