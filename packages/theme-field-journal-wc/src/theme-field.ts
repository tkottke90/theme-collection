import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** A control this field can label: the theme's own controls expose `accessibleLabel`. */
interface LabelableControl extends HTMLElement {
  accessibleLabel?: string;
}

const CONTROLS = "theme-input, theme-select, theme-textarea, input, select, textarea";

/** Marks a name this field gave a control, so it only ever updates or removes its own. */
const OWNED = "data-field-label";

/**
 * Pairs a label with the control slotted into it.
 *
 * The visible `<label>` lives in this element's shadow root, so a native
 * `for`/`id` link can't reach a control in the light DOM. Instead the field
 * gives the control its label as the accessible name (`accessibleLabel` on
 * the theme's controls, `aria-label` on a native one) unless the consumer
 * already named it, and clicking the label focuses the control (or toggles
 * a native checkbox/radio).
 *
 * The control is the slotted one whose id matches `for`, if set; otherwise
 * the first control slotted in (or inside a slotted wrapper).
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
  /** Id of the slotted control to label, when it isn't the first one. */
  @property({ type: String }) for = "";

  private control: LabelableControl | null = null;

  /** The control this field labels, if one was found. */
  get labelledControl(): HTMLElement | null {
    return this.control;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.release();
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has("label") || changed.has("for")) this.link();
  }

  private findControl(): LabelableControl | null {
    const slot = this.renderRoot.querySelector("slot");
    const controls = (slot?.assignedElements({ flatten: true }) ?? []).flatMap((el) =>
      el.matches(CONTROLS) ? [el] : [...el.querySelectorAll(CONTROLS)],
    ) as LabelableControl[];
    return (this.for && controls.find((el) => el.id === this.for)) || controls[0] || null;
  }

  private link(): void {
    const next = this.findControl();
    if (next !== this.control) this.release();
    this.control = next;
    if (!next) return;

    const tag = next.localName;
    if (tag.includes("-") && !customElements.get(tag)) {
      // Not upgraded yet, so it has no accessibleLabel property to set.
      void customElements.whenDefined(tag).then(() => {
        if (this.control === next) this.link();
      });
      return;
    }

    const ours = next.hasAttribute(OWNED);
    if (!ours && hasOwnName(next)) return; // the consumer named it; leave it alone
    if (this.label) {
      setName(next, this.label);
      next.setAttribute(OWNED, "");
    } else if (ours) {
      setName(next, undefined);
      next.removeAttribute(OWNED);
    }
  }

  /** Remove the name this field gave a control it no longer labels. */
  private release(): void {
    const old = this.control;
    if (old?.hasAttribute(OWNED)) {
      setName(old, undefined);
      old.removeAttribute(OWNED);
    }
    this.control = null;
  }

  private onLabelClick(): void {
    const control = this.control;
    if (!control) return;
    const type = (control as HTMLInputElement).type;
    if (control.localName === "input" && (type === "checkbox" || type === "radio")) control.click();
    else control.focus();
  }

  render() {
    return html`
      <div class="field font-sans flex flex-col gap-1.5">
        <label
          @click=${this.onLabelClick}
          class="font-title text-sm tracking-[0.06em] text-text-muted uppercase"
          >${this.label}</label
        >
        <slot @slotchange=${this.link}></slot>
      </div>
    `;
  }
}

function hasOwnName(el: LabelableControl): boolean {
  if ("accessibleLabel" in el) return !!el.accessibleLabel;
  return el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby");
}

function setName(el: LabelableControl, name: string | undefined): void {
  if ("accessibleLabel" in el) el.accessibleLabel = name;
  else if (name) el.setAttribute("aria-label", name);
  else el.removeAttribute("aria-label");
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-field": ThemeField;
  }
}
