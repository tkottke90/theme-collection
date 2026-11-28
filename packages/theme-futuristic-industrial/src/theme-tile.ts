import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { darkSurface } from "./surfaces.js";
import { computeTile } from "./tile-geometry.js";

/**
 * A dark tile for an icon, a short status ("LOCKED") or a number, from the
 * reference sheet's rounded tile with a hatched corner: light stripes cut
 * into the bottom-right corner. Set `plain` to drop them.
 * Slotted text switches to light colors, as in `theme-casing`.
 */
@customElement("theme-tile")
export class ThemeTile extends LitElement {
  static styles = [
    themeStyles,
    darkSurface,
    css`
      :host {
        display: inline-flex;
        position: relative;
        isolation: isolate;
        min-width: 6rem;
      }
    `,
  ];

  /** Drops the hatched corner. (An attribute, so it can be set from plain HTML.) */
  @property({ type: Boolean, reflect: true }) plain = false;

  private frame = new ResizeFrameController(this, computeTile);

  render() {
    const g = this.frame.geometry;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full"
        viewBox=${g?.viewBox ?? "0 0 1 1"}
        aria-hidden="true"
      >
        ${svg`
          <defs><clipPath id="tile-body"><path d=${g?.bodyD ?? ""} /></clipPath></defs>
          <path d=${g?.bodyD ?? ""} fill="var(--color-neutral-900)" />
          ${
            !this.plain
              ? svg`<path d=${g?.hatchD ?? ""} fill="var(--color-neutral-50)" clip-path="url(#tile-body)" />`
              : null
          }
        `}
      </svg>
      <div
        class="relative flex flex-1 items-center justify-center p-6 text-center font-sans text-fg"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-tile": ThemeTile;
  }
}
