import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { themeFrame, frameClipPath } from "./theme-frame.js";

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  render() {
    return html`
      <div
        class="relative bg-surface text-text border border-border px-5 py-4 font-sans"
        style="clip-path: ${frameClipPath()}"
      >
        ${themeFrame()}
        <div class="relative">
          ${
            this.heading
              ? html`<h2
                  class="text-brand-500 mb-2 text-sm font-semibold tracking-widest uppercase"
                >
                  ${this.heading}
                </h2>`
              : null
          }
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-card": ThemeCard;
  }
}
