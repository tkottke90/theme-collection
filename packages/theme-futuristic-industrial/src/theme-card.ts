import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { lightSurface } from "./surfaces.js";
import { PlateFrameController } from "./plate-frame-controller.js";
import { renderPlateFrame } from "./plate-frame-svg.js";

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    lightSurface,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        filter: drop-shadow(var(--shadow-plate));
      }
    `,
  ];

  @property({ type: String }) heading = "";

  private frame = new PlateFrameController(this);

  render() {
    return html`
      ${renderPlateFrame(this.frame.geometry)}
      <div class="relative px-7 py-6 font-sans text-neutral-900">
        ${
          this.heading
            ? html`<h2 class="text-brand-700 mb-2 text-sm font-semibold tracking-widest uppercase">
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
