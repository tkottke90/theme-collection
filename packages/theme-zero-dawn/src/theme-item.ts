import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeItemTag = "li" | "div";

const TAGS: Record<ThemeItemTag, StaticValue> = {
  li: literal`li`,
  div: literal`div`,
};

/** List row: a painted diamond bead marker and a plate seam underneath. */
@customElement("theme-item")
export class ThemeItem extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      :host(:last-of-type) .row {
        border-bottom-color: transparent;
      }
    `,
  ];

  @property({ type: String }) as: ThemeItemTag = "li";

  render() {
    const tag = TAGS[this.as] ?? TAGS.li;
    return staticHtml`<${tag} class="row flex list-none items-baseline gap-3 border-b border-plate-500 py-2.5 text-[var(--zd-ink,var(--color-text))]">${html`<svg
      viewBox="0 0 10 10"
      class="h-2.5 w-2.5 shrink-0 translate-y-px"
      aria-hidden="true"
    >
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--zd-accent, var(--color-wire-300))" />
    </svg>`}<span class="min-w-0 flex-1"><slot></slot></span></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-item": ThemeItem;
  }
}
