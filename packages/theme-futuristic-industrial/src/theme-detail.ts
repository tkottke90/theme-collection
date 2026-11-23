import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { lightSurface } from "./surfaces.js";

@customElement("theme-detail")
export class ThemeDetail extends LitElement {
  static styles = [
    themeStyles,
    lightSurface,
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
        class="group font-sans rounded-theme border border-neutral-300 bg-neutral-50 text-neutral-900 px-4 py-3"
      >
        <summary
          class="flex items-center gap-2 font-semibold cursor-pointer text-brand-700 list-none [&::-webkit-details-marker]:hidden before:content-['▸'] before:inline-block before:transition-transform group-open:before:rotate-90"
        >
          ${this.summary}
        </summary>
        <div class="pt-2"><slot></slot></div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-detail": ThemeDetail;
  }
}
