import { LitElement, css, html, svg, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { line } from "./path-utils.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

export type BracketTagVariant = "square" | "flared";

/** How far the flared rules angle out at each end, px. */
const FLARE = 8;

/**
 * The "MOD:X5C" frame: a rule above and below the text that each bend out
 * toward the box's corners at both ends, inset by half the 2px stroke.
 */
export function flaredRules(w: number, h: number): { viewBox: string; d: string } | null {
  if (!w || !h || w <= 2 * FLARE) return null;
  const top = 1;
  const bottom = h - 1;
  const rise = Math.min(FLARE, h / 4);
  const d = [
    line([0, top], [FLARE, top + rise], [w - FLARE, top + rise], [w, top]),
    line([0, bottom], [FLARE, bottom - rise], [w - FLARE, bottom - rise], [w, bottom]),
  ].join(" ");
  return { viewBox: `0 0 ${w} ${h}`, d };
}

/**
 * An inline code or ID label from the reference sheet. `square` wraps the
 * text in square brackets like "[MT-22467R]"; `flared` sets it between two
 * rules that flare out at the ends, like "MOD:X5C".
 */
@customElement("theme-bracket-tag")
export class ThemeBracketTag extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
        isolation: isolate;
        vertical-align: middle;
      }
    `,
  ];

  @property({ type: String, reflect: true }) variant: BracketTagVariant = "square";

  private frame = new ResizeFrameController(this, (w, h) =>
    this.variant === "flared" ? flaredRules(w, h) : null,
  );

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has("variant")) this.frame.measure();
  }

  render() {
    const text = html`<span class="text-sm font-bold tracking-wider uppercase"
      ><slot></slot
    ></span>`;

    if (this.variant === "flared") {
      return html`
        <svg
          class="pointer-events-none absolute inset-0 block h-full w-full"
          viewBox=${this.frame.geometry?.viewBox ?? "0 0 1 1"}
          aria-hidden="true"
        >
          ${svg`<path d=${this.frame.geometry?.d ?? ""} fill="none" stroke="var(--color-fg)" stroke-width="2" stroke-linejoin="miter" />`}
        </svg>
        <span class="relative inline-flex items-center px-4 py-2.5 font-mono leading-none text-fg">
          ${text}
        </span>
      `;
    }

    return html`<span class="inline-flex items-stretch gap-1 font-mono leading-none text-fg">
      <span class="w-1.5 border-y-2 border-l-2 border-current" aria-hidden="true"></span>
      <span class="py-1">${text}</span>
      <span class="w-1.5 border-y-2 border-r-2 border-current" aria-hidden="true"></span>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-bracket-tag": ThemeBracketTag;
  }
}
