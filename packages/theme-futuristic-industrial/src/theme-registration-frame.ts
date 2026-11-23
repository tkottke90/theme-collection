import { LitElement, css, html, svg } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { computeRegistration, TICK } from "./registration-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/**
 * A light frame for images, media or a "target" panel, from the reference
 * sheet's crosshair square: chamfered corner brackets with registration ticks
 * at each edge's midpoint. The ticks poke out past the frame, so the host
 * keeps a matching margin.
 */
@customElement("theme-registration-frame")
export class ThemeRegistrationFrame extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        margin: ${TICK}px;
      }
    `,
  ];

  private frame = new ResizeFrameController(this, computeRegistration);

  render() {
    const g = this.frame.geometry;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full overflow-visible"
        viewBox=${g?.viewBox ?? "0 0 1 1"}
        aria-hidden="true"
      >
        ${svg`
          <path d=${g?.bracketsD ?? ""} fill="none" stroke="var(--color-fg)" stroke-width="2" stroke-linejoin="miter" />
          <path d=${g?.ticksD ?? ""} fill="none" stroke="var(--color-fg)" stroke-width="1.5" />
        `}
      </svg>
      <div class="relative px-6 py-5 font-sans text-fg"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-registration-frame": ThemeRegistrationFrame;
  }
}
