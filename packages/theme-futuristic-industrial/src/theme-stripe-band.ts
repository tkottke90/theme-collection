import { LitElement, css, html, svg, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { computeStripeBand } from "./stripe-band-geometry.js";

/**
 * A decorative band for a footer or the end of a section, from the reference
 * sheet: a solid orange block that breaks into evenly spaced stripes, inside a
 * thin outline with a slanted end. Fills its width at `size` px tall.
 */
@customElement("theme-stripe-band")
export class ThemeStripeBand extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  /** Band height, px. */
  @property({ type: Number }) size = 24;
  /** Fraction of the length taken by the solid block, 0–1. */
  @property({ type: Number }) solid = 0.34;

  private frame = new ResizeFrameController(this, (w, h) => computeStripeBand(w, h, this.solid));

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has("solid")) this.frame.measure();
  }

  render() {
    const g = this.frame.geometry;
    return html`<svg
      class="block w-full"
      style="height:${this.size}px"
      viewBox=${g?.viewBox ?? "0 0 1 1"}
      aria-hidden="true"
    >
      ${svg`
        <path d=${g?.fillD ?? ""} fill="var(--color-brand-500)" />
        <path d=${g?.outlineD ?? ""} fill="none" stroke="var(--color-neutral-900)" stroke-width="1" />
      `}
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-stripe-band": ThemeStripeBand;
  }
}
