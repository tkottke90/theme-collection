import type { Decorator } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import {
  backdropStyle,
  introHeaderStyle,
  introMode,
  storyIntro,
  type StoryIntro,
} from "./intro.js";

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
    const mode = introMode();
    const intro = storyIntro(context.parameters);
    const header = (i: StoryIntro) =>
      html`<header class="story-intro" data-story-intro style=${introHeaderStyle(mode)}>
        ${options.eyebrow(`<${i.tag}>`)} ${options.heading(i.title)}
        ${i.description.map((p) => options.paragraph(p))}
      </header>`;
    return html`<div style=${backdropStyle(options.backdrop, mode)}>
      ${intro && mode.intro !== "hide" ? header(intro) : nothing}
      ${intro && mode.intro === "only" ? nothing : story()}
    </div>`;
  };
}
