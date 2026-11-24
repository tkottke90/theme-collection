import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** Elements a field can label: the theme's controls and native ones. */
const CONTROLS = "theme-input, theme-select, theme-textarea, input, select, textarea";

/** Marks an `aria-label` the field set, so it can update or remove its own and never a consumer's. */
const OWNED = "data-zd-field-label";

/**
 * Label + control stack; the label carries a small wire-amber bead.
 *
 * The visible label lives in this element's shadow root, where a `for`
 * attribute can't reach the control slotted in from outside. So the field
 * links them itself: it gives the control the label as its accessible name
 * (`aria-label`, unless the control already has its own) and makes clicking
 * the label focus the control, or toggle it for a checkbox or radio.
 *
 * The control is the element whose id matches `for`, if set; otherwise the
 * first control slotted in (or inside a slotted wrapper).
 */
@customElement("theme-field")
export class ThemeField extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

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

  protected updated(): void {
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
  private link(): void {
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

  private onLabelClick(): void {
    const control = this.control;
    if (!control) return;
    const type = control.getAttribute("type") ?? (control as HTMLInputElement).type;
    if (type === "checkbox" || type === "radio") control.click();
    else control.focus();
  }

  render() {
    return html`
      <div class="field flex flex-col gap-2 font-sans">
        <label
          @click=${this.onLabelClick}
          class="flex cursor-pointer items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[var(--zd-ink,var(--color-text))]"
          ><svg viewBox="0 0 8 8" class="h-2 w-2" aria-hidden="true">
            <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="var(--zd-accent, var(--color-wire-300))" /></svg
          >${this.label}</label
        >
        <slot @slotchange=${this.link}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-field": ThemeField;
  }
}
