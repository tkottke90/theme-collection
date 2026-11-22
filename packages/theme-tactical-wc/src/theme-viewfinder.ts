import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { computeViewfinderFrame } from "./viewfinder-geometry.js";
import { renderViewfinderFrame } from "./viewfinder-frame-svg.js";

/**
 * A generic bordered panel, like `theme-card`, but with the "viewfinder"
 * two-layer border: an outer outline with a raised top tab and inward
 * side/bottom notches, plus four identical, symmetrical corner-bracket
 * accents inset from the edge.
 */
@customElement("theme-viewfinder")
export class ThemeViewfinder extends LitElement {
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

  private frame = new ResizeFrameController(this, computeViewfinderFrame);

  render() {
    return html`
      ${renderViewfinderFrame(this.frame.geometry)}
      <div class="relative px-10 py-9 font-sans text-text">
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
    "theme-viewfinder": ThemeViewfinder;
  }
}
