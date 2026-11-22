import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { themeFrame, frameClipPath } from "./theme-frame.js";

/** Large numeric readout panel, e.g. "SYSTEM STATUS 1565". */
@customElement("theme-stat")
export class ThemeStat extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: String }) value = "";
  @property({ type: String }) unit = "";

  render() {
    return html`
      <div
        class="relative bg-surface border border-border px-5 py-4"
        style="clip-path: ${frameClipPath()}"
      >
        ${themeFrame()}
        <div class="relative font-sans">
          <p class="text-text-muted m-0 text-xs font-semibold tracking-[0.2em] uppercase">
            ${this.label}
          </p>
          <p class="text-brand-500 font-mono m-0 mt-1 text-3xl leading-none">
            ${this.value}${
              this.unit
                ? html`<span class="text-text-muted ml-1 text-base">${this.unit}</span>`
                : null
            }
          </p>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-stat": ThemeStat;
  }
}
