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

/**
 * Stencil-style scale after the reference sheet's "CODE-13-V-2-44" label: all
 * caps, bold at the top, opening up the letter-spacing as the size drops so
 * the small levels stay legible in a monospace face.
 */
const SIZES: Record<1 | 2 | 3 | 4, string> = {
  1: "text-3xl font-bold tracking-wide leading-tight",
  2: "text-2xl font-bold tracking-wide leading-tight",
  3: "text-lg font-semibold tracking-wider leading-snug",
  4: "text-sm font-semibold tracking-widest leading-snug",
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
    return staticHtml`<${TAGS[level]} class="m-0 font-sans text-fg uppercase ${SIZES[level]}"><slot></slot></${TAGS[level]}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
