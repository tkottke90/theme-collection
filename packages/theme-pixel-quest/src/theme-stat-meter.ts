import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

// Still tiny — the bar is only 10px tall, so the corner radius has to stay
// small too — on a 1px grid.
const BAR_SHAPE = pixelFrameShapes(1, 1, 0, 2);
const BAR_SHAPE_STYLE = pixelFrameShapeStyle(BAR_SHAPE);

/**
 * Bonus component (beyond CONTRIBUTING.md's minimum set) — the source
 * image's single most-repeated widget: an icon, a label/sublabel pair, a
 * progress bar, and a "value / max" readout. Clearly domain-specific (a
 * gamified stat tracker), not a generic UI atom.
 *
 * The bar reuses the same pixel-frame technique at a smaller step (3px vs
 * the normal 6px — a 6px step would look oversized on a ~10px-tall bar),
 * with the frame's own fill standing in for the empty track and a plain
 * absolutely-positioned overlay for the filled portion. The overlay is a
 * plain rectangle rather than its own stepped shape — at this scale (its
 * own width is usually under the 3px step except at very low values) a
 * second nested notch wouldn't read as intentional, just blurry.
 *
 * The bar is a `role="meter"` named by `label`, so assistive technology
 * announces e.g. "Strength, meter, 7 of 10"; the visual "7/10" readout is
 * hidden from it to avoid reading the value twice.
 */
@customElement("theme-stat-meter")
export class ThemeStatMeter extends LitElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: var(--font-sans);
      }
      .icon {
        flex: 0 0 auto;
        width: 1.75rem;
        height: 1.75rem;
        display: grid;
        place-items: center;
        color: var(--color-text);
      }
      ::slotted(*) {
        width: 100%;
        height: 100%;
      }
      .labels {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .label {
        display: block;
        font-family: var(--font-slab);
        font-weight: 700;
        color: var(--color-text);
      }
      .sublabel {
        display: block;
        font-size: 0.8125rem;
        color: var(--color-text-muted);
      }
      .bar-wrap {
        flex: 1 1 140px;
        min-width: 80px;
      }
      .bar-wrap .pixel-frame {
        display: block;
        width: 100%;
      }
      .bar-wrap .pixel-frame:not(.badge) .pixel-frame__fill {
        position: relative;
        display: block;
        height: 10px;
        background-color: var(--color-progress-track);
        overflow: hidden;
      }
      .bar-fill {
        position: absolute;
        inset: 0;
        background-color: var(--color-progress-fill);
      }
      .value {
        flex: 0 0 auto;
        font-family: var(--font-slab);
        font-weight: 700;
        color: var(--color-text);
        font-variant-numeric: tabular-nums;
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: String }) sublabel = "";
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 10;

  render() {
    const pct = this.max > 0 ? Math.max(0, Math.min(100, (this.value / this.max) * 100)) : 0;
    return html`
      <span class="icon"><slot name="icon"></slot></span>
      <span class="labels">
        <span class="label">${this.label}</span>
        ${this.sublabel ? html`<span class="sublabel">${this.sublabel}</span>` : null}
      </span>
      <span
        class="bar-wrap"
        role="meter"
        aria-label=${ifDefined(this.label || undefined)}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${Math.max(0, Math.min(this.max, this.value))}
        aria-valuetext=${`${this.value} of ${this.max}`}
      >
        <span class="pixel-frame" style=${BAR_SHAPE_STYLE}>
          <span class="pixel-frame__fill">
            <span class="bar-fill" style="width: ${pct}%"></span>
          </span>
        </span>
      </span>
      <span class="value" aria-hidden="true">${this.value}/${this.max}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-stat-meter": ThemeStatMeter;
  }
}
