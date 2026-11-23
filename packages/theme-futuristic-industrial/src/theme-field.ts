import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** A slotted control that can take an accessible name: the theme's own inputs. */
interface NameableControl extends HTMLElement {
  accessibleLabel?: string;
}

const NATIVE_CONTROLS = new Set(["input", "select", "textarea"]);

/**
 * Pairs a label with the control slotted into it.
 *
 * The visible `<label>` lives in this element's shadow root, so a native
 * `for`/`id` link can't reach a control in the light DOM — the browser leaves
 * the label unattached and the control without a name. Instead the label text
 * is handed to the control as its accessible name (`accessible-label` on the
 * theme's inputs, `aria-label` on a native one that has no name of its own),
 * and clicking the label focuses the control.
 *
 * `for` picks the control by id when the field holds more than one; otherwise
 * the first slotted element is used.
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
  @property({ type: String }) for = "";

  private control(): NameableControl | undefined {
    const slot = this.renderRoot.querySelector("slot");
    const elements = (slot?.assignedElements({ flatten: true }) ?? []) as NameableControl[];
    return (this.for && elements.find((el) => el.id === this.for)) || elements[0];
  }

  private applyName(): void {
    const control = this.control();
    if (!control) return;
    const tag = control.localName;
    if (tag.includes("-") && !customElements.get(tag)) {
      // A custom control that hasn't upgraded yet has no accessibleLabel to set.
      void customElements.whenDefined(tag).then(() => this.applyName());
      return;
    }
    if ("accessibleLabel" in control) {
      control.accessibleLabel = this.label;
    } else if (NATIVE_CONTROLS.has(control.localName) && !control.hasAttribute("aria-label")) {
      control.setAttribute("aria-label", this.label);
    }
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has("label") || changed.has("for")) this.applyName();
  }

  private focusControl(): void {
    this.control()?.focus();
  }

  render() {
    return html`
      <div class="field font-sans flex flex-col gap-1.5">
        <label
          class="font-semibold text-fg text-sm tracking-wide uppercase"
          @click=${this.focusControl}
          >${this.label}</label
        >
        <slot @slotchange=${this.applyName}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-field": ThemeField;
  }
}
