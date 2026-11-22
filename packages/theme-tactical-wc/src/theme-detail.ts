import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-detail")
export class ThemeDetail extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) summary = "";

  render() {
    return html`
      <details
        class="font-sans rounded-theme border border-border bg-surface-alt text-text px-4 py-3"
      >
        <summary class="font-semibold cursor-pointer text-brand-500">${this.summary}</summary>
        <slot></slot>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-detail": ThemeDetail;
  }
}
