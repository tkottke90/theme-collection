import { LitElement, css, html, svg } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { computeBracketRail } from "./bracket-rail-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/**
 * A one-sided accent for a sidebar, nav group or callout: an outlined orange
 * rail down the left edge with a "√" foot, from the reference sheet's left-edge
 * rail. Content sits to its right; the rail runs the full height.
 */
@customElement("theme-bracket-rail")
export class ThemeBracketRail extends LitElement {
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

  private frame = new ResizeFrameController(this, (w, h) => computeBracketRail(w, h));

  render() {
    const g = this.frame.geometry;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full"
        viewBox=${g?.viewBox ?? "0 0 1 1"}
        aria-hidden="true"
      >
        ${svg`<path
          d=${g?.d ?? ""}
          fill="var(--color-brand-500)"
          stroke="var(--color-neutral-900)"
          stroke-width="1.5"
          stroke-linejoin="round"
        />`}
      </svg>
      <div class="relative pl-10 py-1 font-sans text-fg"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-bracket-rail": ThemeBracketRail;
  }
}
