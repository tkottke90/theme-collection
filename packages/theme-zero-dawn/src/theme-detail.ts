import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { PLATE_INK_CLASSES, PlateFrameController, renderPlateFrame } from "./plate-frame-svg.js";

/** `<details>` in the steel plate frame; the frame redraws as it opens. */
@customElement("theme-detail")
export class ThemeDetail extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
      summary {
        list-style: none;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      .chevron {
        transition: transform 0.15s ease;
      }
      details[open] .chevron {
        transform: rotate(90deg);
      }
      summary:focus-visible {
        outline: 2px solid var(--color-brand-500);
        outline-offset: 4px;
      }
      @media (prefers-reduced-motion: reduce) {
        .chevron {
          transition: none;
        }
      }
    `,
  ];

  @property({ type: String }) summary = "";

  // No seam notch: at a collapsed panel's thin height it reads as a glitch.
  private frame = new PlateFrameController(this, { cut: 14, notch: false });

  render() {
    return html`
      ${renderPlateFrame(this.frame.geometry, "steel")}
      <details class="relative px-6 py-4 font-serif text-text ${PLATE_INK_CLASSES.steel}">
        <summary
          class="flex cursor-pointer items-center gap-3 font-sans text-sm font-semibold tracking-[0.12em] text-text uppercase"
        >
          <svg viewBox="0 0 10 10" class="chevron h-2.5 w-2.5" aria-hidden="true">
            <path d="M1 0 L9 5 L1 10 Z" fill="var(--color-brand-500)" />
          </svg>
          ${this.summary}
        </summary>
        <div class="pt-3"><slot></slot></div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-detail": ThemeDetail;
  }
}
