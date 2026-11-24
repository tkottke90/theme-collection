import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { renderRaised, renderRecessed } from "./progress-variants.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/**
 * - `raised`: a bevelled steel plate with the channel cut into it. Pairs with
 *   dark steel containers.
 * - `recessed`: the channel cut straight into the surface, glowing from
 *   inside. Pairs with light plates (Card).
 *
 * Always the consumer's explicit choice: the bar deliberately doesn't infer
 * a variant from the surface it's placed on.
 */
export type ProgressVariant = "raised" | "recessed";

/** Used until the host has been measured (and in jsdom, which can't measure). */
const FALLBACK_WIDTH = 240;

/**
 * Progress bar: a glowing channel split into `segments` by seam ticks.
 * Stretches to its container's width. `variant` picks raised or recessed.
 *
 * @cssprop --zd-progress-fill - Colour of the fill, its glow, leading edge and
 *   (recessed) wall tint. Defaults to the theme's machine cyan. Choose one with
 *   at least 3:1 contrast against the empty channel (`--color-core-deep`).
 */
@customElement("theme-progress")
export class ThemeProgress extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        /*
         * The bar's light. Override --zd-progress-fill on the element to
         * recolour one bar; everything lit derives from it. Unset, it is the
         * theme's machine cyan.
         */
        --zd-progress-light: var(--zd-progress-fill, var(--color-brand-500));
      }
      .fill {
        fill: var(--zd-progress-light);
      }
      /* The leading edge: the fill lifted most of the way to paint-white. */
      .edge {
        fill: color-mix(in srgb, var(--zd-progress-light) 35%, var(--color-paint));
      }
      /* Recessed only: the glow tinting the slot's walls. */
      .spill {
        fill: var(--zd-progress-light);
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) segments = 10;
  @property({ type: String }) label = "";
  @property({ type: String, reflect: true }) variant: ProgressVariant = "raised";

  /** Host width in px. */
  private size = new ResizeFrameController<number>(this, (w) => (w > 0 ? w : null));

  render() {
    const segments = Math.max(1, Math.round(this.segments));
    const max = this.max > 0 ? this.max : 100;
    const pct = Math.min(1, Math.max(0, this.value / max));
    const w = this.size.geometry ?? FALLBACK_WIDTH;
    const face =
      this.variant === "recessed"
        ? renderRecessed(w, pct, segments)
        : renderRaised(w, pct, segments);

    return html`<div class="flex w-full flex-col gap-2 font-sans">
      ${
        this.label
          ? html`<div
              class="flex justify-between text-xs font-semibold tracking-[0.14em] text-[var(--zd-ink,var(--color-text))] uppercase"
            >
              <span>${this.label}</span
              ><span class="text-[var(--zd-ink-muted,var(--color-text-muted))]"
                >${Math.round(pct * 100)}%</span
              >
            </div>`
          : null
      }
      <svg
        viewBox="0 0 ${w} ${face.height}"
        class="block w-full"
        height=${face.height}
        style="overflow: visible"
        role="progressbar"
        aria-label=${this.label || "Progress"}
        aria-valuemin="0"
        aria-valuemax=${max}
        aria-valuenow=${this.value}
      >
        <defs>
          <filter id="zd-progress-glow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        ${face.content}
      </svg>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-progress": ThemeProgress;
  }
}
