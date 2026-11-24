import type { Meta, StoryObj } from "@storybook/html";

/**
 * A full page composed only from this package's classes: a small project
 * settings page. All copy is placeholder text. The <style> block below is
 * page layout only (widths and grids); every visual style comes from the
 * theme's classes.
 *
 * When copying the starter, rewrite this page in your theme's voice, keep
 * the title's last segment "Demo" (the screenshot script puts that story
 * first), and keep a working <form> so the form controls are exercised.
 */

const LAYOUT = `<style>
  .demo-page { max-width: 56rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
  .demo-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
  .demo-form { display: flex; flex-direction: column; gap: 1rem; }
  .demo-actions { display: flex; gap: 0.5rem; }
</style>`;

const PAGE = `
${LAYOUT}
<main class="demo-page">
  <header>
    <p class="theme-text theme-text--caption">Workspace / Settings</p>
    <h1 class="theme-heading theme-heading--h1">Project settings</h1>
    <p class="theme-text">
      Configure how this project notifies you.
      <a class="theme-link" href="#settings-help">Read the settings guide</a>.
    </p>
  </header>

  <blockquote class="theme-blockquote theme-blockquote--tip">
    <span class="theme-blockquote__label">Tip</span>
    <p class="theme-text">Changes apply to every member of the project.</p>
  </blockquote>

  <div class="demo-columns">
    <section class="theme-card">
      <h2 class="theme-heading theme-heading--h3">Notifications</h2>
      <form class="demo-form" id="demo-settings">
        <div class="theme-field">
          <label for="demo-name">Project name</label>
          <input class="theme-input" type="text" id="demo-name" name="project" value="Lantern" required />
        </div>

        <div class="theme-field">
          <label for="demo-email">Contact email</label>
          <input class="theme-input" type="email" id="demo-email" name="email" placeholder="you@example.com" required aria-describedby="demo-email-hint" />
          <p class="theme-text theme-text--caption" id="demo-email-hint">Digests are sent here.</p>
        </div>

        <div class="theme-field">
          <label for="demo-frequency">Digest frequency</label>
          <select class="theme-select" id="demo-frequency" name="frequency">
            <option value="daily">Daily</option>
            <option value="weekly" selected>Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <fieldset class="theme-field">
          <legend>Notify me about</legend>
          <label class="theme-field__option">
            <input class="theme-input" type="checkbox" name="topics" value="releases" checked />
            Releases
          </label>
          <label class="theme-field__option">
            <input class="theme-input" type="checkbox" name="topics" value="comments" />
            Comments
          </label>
        </fieldset>

        <fieldset class="theme-field">
          <legend>Visibility</legend>
          <label class="theme-field__option">
            <input class="theme-input" type="radio" name="visibility" value="private" checked />
            Private
          </label>
          <label class="theme-field__option">
            <input class="theme-input" type="radio" name="visibility" value="public" />
            Public
          </label>
        </fieldset>

        <div class="theme-field">
          <label for="demo-notes">Notes</label>
          <textarea class="theme-textarea" id="demo-notes" name="notes" rows="3" placeholder="Anything the team should know"></textarea>
        </div>

        <div class="demo-actions">
          <button class="theme-button" type="submit">Save settings</button>
          <button class="theme-button theme-button--secondary" type="reset">Reset</button>
          <button class="theme-button theme-button--ghost" type="button" disabled>Archive</button>
        </div>

        <output class="theme-text theme-text--caption" aria-live="polite"></output>
      </form>
    </section>

    <aside class="demo-form">
      <h2 class="theme-heading theme-heading--h3">Recent activity</h2>
      <ul class="theme-container">
        <li class="theme-item">Release 1.4 published</li>
        <li class="theme-item">Two new members joined</li>
        <li class="theme-item">Weekly digest sent</li>
      </ul>

      <details class="theme-detail" id="settings-help">
        <summary>How digests work</summary>
        <p class="theme-text">A digest collects everything since the last one into a single email.</p>
      </details>

      <div aria-busy="true" aria-label="Loading usage">
        <div class="theme-skeleton-heading"></div>
        <div class="theme-skeleton-text"></div>
        <div class="theme-skeleton-text" style="width: 70%;"></div>
      </div>
    </aside>
  </div>
</main>
`;

const meta: Meta = {
  title: "Theme/Starter CSS/Demo",
  parameters: { intro: null },
};
export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    const root = document.createElement("div");
    root.innerHTML = PAGE;
    const form = root.querySelector<HTMLFormElement>("#demo-settings")!;
    const output = form.querySelector("output")!;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const entries = [...new FormData(form)].map(([key, value]) => `${key}=${String(value)}`);
      output.textContent = `Submitted: ${entries.join(", ")}`;
    });
    form.addEventListener("reset", () => {
      output.textContent = "";
    });
    return root;
  },
};
