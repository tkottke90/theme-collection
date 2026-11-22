import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeChipVariant = "default" | "blue" | "rust" | "charge" | "wheel";

@customElement("theme-chip")
export class ThemeChip extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .chip {
        --face: var(--color-chip);
        --ring: var(--color-chip-ring);
        --size: 50px;
        position: relative;
        display: grid;
        place-items: center;
        width: var(--size);
        aspect-ratio: 1;
        border-radius: 50%;
        color: #f2f2f2;
        font-family: var(--font-sans);
        font-weight: 700;
        font-size: 1rem;
        background: radial-gradient(
          circle at 50% 32%,
          color-mix(in srgb, var(--face) 70%, white),
          var(--face) 62%
        );
        box-shadow:
          0 0 0 4px var(--color-void),
          inset 0 -3px 6px rgba(0, 0, 0, 0.45),
          0 3px 6px rgba(0, 0, 0, 0.6);
      }
      ::slotted(svg) {
        width: 58%;
        height: 58%;
      }
      .chip::before {
        content: "";
        position: absolute;
        inset: -7px;
        border-radius: 50%;
        background: var(--ring);
        mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
      }
      .chip.blue {
        --face: var(--color-chip-blue);
        --ring: var(--color-chip-ring-blue);
      }
      .chip.rust {
        --face: var(--color-chip-rust);
        --ring: var(--color-chip-ring-rust);
      }
      .chip.charge {
        --face: #2b2b2d;
      }
      .chip.charge::before {
        inset: -8px;
        background: conic-gradient(
          var(--color-danger-500) 0 calc(var(--charge, 0.5) * 360deg),
          #6b6b6b 0
        );
        mask:
          radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px)),
          repeating-conic-gradient(#000 0 36deg, transparent 36deg 45deg);
        mask-composite: intersect;
        -webkit-mask-composite: source-in;
      }
      .chip.wheel {
        background:
          radial-gradient(circle, #141414 0 16%, transparent 17%),
          conic-gradient(
            from -25deg,
            var(--color-danger-500) 0 50deg,
            #111 50deg 60deg,
            var(--color-danger-500) 60deg 110deg,
            #111 110deg 120deg,
            #7b7b7b 120deg 170deg,
            #111 170deg 180deg,
            #7b7b7b 180deg 230deg,
            #111 230deg 240deg,
            #7b7b7b 240deg 290deg,
            #111 290deg 300deg,
            #7b7b7b 300deg 350deg,
            #111 350deg 360deg
          );
      }
      .chip.wheel::after {
        content: "";
        position: absolute;
        inset: 30%;
        border-radius: 50%;
        background: #1a1a1a;
        box-shadow: 0 0 0 3px #111;
      }
      .chip.wheel::before {
        display: none;
      }
      .nub {
        position: absolute;
        inset: -7px;
        transform: rotate(var(--dir, 0deg));
        pointer-events: none;
      }
      .nub::after {
        content: "";
        position: absolute;
        left: 50%;
        top: -6px;
        width: 12px;
        height: 7px;
        margin-left: -6px;
        background: #f2f2f2;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
      }
    `,
  ];

  @property({ type: String, reflect: true }) variant: ThemeChipVariant = "default";
  @property({ type: Number }) charge = 0.5;
  @property({ type: Number }) rotation = 0;
  @property({ type: Boolean }) nub = false;

  render() {
    const chargeStyle = this.variant === "charge" ? `--charge: ${this.charge}` : "";
    return html`<span class="chip ${this.variant}" style=${chargeStyle}>
      <slot></slot>
      ${this.nub ? html`<span class="nub" style="--dir: ${this.rotation}deg"></span>` : null}
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-chip": ThemeChip;
  }
}
