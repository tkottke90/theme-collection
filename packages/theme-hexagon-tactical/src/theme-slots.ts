import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-slots")
export class ThemeSlots extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .slots {
        display: flex;
        gap: 5px;
      }
      .slots i {
        width: 12px;
        height: 28px;
        border: 2px solid var(--color-border-hi);
        transform: skewX(-22deg);
        background: var(--color-void);
      }
      .slots i.on {
        background: var(--color-brand-500);
        border-color: var(--color-brand-400);
        box-shadow: 0 0 6px rgb(163 206 66 / 0.5);
      }
      .slots i.hot {
        background: var(--color-danger-500);
        border-color: var(--color-danger-500);
        box-shadow: 0 0 6px rgb(224 87 60 / 0.5);
      }
    `,
  ];

  /** Total number of slots in the track. */
  @property({ type: Number }) total = 6;
  /** How many of the leading slots are lit lime ("on"). */
  @property({ type: Number }) on = 0;
  /** How many slots after the lit ones are lit red ("hot"). */
  @property({ type: Number }) hot = 0;
  @property({ type: String }) label = "";

  render() {
    const slots = Array.from({ length: this.total }, (_, i) => {
      if (i < this.on) return "on";
      if (i < this.on + this.hot) return "hot";
      return "";
    });
    return html`<span
      class="slots"
      role="meter"
      aria-label=${this.label}
      aria-valuenow=${this.on + this.hot}
      aria-valuemax=${this.total}
    >
      ${slots.map((state) => html`<i class=${state}></i>`)}
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-slots": ThemeSlots;
  }
}
