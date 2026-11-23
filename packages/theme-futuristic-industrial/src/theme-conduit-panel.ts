import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { computeConduit } from "./conduit-geometry.js";
import { HAZARD_SKEW_DEG } from "./hazard-frame-geometry.js";
import { hazardPattern } from "./hazard-frame-svg.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { lightSurface } from "./surfaces.js";

/**
 * A thin double-ruled panel with rounded bevels, screw holes, and a striped
 * channel across the top-right corner, from the reference sheet's conduit
 * panel. Lighter than Card; suited to control groups and readouts.
 */
@customElement("theme-conduit-panel")
export class ThemeConduitPanel extends LitElement {
  static styles = [
    themeStyles,
    lightSurface,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  private frame = new ResizeFrameController(this, computeConduit);

  render() {
    const g = this.frame.geometry;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full"
        viewBox=${g?.viewBox ?? "0 0 1 1"}
        aria-hidden="true"
      >
        ${svg`
          <defs>${hazardPattern("conduit-hazard", 9, 4.5, "var(--color-brand-500)", -HAZARD_SKEW_DEG)}</defs>
          <path d=${g?.outerD ?? ""} fill="var(--color-neutral-50)" stroke="var(--color-neutral-900)" stroke-width="2" />
          <path d=${g?.innerD ?? ""} fill="none" stroke="var(--color-neutral-900)" stroke-width="1" />
          ${
            g?.channelD
              ? svg`<path d=${g.channelD} fill="url(#conduit-hazard)" stroke="var(--color-neutral-900)" stroke-width="1" />`
              : null
          }
          ${(g?.screws ?? []).map(
            (s) =>
              svg`<circle cx=${s.cx} cy=${s.cy} r="3.5" fill="var(--color-neutral-50)" stroke="var(--color-neutral-900)" stroke-width="1.5" />`,
          )}
        `}
      </svg>
      <div class="relative px-7 pt-7 pb-9 font-sans text-fg">
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
    "theme-conduit-panel": ThemeConduitPanel;
  }
}
