/**
 * Framework-neutral part of the Storybook story-intro decorators. Each
 * package's `.storybook/preview` uses the variant for its renderer
 * (`intro-lit.ts`, `intro-preact.ts`, `intro-html.ts`) and supplies only its
 * theme specifics: the page backdrop and how to render the intro's text.
 *
 * Plain source, not a workspace: Storybook's Vite builder compiles it
 * straight from here.
 */

/**
 * A component's design notes, shown above every one of its stories. Set
 * `parameters.intro` on a stories file's `meta`; set it to `null` on a story
 * to leave that story bare (e.g. a full-page demo).
 */
export interface StoryIntro {
  /**
   * Eyebrow naming the API. The Lit and Preact variants show it in angle
   * brackets: a custom element's tag ("theme-button") or a component name
   * ("ThemeButton"). The HTML variant shows it as-is: a CSS class (".btn").
   */
  tag: string;
  title: string;
  /** One or more paragraphs on how the element was designed. */
  description: string[];
}

/**
 * How `scripts/screenshot.mjs` asks a story to render, via the iframe URL:
 *
 * - `screenshot=1` drops the backdrop's full-viewport height, so a capture
 *   is only as tall as its content.
 * - `intro=hide` renders the story without its intro.
 * - `intro=only` renders the intro without the story.
 *
 * Without either flag (normal Storybook use) the intro sits above the story.
 */
export interface IntroMode {
  screenshot: boolean;
  intro: "show" | "hide" | "only";
}

export function introMode(search: string = globalThis.location?.search ?? ""): IntroMode {
  const params = new URLSearchParams(search);
  const intro = params.get("intro");
  return {
    screenshot: params.get("screenshot") === "1",
    intro: intro === "hide" || intro === "only" ? intro : "show",
  };
}

/** The story's intro, if it has one. */
export function storyIntro(parameters: Record<string, unknown>): StoryIntro | null {
  return (parameters["intro"] as StoryIntro | null | undefined) ?? null;
}

/**
 * Inline style for the backdrop wrapper: the package's own page background
 * plus the shared padding and (outside screenshots) full-viewport height.
 */
export function backdropStyle(themeBackdrop: string, mode: IntroMode): string {
  return [themeBackdrop, "padding: 2.5rem", mode.screenshot ? "" : "min-height: 100vh"]
    .filter(Boolean)
    .join("; ");
}

/** Layout of the intro header; `data-story-intro` is how the screenshot script finds it. */
export const INTRO_HEADER_STYLE =
  "max-width: 44rem; margin-bottom: 2.5rem; display: flex; flex-direction: column; gap: 0.75rem";

/** In `intro=only` mode the header is the whole capture, so it needs no bottom margin. */
export function introHeaderStyle(mode: IntroMode): string {
  return mode.intro === "only" ? `${INTRO_HEADER_STYLE}; margin-bottom: 0` : INTRO_HEADER_STYLE;
}
