import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-textarea")
export class ThemeTextarea extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  @property({ type: Number }) rows = 4;
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";

  render() {
    return html`<textarea
      rows=${this.rows}
      .value=${this.value}
      placeholder=${this.placeholder}
      class="rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    ></textarea>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-textarea": ThemeTextarea;
  }
}
