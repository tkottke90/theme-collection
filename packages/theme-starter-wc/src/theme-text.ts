import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { tokens } from "./tokens.js";

export type ThemeTextVariant = "body" | "caption";

const TAGS: Record<ThemeTextVariant, StaticValue> = {
  body: literal`p`,
  caption: literal`small`,
};

@customElement("theme-text")
export class ThemeText extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
        font-family: var(--font-sans);
      }
      p {
        margin: 0;
        color: var(--neutral-900);
      }
      small {
        display: block;
        color: var(--neutral-500);
        font-size: 0.8125rem;
      }
    `,
  ];

  @property({ type: String }) variant: ThemeTextVariant = "body";

  render() {
    const tag = TAGS[this.variant] ?? TAGS.body;
    return staticHtml`<${tag}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-text": ThemeText;
  }
}
