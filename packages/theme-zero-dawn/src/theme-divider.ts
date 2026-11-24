import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

export type DividerVariant = "peaks" | "trim";

/**
 * Horizontal rule as a woven band: `peaks` is the art-book sawtooth of
 * alternating tall/short mountains; `trim` is a zigzag hem with diamond beads.
 * Both tile via an SVG `<pattern>` so they stretch to any width without
 * measuring, and meet at a painted diamond medallion in the middle.
 */
@customElement("theme-divider")
export class ThemeDivider extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String, reflect: true }) variant: DividerVariant = "peaks";

  private band(mirror: boolean) {
    const id = mirror ? "zd-div-r" : "zd-div-l";
    const pattern =
      this.variant === "trim"
        ? svg`<pattern id=${id} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 6 L8 1 L16 6" fill="none" stroke="var(--color-band)" stroke-width="2" />
            <path d="M8 9 L11 12 L8 15 L5 12 Z" fill="var(--color-wire)" />
          </pattern>`
        : svg`<pattern id=${id} width="24" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 16 L6 2 L12 16 Z" fill="var(--color-band)" />
            <path d="M12 16 L18 8 L24 16 Z" fill="var(--color-band)" fill-opacity="0.6" />
          </pattern>`;
    return html`<svg
      class="h-4 min-w-0 flex-1"
      style=${mirror ? "transform: scaleX(-1)" : ""}
      aria-hidden="true"
    >
      <defs>${pattern}</defs>
      <rect width="100%" height="16" fill="url(#${id})" />
      <rect y="15" width="100%" height="1" fill="var(--color-band)" />
    </svg>`;
  }

  render() {
    return html`<div role="separator" class="flex items-end gap-2 py-3">
      ${this.band(false)}
      <svg viewBox="0 0 24 24" class="h-6 w-6 shrink-0" aria-hidden="true">
        <path d="M12 0 L24 12 L12 24 L0 12 Z" fill="var(--color-tribe-ochre)" />
        <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="var(--color-core)" />
        <path d="M12 9.5 L14.5 12 L12 14.5 L9.5 12 Z" fill="var(--color-brand-500)" />
      </svg>
      ${this.band(true)}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-divider": ThemeDivider;
  }
}
