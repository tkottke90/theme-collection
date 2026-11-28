import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./index.js";

/**
 * A small full page composed only from this package's components. When you
 * copy the starter, rewrite it as a page that shows off your own theme; keep
 * the working form so the screenshot proves the controls submit and reset.
 */

const PLANS = [
  { heading: "Starter", body: "One project, community support, and every component in the set." },
  { heading: "Team", body: "Shared tokens across five projects, with review on theme changes." },
  { heading: "Studio", body: "Unlimited projects and a dedicated design review each quarter." },
];

const SECTION = "display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2.5rem;";
const GRID = (min: string) =>
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); gap: 1.5rem;`;
const STACK = "display: flex; flex-direction: column; gap: 1rem;";
const INLINE_LABEL =
  "display: inline-flex; gap: 0.5rem; align-items: center; font-family: var(--font-sans); color: var(--color-neutral-900)";

function onReset(e: Event) {
  const out = (e.currentTarget as HTMLFormElement).querySelector(".demo-result");
  if (out) out.textContent = "Nothing submitted yet.";
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const entries = [...new FormData(form)].map(([k, v]) => `${k}=${String(v)}`);
  const out = form.querySelector(".demo-result");
  if (out) out.textContent = entries.length ? `Submitted: ${entries.join(", ")}` : "Empty form.";
}

export const demoPage = () => html`
  <div style="max-width: 64rem; margin: 0 auto">
    <header style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 40rem">
      <theme-text variant="caption">Starter theme · Web Components</theme-text>
      <theme-heading level="1">A plain theme to build on</theme-heading>
      <theme-text
        >Every component here is styled only from the starter tokens. Copy the package, swap the
        tokens, and this page becomes your theme's showcase.</theme-text
      >
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem">
        <theme-button label="Get started"></theme-button>
        <theme-button variant="secondary" label="Read the guide"></theme-button>
        <theme-button variant="ghost" label="Skip"></theme-button>
      </div>
    </header>

    <section style=${SECTION}>
      <theme-heading level="2">Plans</theme-heading>
      <div style=${GRID("16rem")}>
        ${PLANS.map(
          (p) =>
            html`<theme-card heading=${p.heading}><theme-text>${p.body}</theme-text></theme-card>`,
        )}
      </div>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Get in touch</theme-heading>
      <div style=${GRID("20rem")}>
        <theme-container>
          <form style=${STACK} @submit=${onSubmit} @reset=${onReset}>
            <theme-field label="Name">
              <theme-input name="name" placeholder="Ada Lovelace"></theme-input>
            </theme-field>
            <theme-field label="Email">
              <theme-input name="email" type="email" placeholder="ada@example.com"></theme-input>
            </theme-field>
            <theme-field label="Plan">
              <theme-select name="plan">
                ${PLANS.map((p) => html`<option>${p.heading}</option>`)}
              </theme-select>
            </theme-field>
            <theme-field label="Message">
              <theme-textarea name="message" rows="3" placeholder="What are you building?">
              </theme-textarea>
            </theme-field>
            <theme-field label="Contact by">
              <div style="display: flex; gap: 1.25rem">
                ${["Email", "Phone"].map(
                  (c) =>
                    html`<label style=${INLINE_LABEL}
                      ><theme-input
                        type="radio"
                        name="contact"
                        value=${c.toLowerCase()}
                        ?checked=${c === "Email"}
                      ></theme-input
                      >${c}</label
                    >`,
                )}
              </div>
            </theme-field>
            <label style=${INLINE_LABEL}
              ><theme-input type="checkbox" name="newsletter" value="yes"></theme-input>Send me the
              newsletter</label
            >
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
              <theme-button type="submit" label="Send"></theme-button>
              <theme-button type="reset" variant="secondary" label="Reset"></theme-button>
            </div>
            <theme-text variant="caption" class="demo-result" aria-live="polite"
              >Nothing submitted yet.</theme-text
            >
          </form>
        </theme-container>

        <div style=${STACK}>
          <theme-blockquote type="tip"
            >Every control here submits with the form and resets with it.</theme-blockquote
          >
          <theme-container as="ul">
            <theme-item>Copy the starter package</theme-item>
            <theme-item>Replace the tokens in your theme folder</theme-item>
            <theme-item>Restyle each component's classes</theme-item>
          </theme-container>
          <theme-detail summary="Where do the tokens come from?">
            <theme-text
              >From one theme file, compiled into each component at build time. See the
              <theme-link href="#">package README</theme-link> for details.</theme-text
            >
          </theme-detail>
          <theme-container>
            <theme-skeleton-heading width="50%"></theme-skeleton-heading>
            <theme-skeleton-text></theme-skeleton-text>
            <theme-skeleton-text width="80%"></theme-skeleton-text>
          </theme-container>
        </div>
      </div>
    </section>
  </div>
`;

const meta: Meta = {
  title: "Theme/Starter WC/Demo",
  // demoPage is exported for reuse (e.g. a standalone demo bundle), not as a story.
  excludeStories: ["demoPage"],
  parameters: { intro: null, layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = { render: demoPage };
