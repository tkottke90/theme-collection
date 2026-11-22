import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** A pressed-in parchment track with a grainy green fill — e.g. "Overall progress". */
@customElement("theme-progress")
export class ThemeProgress extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .track {
        height: 12px;
        border-radius: 7px;
        background: var(--paper-edge-2);
        box-shadow:
          inset 0 1px 2px rgba(80, 50, 20, 0.35),
          0 0 0 1px var(--card-line);
        overflow: hidden;
      }
      .fill {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--grain), linear-gradient(180deg, #86a660, #4f6e34);
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;

  render() {
    const pct = Math.min(100, Math.max(0, (this.value / this.max) * 100));

    return html`
      <div
        class="font-title grid grid-cols-[auto_1fr_auto] items-center gap-3 text-[13px] tracking-wide"
      >
        ${this.label ? html`<span class="text-text-muted">${this.label}</span>` : null}
        <div
          class="track"
          role="progressbar"
          aria-valuenow=${this.value}
          aria-valuemin="0"
          aria-valuemax=${this.max}
        >
          <span class="fill" style="width:${pct}%"></span>
        </div>
        <span class="text-text-muted">${Math.round(pct)}%</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-progress": ThemeProgress;
  }
}
