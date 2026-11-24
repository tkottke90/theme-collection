import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { PLATE_INK_CLASSES, PlateFrameController, renderPlateFrame } from "./plate-frame-svg.js";

/**
 * Sunlit armour plate on a dark core — the theme's signature surface.
 *
 * Fills its host's height and stacks its content as a column, so cards in a
 * row stay the same height and a child with `margin-top: auto` sits on the
 * bottom edge (e.g. to line up actions across cards).
 */
@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  private frame = new PlateFrameController(this);

  render() {
    return html`
      ${renderPlateFrame(this.frame.geometry, "light")}
      <div
        class="relative flex h-full flex-col px-7 pt-6 pb-7 font-serif text-lg text-core ${PLATE_INK_CLASSES.light}"
      >
        ${
          this.heading
            ? html`<h2
                class="mt-0 mb-3 flex items-center gap-2.5 font-sans text-base font-bold tracking-[0.14em] text-core uppercase"
              >
                <svg viewBox="0 0 12 12" class="h-3 w-3 shrink-0" aria-hidden="true">
                  <path d="M6 0 L12 12 H0 Z" fill="var(--color-tribe-red)" />
                </svg>
                ${this.heading}
              </h2>`
            : null
        }
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-card": ThemeCard;
  }
}
