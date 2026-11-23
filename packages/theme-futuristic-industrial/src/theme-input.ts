import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

@customElement("theme-input")
export class ThemeInput extends LitElement {
  /** Focusing the element focuses the inner control (used by `theme-field`'s label). */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
    `,
  ];

  @property({ type: String }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  /**
   * Accessible name, forwarded to the inner control. `theme-field` sets this
   * from its label, since a label outside this shadow root can't reach it.
   */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel?: string;

  render() {
    const isBoxType = this.type === "checkbox" || this.type === "radio";
    const classes = isBoxType
      ? "accent-brand-500"
      : "rounded-theme border border-neutral-300 bg-neutral-50 px-3 py-2 [font:inherit] text-neutral-900 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";

    return html`<input
      aria-label=${ifDefined(this.accessibleLabel)}
      type=${this.type}
      .value=${this.value}
      placeholder=${this.placeholder}
      class=${classes}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-input": ThemeInput;
  }
}
