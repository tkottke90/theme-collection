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

const CLASSES: Record<1 | 2 | 3 | 4, string> = {
  1: "font-sans text-text text-3xl font-bold tracking-wide uppercase m-0",
  2: "font-sans text-text text-2xl font-bold tracking-wide uppercase m-0",
  3: "font-sans text-text text-xl font-semibold m-0",
  4: "font-sans text-text text-lg font-semibold m-0",
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
    const tag = TAGS[this.level] ?? TAGS[1];
    const classes = CLASSES[this.level] ?? CLASSES[1];
    return staticHtml`<${tag} class=${classes}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
