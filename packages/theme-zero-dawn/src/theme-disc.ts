import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";

const C = 60;
const TRACK_R = 50;
const CIRCUMFERENCE = 2 * Math.PI * TRACK_R;
const SPOKES = 5;

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

/**
 * Segmented radial disc — a plated dish with spokes, inset panels and a dark
 * core hub. With a `value` it's a gauge (cyan arc on the rim, `role=meter`);
 * without one it's an indeterminate spinner (`role=progressbar`).
 */
@customElement("theme-disc")
export class ThemeDisc extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .spin {
        transform-origin: 60px 60px;
        animation: zd-disc-spin 2.4s linear infinite;
      }
      @keyframes zd-disc-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .spin {
          animation: none;
        }
      }
    `,
  ];

  /** 0–max; leave unset for the indeterminate spinner. */
  @property({ type: Number }) value?: number;
  @property({ type: Number }) max = 100;
  @property({ type: String }) label = "";
  @property({ type: Number }) size = 128;

  private renderDish() {
    const spokes = Array.from({ length: SPOKES }, (_, i) => {
      const deg = (360 / SPOKES) * i;
      const [x1, y1] = polar(19, deg);
      const [x2, y2] = polar(55, deg);
      const panelDeg = deg + 360 / SPOKES / 2;
      const [px, py] = polar(37, panelDeg);
      return svg`
        <line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--color-plate-300)" stroke-width="1.5" />
        <rect
          x=${px - 7}
          y=${py - 4}
          width="14"
          height="8"
          transform="rotate(${panelDeg} ${px} ${py})"
          fill="var(--color-plate-300)"
          stroke="var(--color-core)"
          stroke-opacity="0.5"
        />
      `;
    });
    return svg`
      <circle cx=${C + 3} cy=${C + 4} r="56" fill="var(--color-core-deep)" />
      <circle cx=${C} cy=${C} r="56" fill="url(#zd-dish)" />
      ${spokes}
      <circle cx=${C} cy=${C} r="22" fill="none" stroke="var(--color-wire)" stroke-width="3" stroke-dasharray="20 9" />
      <circle cx=${C} cy=${C} r="18" fill="var(--color-core)" />
      <circle cx=${C} cy=${C} r="7" fill="var(--color-brand-500)" filter="url(#zd-disc-glow)" />
    `;
  }

  render() {
    const determinate = typeof this.value === "number" && !Number.isNaN(this.value);
    const max = this.max > 0 ? this.max : 100;
    const pct = determinate ? Math.min(1, Math.max(0, (this.value as number) / max)) : 0.25;
    const offset = CIRCUMFERENCE * (1 - pct);
    const ariaLabel = this.label || (determinate ? "Gauge" : "Loading");

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
          <radialGradient id="zd-dish" cx="0.4" cy="0.35" r="0.75">
            <stop offset="0" style="stop-color: var(--color-plate-50)" />
            <stop offset="1" style="stop-color: var(--color-plate-100)" />
          </radialGradient>
          <filter id="zd-disc-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g class=${determinate ? "" : "spin"}>${this.renderDish()}</g>
        <circle
          cx=${C}
          cy=${C}
          r=${TRACK_R}
          fill="none"
          stroke="var(--color-core)"
          stroke-opacity="0.35"
          stroke-width="4"
        />
        <g class=${determinate ? "" : "spin"}>
          <circle
            class="arc"
            cx=${C}
            cy=${C}
            r=${TRACK_R}
            fill="none"
            stroke="var(--color-brand-500)"
            stroke-width="4"
            stroke-dasharray=${CIRCUMFERENCE}
            stroke-dashoffset=${offset}
            transform="rotate(-90 ${C} ${C})"
            filter="url(#zd-disc-glow)"
          />
        </g>
      </svg>
      ${
        determinate
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
