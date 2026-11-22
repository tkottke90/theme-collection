import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular radar-style dial gauge, the most SVG-dependent of the data-display set. */
@customElement("theme-gauge")
export class ThemeGauge extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;

  render() {
    const pct = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    const offset = CIRCUMFERENCE * (1 - pct / 100);

    return html`
      <div
        class="relative h-32 w-32 font-sans"
        role="meter"
        aria-valuenow=${this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-label=${this.label || "gauge"}
      >
        <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r=${RADIUS}
            fill="none"
            stroke="var(--color-border)"
            stroke-width="8"
          />
          <circle
            cx="50"
            cy="50"
            r=${RADIUS}
            fill="none"
            stroke="var(--color-brand-500)"
            stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray=${CIRCUMFERENCE}
            stroke-dashoffset=${offset}
            style="filter: drop-shadow(0 0 4px var(--color-brand-500)); transition: stroke-dashoffset 0.3s ease"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-brand-500 font-mono text-xl leading-none"
            >${Math.round(this.value)}</span
          >
          ${
            this.label
              ? html`<span
                  class="text-text-muted mt-1 text-[0.625rem] font-semibold tracking-[0.15em] uppercase"
                  >${this.label}</span
                >`
              : null
          }
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-gauge": ThemeGauge;
  }
}
