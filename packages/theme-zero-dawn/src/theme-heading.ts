import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

type HeadingLevel = 1 | 2 | 3 | 4;

const TAGS: Record<HeadingLevel, StaticValue> = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
};

const SIZE_CLASSES: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-[0.08em]",
  2: "text-[1.75rem] font-bold tracking-[0.08em]",
  3: "text-[1.375rem] font-semibold tracking-[0.06em]",
  4: "text-lg font-semibold tracking-[0.06em]",
};

/**
 * Squared display sans in caps. Levels 1–2 carry a painted underline
 * ornament: tapered rules either side of a diamond bead.
 */
@customElement("theme-heading")
export class ThemeHeading extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Number }) level: HeadingLevel = 1;

  render() {
    const level = TAGS[this.level] ? this.level : 1;
    const ornament =
      level <= 2
        ? html`<svg
            viewBox="0 0 120 10"
            class="ornament mt-2 block h-2.5 w-[120px]"
            aria-hidden="true"
            style="color: var(--zd-accent, var(--color-wire-300))"
          >
            <path d="M0 5 L46 3.5 V6.5 Z M120 5 L74 3.5 V6.5 Z" fill="currentColor" />
            <path d="M60 0 L65 5 L60 10 L55 5 Z" fill="currentColor" />
          </svg>`
        : null;
    return staticHtml`<${TAGS[level]} class="m-0 mb-3 font-sans leading-tight uppercase text-[var(--zd-ink,var(--color-text))] ${SIZE_CLASSES[level]}"><slot></slot>${ornament}</${TAGS[level]}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
