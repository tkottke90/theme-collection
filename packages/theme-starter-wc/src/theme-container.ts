import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { tokens } from "./tokens.js";

export type ThemeContainerTag = "div" | "ol" | "ul";

const TAGS: Record<ThemeContainerTag, StaticValue> = {
  div: literal`div`,
  ol: literal`ol`,
  ul: literal`ul`,
};

@customElement("theme-container")
export class ThemeContainer extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      div,
      ol,
      ul {
        border-radius: var(--radius-theme);
        border: 1px solid var(--neutral-100);
        background-color: var(--neutral-50);
        padding: 1rem 1.25rem;
        margin: 0;
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`<${tag}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
