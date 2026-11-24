import type { Decorator } from "@storybook/preact";
import { h, type ComponentChild } from "preact";
import { backdropStyle, introHeaderStyle, introMode, storyIntro } from "./intro.js";

export type { StoryIntro } from "./intro.js";

export interface PreactIntroOptions {
  /** CSS declarations for the page backdrop, e.g. "background: var(--color-bg); color: var(--color-text)". */
  backdrop: string;
  /** Extra attributes for the backdrop wrapper, e.g. a `data-theme` from a toolbar global. */
  backdropProps?: (globals: Record<string, unknown>) => Record<string, unknown>;
  /** Renders the eyebrow (the intro's `tag`, already wrapped in angle brackets). */
  eyebrow: (text: string) => ComponentChild;
  heading: (text: string) => ComponentChild;
  paragraph: (text: string, index: number) => ComponentChild;
}

/** The story-intro decorator for Preact packages. See `intro.ts`. Written with `h()` so it needs no JSX config. */
export function preactIntroDecorator(options: PreactIntroOptions): Decorator {
  return (Story, context) => {
    const mode = introMode();
    const intro = storyIntro(context.parameters);
    const header =
      intro && mode.intro !== "hide"
        ? h(
            "header",
            { class: "story-intro", "data-story-intro": "", style: introHeaderStyle(mode) },
            options.eyebrow(`<${intro.tag}>`),
            options.heading(intro.title),
            ...intro.description.map((p, i) => options.paragraph(p, i)),
          )
        : null;
    return h(
      "div",
      {
        ...options.backdropProps?.(context.globals),
        style: backdropStyle(options.backdrop, mode),
      },
      header,
      intro && mode.intro === "only" ? null : h(Story, null),
    );
  };
}
