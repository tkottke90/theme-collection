import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

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

  render() {
    return html`
      <div class="field font-sans flex flex-col gap-1.5">
        <label for=${this.for} class="font-semibold text-fg text-sm tracking-wide uppercase"
          >${this.label}</label
        >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-field": ThemeField;
  }
}
