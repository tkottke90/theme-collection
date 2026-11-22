import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** Segmented linear bar meter, e.g. the tick-marked bars in HUD telemetry panels. */
@customElement("theme-progress")
export class ThemeProgress extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;

  render() {
    const pct = Math.min(100, Math.max(0, (this.value / this.max) * 100));

    return html`
      <div class="font-sans">
        ${
          this.label
            ? html`<p
                class="text-text-muted m-0 mb-1.5 text-xs font-semibold tracking-[0.2em] uppercase"
              >
                ${this.label}
              </p>`
            : null
        }
        <div
          role="progressbar"
          aria-valuenow=${this.value}
          aria-valuemin="0"
          aria-valuemax=${this.max}
          class="rounded-theme border-border bg-surface-alt relative h-3 w-full overflow-hidden border"
        >
          <div
            class="shadow-glow bg-brand-500 h-full bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(6%-2px),var(--color-surface-alt)_calc(6%-2px),var(--color-surface-alt)_6%)] transition-[width]"
            style="width:${pct}%"
          ></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-progress": ThemeProgress;
  }
}
