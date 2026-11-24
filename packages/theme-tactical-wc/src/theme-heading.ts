import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

const TAGS: Record<1 | 2 | 3 | 4, StaticValue> = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
};

/** Per-level type scale: Tailwind's preflight resets h1–h4, so without it every level renders at body size. */
const SIZES: Record<1 | 2 | 3 | 4, string> = {
  1: "text-3xl font-bold leading-tight",
  2: "text-2xl font-bold leading-tight",
  3: "text-xl font-semibold leading-snug",
  4: "text-base font-semibold leading-snug",
};

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

  @property({ type: Number }) level: 1 | 2 | 3 | 4 = 1;

  render() {
    const level = TAGS[this.level] ? this.level : 1;
    return staticHtml`<${TAGS[level]} class="m-0 font-sans text-text tracking-wide uppercase ${SIZES[level]}"><slot></slot></${TAGS[level]}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
