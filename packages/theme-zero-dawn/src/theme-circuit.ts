import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Old-world circuit traces for the left half of a 400×240 field; mirrored for
 * the right half so the whole backdrop is symmetric. Right-angle runs with
 * rounded elbows, each ending in a terminal ring.
 */
const TRACES: Array<{ d: string; end: [number, number] }> = [
  { d: "M200 30 H150 Q140 30 140 40 V70 Q140 80 130 80 H62", end: [56, 80] },
  { d: "M200 50 H166 Q158 50 158 58 V100 Q158 108 150 108 H22", end: [16, 108] },
  { d: "M200 120 H120 Q110 120 110 130 V148", end: [110, 154] },
  { d: "M200 190 H160 Q150 190 150 180 V142 Q150 132 140 132 H82", end: [76, 132] },
  { d: "M200 212 H132 Q122 212 122 202 V188 Q122 180 114 180 H42", end: [36, 180] },
  { d: "M96 80 V42 Q96 30 84 30 H32", end: [26, 30] },
];

/** Central emblem: a stacked-chevron tower, drawn once on the axis. */
const EMBLEM =
  "M170 168 L200 138 L230 168 M180 186 L200 166 L220 186 M200 92 L212 104 L200 116 L188 104 Z";

/**
 * Hero / empty-state backdrop: a faint symmetric circuit-trace field behind
 * slotted content. `glow` lights the traces in machine cyan.
 */
@customElement("theme-circuit")
export class ThemeCircuit extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        min-height: var(--zd-circuit-min-height, 240px);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) glow = false;

  private renderHalf() {
    return TRACES.map(
      (t) => svg`
        <path d=${t.d} />
        <circle cx=${t.end[0]} cy=${t.end[1]} r="4" />
      `,
    );
  }

  render() {
    const stroke = this.glow ? "var(--color-brand-500)" : "var(--color-plate-100)";
    const opacity = this.glow ? 0.45 : 0.16;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="zd-circuit-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          fill="none"
          stroke=${stroke}
          stroke-opacity=${opacity}
          stroke-width="2"
          stroke-linecap="round"
          filter=${this.glow ? "url(#zd-circuit-glow)" : ""}
        >
          <g class="half">${this.renderHalf()}</g>
          <g class="half" transform="translate(400 0) scale(-1 1)">${this.renderHalf()}</g>
          <path d=${EMBLEM} stroke-width="3" />
        </g>
      </svg>
      <div
        class="relative flex min-h-[inherit] flex-col items-center justify-center px-6 py-10 text-center"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-circuit": ThemeCircuit;
  }
}
