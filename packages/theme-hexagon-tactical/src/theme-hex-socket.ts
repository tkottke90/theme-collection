import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-hex-socket")
export class ThemeHexSocket extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        --w: 88px;
        --h: calc(var(--w) * 0.866);
        position: absolute;
        left: calc(var(--q, 0) * 0.75 * var(--w));
        top: calc((var(--r, 0) + var(--q, 0) * 0.5) * var(--h));
        width: var(--w);
        height: var(--h);
        display: block;
      }
      .hex {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        padding: 0;
        border: 0;
        background: none;
        color: var(--color-text);
        font: inherit;
        cursor: pointer;
        isolation: isolate;
      }
      .hex::before,
      .hex::after {
        content: "";
        position: absolute;
        z-index: -1;
        clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
      }
      .hex::before {
        inset: 1px;
        background: linear-gradient(
          180deg,
          var(--color-border-hi),
          var(--color-border) 50%,
          var(--color-void)
        );
      }
      .hex::after {
        inset: 6px;
        background: radial-gradient(
          circle at 50% 40%,
          var(--color-surface-raised),
          var(--color-void) 75%
        );
      }
      .hex.empty::after {
        background:
          var(--background-image-socket) center / 38% no-repeat,
          radial-gradient(circle at 50% 40%, var(--color-surface-raised), var(--color-void) 75%);
      }
      .hex.add::after {
        background: radial-gradient(
          circle at 50% 40%,
          var(--color-border-hi),
          var(--color-surface-alt) 75%
        );
      }
      .hex.add {
        font-size: 1.625rem;
        font-weight: 700;
      }
      .hex.selected::before {
        background: linear-gradient(180deg, var(--color-brand-400), var(--color-brand-600));
      }
      .hex:hover::before {
        filter: brightness(1.25);
      }
      .hex:focus-visible {
        outline: 2px solid var(--color-brand-500);
        outline-offset: 3px;
      }
      .num {
        position: absolute;
        z-index: 1;
        right: 9%;
        bottom: 2%;
        font-family: var(--font-sans);
        font-size: 1.0625rem;
        font-weight: 700;
        color: var(--color-brand-500);
        text-shadow: 0 1px 2px #000;
      }
    `,
  ];

  @property({ type: Number }) q = 0;
  @property({ type: Number }) r = 0;
  @property({ type: Boolean, reflect: true }) empty = false;
  @property({ type: Boolean, reflect: true }) add = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: String }) step = "";

  protected updated(): void {
    this.style.setProperty("--q", String(this.q));
    this.style.setProperty("--r", String(this.r));
  }

  render() {
    const classes = `hex ${this.empty ? "empty" : ""} ${this.add ? "add" : ""} ${this.selected ? "selected" : ""}`;
    return html`<button class=${classes}>
      ${this.add ? "+" : html`<slot></slot>`}
      ${this.step ? html`<span class="num">${this.step}</span>` : null}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-hex-socket": ThemeHexSocket;
  }
}
