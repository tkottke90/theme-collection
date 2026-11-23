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
    return staticHtml`<${tag} class="font-sans text-neutral-900"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
