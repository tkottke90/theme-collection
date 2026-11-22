import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { HudFrameController } from "./hud-frame-controller.js";
import { renderHudFrame } from "./hud-frame-svg.js";

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  private frame = new HudFrameController(this);

  render() {
    return html`
      ${renderHudFrame(this.frame.geometry)}
      <div class="relative px-8 py-7 font-sans text-text">
        ${
          this.heading
            ? html`<h2 class="text-brand-500 mb-2 text-sm font-semibold tracking-widest uppercase">
                ${this.heading}
              </h2>`
            : null
        }
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-card": ThemeCard;
  }
}
