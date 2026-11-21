import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

@customElement("theme-input")
export class ThemeInput extends LitElement {
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

  render() {
    const isBoxType = this.type === "checkbox" || this.type === "radio";
    const classes = isBoxType
      ? "accent-brand-500"
      : "rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1";

    return html`<input
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
