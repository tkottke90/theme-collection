import { LitElement, css, html, svg } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { computeGirder } from "./girder-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/**
 * A decorative truss band — header strip, section break, or the edge of a
 * panel — from the reference sheet's dark girder bar. Fills its width; set its
 * height with CSS (`theme-girder { height: 48px }`), default 36px. The
 * openings let whatever is behind it show through.
 */
@customElement("theme-girder")
export class ThemeGirder extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        height: 36px;
      }
    `,
  ];

  private frame = new ResizeFrameController(this, computeGirder);

  render() {
    const g = this.frame.geometry;
    return html`<svg
      class="block h-full w-full"
      viewBox=${g?.viewBox ?? "0 0 1 1"}
      aria-hidden="true"
    >
      ${svg`<path d=${g?.d ?? ""} fill="var(--color-neutral-900)" fill-rule="evenodd" />`}
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-girder": ThemeGirder;
  }
}
