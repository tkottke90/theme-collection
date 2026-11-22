import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeTextVariant = "body" | "caption";

const TAGS: Record<ThemeTextVariant, StaticValue> = {
  body: literal`p`,
  caption: literal`small`,
};

@customElement("theme-text")
export class ThemeText extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) variant: ThemeTextVariant = "body";

  render() {
    const tag = TAGS[this.variant] ?? TAGS.body;
    const classes =
      this.variant === "caption"
        ? "font-sans block text-text-muted text-[0.8125rem]"
        : "font-sans m-0 text-text";
    return staticHtml`<${tag} class=${classes}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-text": ThemeText;
  }
}
