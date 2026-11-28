import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormButtonElement } from "./generated/core/form-button.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

// Smaller radius than the default (Card, banner Headings, etc.) — a button
// is compact enough that the default's corner would eat most of its
// height — on a 1px grid so it still reads as a genuine pixel-circle, not
// a chamfer.
const BADGE_SHAPE = pixelFrameShapes(1, 2, 3, 6);
const FRAME_SHAPE = pixelFrameShapes(1, 2, 0, 6);

@customElement("theme-button")
export class ThemeButton extends FormButtonElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: inline-block;
      }
      button {
        border: 0;
        padding: 0;
        background: none;
        cursor: pointer;
        font-family: var(--font-slab);
        font-weight: 700;
      }
      button:focus-visible {
        outline: 2px solid var(--color-brand-600);
        outline-offset: 2px;
      }
      button:disabled {
        cursor: not-allowed;
      }
      .pixel-frame__fill {
        display: block;
        padding: 0.5rem 1.25rem;
      }
      .ghost {
        background: transparent;
      }
      .ghost::before,
      .ghost::after {
        display: none;
      }
      .ghost .pixel-frame__fill,
      .secondary .pixel-frame__fill {
        background-color: transparent;
        color: var(--color-brand-600);
      }
      /*
       * Disabled: parchment fill and muted ink (5.6:1, readable), with the
       * frame faded so it reads as inactive. Applies to every variant.
       */
      .pixel-frame.badge:disabled .pixel-frame__fill {
        background-color: var(--color-neutral-100);
      }
      button.pixel-frame:disabled .pixel-frame__fill {
        color: var(--color-text-muted);
      }
      button:disabled::before,
      button:disabled::after {
        opacity: 0.35;
      }
      button:not(:disabled):hover .pixel-frame__fill {
        filter: brightness(1.08);
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: "primary" | "secondary" | "ghost" = "primary";

  render() {
    const isBadge = this.variant === "primary";
    const frameClass = `pixel-frame ${isBadge ? "badge" : ""} ${this.variant}`;
    const shapeStyleValue = pixelFrameShapeStyle(isBadge ? BADGE_SHAPE : FRAME_SHAPE);

    return html`<button
      aria-label=${ifDefined(this.accessibleName)}
      ?disabled=${this.isDisabled}
      class=${frameClass}
      style=${shapeStyleValue}
    >
      <span class="pixel-frame__fill"><slot>${this.label}</slot></span>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-button": ThemeButton;
  }
}
