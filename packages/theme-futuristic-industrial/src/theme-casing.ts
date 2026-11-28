import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { computeCasing } from "./casing-geometry.js";
import { renderCasing } from "./casing-svg.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { darkSurface } from "./surfaces.js";

/**
 * The theme's dark surface, from the reference sheet's mechanical-arm body: a
 * charcoal panel with a thin inset rule, corner rivets, and a hazard-tape strip
 * along the bottom. Slotted theme text, headings, links, items and field
 * labels switch to light colors inside it; light panels (Card, Detail, ...)
 * placed inside keep their own dark-on-light text.
 */
@customElement("theme-casing")
export class ThemeCasing extends LitElement {
  static styles = [
    themeStyles,
    darkSurface,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  private frame = new ResizeFrameController(this, computeCasing);

  render() {
    return html`
      ${renderCasing(this.frame.geometry)}
      <div class="relative px-7 pt-6 pb-12 font-sans text-fg">
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
    "theme-casing": ThemeCasing;
  }
}
