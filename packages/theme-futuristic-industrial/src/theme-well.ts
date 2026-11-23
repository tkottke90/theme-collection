import { LitElement, css, html, svg } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { computeWell } from "./well-geometry.js";

/**
 * A recessed, double-ruled frame for an icon button or a small group of
 * controls, from the arrow compartments on the reference sheet's top-right
 * panel. Sizes to its content; lays children out in a row.
 */
@customElement("theme-well")
export class ThemeWell extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
        isolation: isolate;
        vertical-align: middle;
      }
    `,
  ];

  private frame = new ResizeFrameController(this, computeWell);

  render() {
    const g = this.frame.geometry;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full"
        viewBox=${g?.viewBox ?? "0 0 1 1"}
        aria-hidden="true"
      >
        ${svg`
          <path d=${g?.outerD ?? ""} fill="none" stroke="var(--color-fg)" stroke-width="1.5" />
          <path d=${g?.innerD ?? ""} fill="none" stroke="var(--color-fg)" stroke-width="1" />
        `}
      </svg>
      <div class="relative flex items-center gap-2 p-3"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-well": ThemeWell;
  }
}
