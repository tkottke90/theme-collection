import type { Decorator } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import { backdropStyle, INTRO_HEADER_STYLE, storyIntro } from "./intro.js";

export type { StoryIntro } from "./intro.js";

export interface LitIntroOptions {
  /** CSS declarations for the page backdrop, e.g. "background: var(--color-bg); color: var(--color-text)". */
  backdrop: string;
  /** Renders the eyebrow (the intro's `tag`, already wrapped in angle brackets). */
  eyebrow: (text: string) => TemplateResult;
  heading: (text: string) => TemplateResult;
  paragraph: (text: string) => TemplateResult;
}

/** The story-intro decorator for Lit / Web Component packages. See `intro.ts`. */
export function litIntroDecorator(options: LitIntroOptions): Decorator {
  return (story, context) => {
    const intro = storyIntro(context.parameters);
    return html`<div style=${backdropStyle(options.backdrop)}>
      ${
        intro
          ? html`<header class="story-intro" style=${INTRO_HEADER_STYLE}>
              ${options.eyebrow(`<${intro.tag}>`)} ${options.heading(intro.title)}
              ${intro.description.map((p) => options.paragraph(p))}
            </header>`
          : nothing
      }
      ${story()}
    </div>`;
  };
}
