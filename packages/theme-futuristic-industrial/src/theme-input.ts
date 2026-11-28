import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlElement } from "./generated/core/form-control.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

const TEXT_CLASSES =
  "rounded-theme border border-neutral-300 bg-neutral-50 px-3 py-2 [font:inherit] text-neutral-900 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";
const BOX_CLASSES = "accent-brand-500";

/**
 * A native `<input>` in a form-associated host (see `FormControlElement`):
 * it submits under `name`, resets with its form and forwards its accessible
 * name to the inner input.
 */
@customElement("theme-input")
export class ThemeInput extends FormControlElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
      :host([disabled]),
      :host([data-disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  /** Checked state, for `type="checkbox"` and `type="radio"`. */
  @property({ type: Boolean }) checked = false;

  private defaultValue = "";
  private defaultChecked = false;

  private get isBox(): boolean {
    return this.type === "checkbox" || this.type === "radio";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.defaultValue = this.getAttribute("value") ?? "";
    this.defaultChecked = this.hasAttribute("checked");
    this.addEventListener("click", this.onHostClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.onHostClick);
  }

  protected formValue(): string | null {
    if (this.isBox) return this.checked ? this.value || "on" : null;
    return this.value;
  }

  protected restoreDefault(): void {
    this.value = this.defaultValue;
    this.checked = this.defaultChecked;
  }

  /**
   * A label activating this control clicks the host, not the native box
   * inside it; pass that click on so the label toggles the box. Clicks that
   * started inside (on the box itself) are left alone.
   */
  private onHostClick = (e: MouseEvent): void => {
    if (!this.isBox || this.isDisabled || e.composedPath()[0] !== this) return;
    this.renderRoot.querySelector("input")?.click();
  };

  /**
   * Each radio lives in its own shadow root, so native `name` grouping can't
   * reach its siblings: uncheck same-named `theme-input` radios by hand.
   */
  private onBoxChange(e: Event): void {
    this.checked = (e.target as HTMLInputElement).checked;
    if (this.type === "radio" && this.checked && this.name) {
      const root = this.getRootNode() as Document | ShadowRoot;
      root.querySelectorAll<ThemeInput>(`theme-input[type="radio"]`).forEach((other) => {
        if (other !== this && other.name === this.name) other.checked = false;
      });
    }
    this.emitChange();
  }

  private onTextInput(e: Event): void {
    this.value = (e.target as HTMLInputElement).value;
  }

  render() {
    if (this.isBox) {
      return html`<input
        type=${this.type}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.isDisabled}
        aria-label=${ifDefined(this.accessibleName)}
        @change=${this.onBoxChange}
        class=${BOX_CLASSES}
      />`;
    }

    return html`<input
      type=${this.type}
      .value=${this.value}
      placeholder=${this.placeholder}
      ?disabled=${this.isDisabled}
      aria-label=${ifDefined(this.accessibleName)}
      @input=${this.onTextInput}
      @change=${this.emitChange}
      class=${TEXT_CLASSES}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-input": ThemeInput;
  }
}
