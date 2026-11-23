import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { PlateFrameController } from "./plate-frame-controller.js";
import { renderPlateFrame } from "./plate-frame-svg.js";

/**
 * Bonus component: a stencilled ID/code readout — e.g. "CODE-13-V-2-44",
 * "MOD:X5C" — matching the reference sheet's mono-font serial tags. Chamfers
 * the opposite pair of corners from `theme-card` (top-right/bottom-left) so
 * the two plate-based components read as distinct border styles.
 */
@customElement("theme-plate")
export class ThemePlate extends LitElement {
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

  @property({ type: String }) label = "";
  @property({ type: String }) value = "";

  private frame = new PlateFrameController(this, {
    cut: 12,
    cutCorners: ["tr", "bl"],
    stripeCorner: "bl",
    stripeWidth: 8,
  });

  render() {
    return html`
      ${renderPlateFrame(this.frame.geometry)}
      <div class="relative px-6 py-4 font-sans">
        <p class="text-neutral-500 m-0 text-xs font-semibold tracking-[0.2em] uppercase">
          ${this.label}
        </p>
        <p class="text-neutral-900 font-mono m-0 mt-1 text-xl leading-none tracking-wider">
          ${this.value}
        </p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-plate": ThemePlate;
  }
}
