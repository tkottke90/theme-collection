import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";
import { discVariantStyles, renderDish, renderPeaks, renderSegments } from "./disc-variants.js";

/**
 * - `dish`: faceted raised dish with panels and a cyan rim arc.
 * - `segments`: ring of light-shaded plate segments round a dark core.
 * - `peaks`: ring of brush-painted triangles round a painted medallion.
 */
export type DiscVariant = "dish" | "segments" | "peaks";

const FACES: Record<DiscVariant, (pct: number | null) => unknown> = {
  dish: renderDish,
  segments: renderSegments,
  peaks: renderPeaks,
};

/**
 * Radial progress. With a `value` it's a gauge (`role=meter`); without one
 * it's an indeterminate spinner (`role=progressbar`). `variant` picks the
 * face — see `DiscVariant`. In every face the structure stays still and only
 * the light (cyan arc, pulse, painted run) moves.
 */
@customElement("theme-disc")
export class ThemeDisc extends LitElement {
  static styles = [
    themeStyles,
    discVariantStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  /** 0–max; leave unset for the indeterminate spinner. */
  @property({ type: Number }) value?: number;
  @property({ type: Number }) max = 100;
  @property({ type: String }) label = "";
  @property({ type: Number }) size = 128;
  @property({ type: String, reflect: true }) variant: DiscVariant = "dish";

  render() {
    const determinate = typeof this.value === "number" && !Number.isNaN(this.value);
    const max = this.max > 0 ? this.max : 100;
    const pct = determinate ? Math.min(1, Math.max(0, (this.value as number) / max)) : null;
    const ariaLabel = this.label || (determinate ? "Gauge" : "Loading");
    const face = FACES[this.variant] ?? FACES.dish;

    return html`<div
      class="inline-flex flex-col items-center gap-2 font-sans"
      role=${determinate ? "meter" : "progressbar"}
      aria-label=${ariaLabel}
      aria-valuemin=${ifDefined(determinate ? 0 : undefined)}
      aria-valuemax=${ifDefined(determinate ? max : undefined)}
      aria-valuenow=${ifDefined(determinate ? this.value : undefined)}
    >
      <svg
        viewBox="0 0 124 124"
        width=${this.size}
        height=${this.size}
        style="overflow: visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="zd-disc-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        ${face(pct)}
      </svg>
      ${
        pct !== null && this.variant !== "segments"
          ? html`<span class="text-sm font-semibold tracking-[0.12em] text-text uppercase"
              >${Math.round(pct * 100)}%${this.label ? html` · ${this.label}` : null}</span
            >`
          : this.label
            ? html`<span class="text-xs tracking-[0.12em] text-text-muted uppercase"
                >${this.label}</span
              >`
            : null
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-disc": ThemeDisc;
  }
}
