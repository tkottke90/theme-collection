import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeTextVariant = "body" | "caption";

const TAGS: Record<ThemeTextVariant, StaticValue> = {
  body: literal`p`,
  caption: literal`small`,
};

/** Body copy in the book serif; captions in the display sans, small caps-style. */
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
        ? "block font-sans text-xs font-medium tracking-[0.1em] uppercase text-[var(--zd-ink-muted,var(--color-text-muted))]"
        : "m-0 font-serif text-lg leading-relaxed text-[var(--zd-ink,var(--color-text))]";
    return staticHtml`<${tag} class=${classes}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-text": ThemeText;
  }
}
