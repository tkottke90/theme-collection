import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** One tapered, back-swept armour shard (like a neck plate), 30×46 box. */
const SHARD = "M2 44 Q5 16 26 2 L30 6 Q17 21 15 46 Z";
const STEP = 20;

/**
 * Progress as a row of overlapping armour shards: lit plates (sunlit shell
 * with a cyan leading edge) up to the current value, dark steel after it.
 */
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

  render() {
    const segments = Math.max(1, Math.round(this.segments));
    const max = this.max > 0 ? this.max : 100;
    const pct = Math.min(1, Math.max(0, this.value / max));
    const lit = Math.round(pct * segments);
    const width = (segments - 1) * STEP + 34;

    const shards = Array.from({ length: segments }, (_, i) => {
      const on = i < lit;
      return svg`
        <g transform="translate(${i * STEP} 0)" class=${on ? "shard on" : "shard"}>
          <path d=${SHARD} transform="translate(2 3)" fill="var(--color-core-deep)" />
          <path
            d=${SHARD}
            fill=${on ? "var(--color-plate-100)" : "var(--color-plate-700)"}
            stroke=${on ? "var(--color-plate-50)" : "var(--color-plate-500)"}
            stroke-width="1"
          />
          ${
            on
              ? svg`<path d="M26 2 L30 6" stroke="var(--color-brand-500)" stroke-width="2.5" filter="url(#zd-stack-glow)" />`
              : null
          }
        </g>
      `;
    });

    return html`<div class="inline-flex max-w-full flex-col gap-2 font-sans">
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
        viewBox="0 0 ${width} 50"
        class="block h-12 w-auto max-w-full"
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
        ${shards}
      </svg>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-plate-stack": ThemePlateStack;
  }
}
