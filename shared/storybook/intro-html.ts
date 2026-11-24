import type { Decorator } from "@storybook/html";
import { backdropStyle, introHeaderStyle, introMode, storyIntro } from "./intro.js";

export type { StoryIntro } from "./intro.js";

export interface HtmlIntroOptions {
  /** CSS declarations for the page backdrop, e.g. "background: var(--color-bg); color: var(--color-text)". */
  backdrop: string;
  /** Each renderer returns an HTML string; the text is already escaped. */
  eyebrow: (text: string) => string;
  heading: (text: string) => string;
  paragraph: (text: string) => string;
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** The story-intro decorator for plain-HTML (CSS-only) packages. See `intro.ts`. */
export function htmlIntroDecorator(options: HtmlIntroOptions): Decorator {
  return (story, context) => {
    const mode = introMode();
    const intro = storyIntro(context.parameters);
    const root = document.createElement("div");
    root.setAttribute("style", backdropStyle(options.backdrop, mode));

    if (intro && mode.intro !== "hide") {
      const header = document.createElement("header");
      header.className = "story-intro";
      header.setAttribute("data-story-intro", "");
      header.setAttribute("style", introHeaderStyle(mode));
      header.innerHTML = [
        options.eyebrow(escapeHtml(intro.tag)),
        options.heading(escapeHtml(intro.title)),
        ...intro.description.map((p) => options.paragraph(escapeHtml(p))),
      ].join("");
      root.appendChild(header);
    }

    if (!(intro && mode.intro === "only")) {
      const content = story();
      if (typeof content === "string") root.insertAdjacentHTML("beforeend", content);
      else root.appendChild(content);
    }
    return root;
  };
}
