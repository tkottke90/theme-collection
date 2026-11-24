import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import {
  renderCells,
  renderChannel,
  renderPeaksBar,
  renderShards,
  shardsWidth,
} from "./plate-stack-variants.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/**
 * - `shards`: overlapping armour shards (the original, fixed width).
 * - `channel`: raised steel plate with a sunken, cyan-filled channel.
 * - `cells`: a row of small raised, bevelled plate blocks.
 * - `peaks`: the divider's painted sawtooth, filling with ochre.
 */
export type PlateStackVariant = "shards" | "channel" | "cells" | "peaks";

/** Used until the host has been measured (and in jsdom, which can't measure). */
const FALLBACK_WIDTH = 240;

/** Progress bar. `variant` picks the face — see `PlateStackVariant`. */
@customElement("theme-plate-stack")
export class ThemePlateStack extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) segments = 10;
  @property({ type: String }) label = "";
  @property({ type: String, reflect: true }) variant: PlateStackVariant = "shards";

  /** Host width in px, for the fluid faces. */
  private size = new ResizeFrameController<number>(this, (w) => (w > 0 ? w : null));

  render() {
    const segments = Math.max(1, Math.round(this.segments));
    const max = this.max > 0 ? this.max : 100;
    const pct = Math.min(1, Math.max(0, this.value / max));
    const fluid = this.variant !== "shards";
    const w = this.size.geometry ?? FALLBACK_WIDTH;

    const face =
      this.variant === "channel"
        ? renderChannel(w, pct, segments)
        : this.variant === "cells"
          ? renderCells(w, pct, segments)
          : this.variant === "peaks"
            ? renderPeaksBar(w, pct)
            : renderShards(pct, segments);
    const viewWidth = fluid ? w : shardsWidth(segments);

    return html`<div
      class="${fluid ? "flex w-full" : "inline-flex max-w-full"} flex-col gap-2 font-sans"
    >
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
        viewBox="0 0 ${viewWidth} ${face.height}"
        class=${fluid ? "block w-full" : "block h-12 w-auto max-w-full"}
        height=${fluid ? face.height : 48}
        style="overflow: visible"
        role="progressbar"
        aria-label=${this.label || "Progress"}
        aria-valuemin="0"
        aria-valuemax=${max}
        aria-valuenow=${this.value}
      >
        <defs>
          <filter id="zd-stack-glow" x="-200%" y="-200%" width="500%" height="500%">
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
    "theme-plate-stack": ThemePlateStack;
  }
}
