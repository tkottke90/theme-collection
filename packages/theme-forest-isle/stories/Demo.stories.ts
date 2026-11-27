import type { Meta, StoryObj } from "@storybook/html";

/**
 * A full page composed only from this package's classes: an island
 * dashboard with the sidebar, an overview card and a settings form. All
 * copy is placeholder text. The <style> block below is page layout only
 * (widths and grids); every visual style comes from the theme's classes.
 */

const LAYOUT = `<style>
  .demo-shell { display: flex; align-items: stretch; min-height: 48rem; }
  .demo-shell > .theme-sidebar { flex-shrink: 0; }
  .demo-main { flex: 1; min-width: 0; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
  .demo-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
  .demo-form { display: flex; flex-direction: column; gap: 1rem; }
  .demo-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .demo-actions .theme-button { white-space: nowrap; }
  .demo-types { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
</style>`;

const ICONS: Record<string, string> = {
  home: `<path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />`,
  overview: `<rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />`,
  tasks: `<path d="M5 6h14M5 12h14M5 18h9" /><path d="M3 6h.01M3 12h.01M3 18h.01" />`,
  residents: `<circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M14 15.5c2.5.3 4 1.8 4 4.5" />`,
};

const icon = (name: keyof typeof ICONS) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const navLink = (name: keyof typeof ICONS, label: string, selected = false) =>
  `<li><a class="theme-nav-link${selected ? " theme-nav-link--selected" : ""}" href="#demo-${name}"${selected ? ' aria-current="page"' : ""}>${icon(name)}<span>${label}</span></a></li>`;

const TYPES: [string, string][] = [
  ["info", "Info"],
  ["tip", "Tip"],
  ["question", "Question"],
  ["success", "Success"],
  ["warning", "Warning"],
  ["failure", "Failure"],
  ["danger", "Danger"],
  ["bug", "Bug"],
  ["example", "Example"],
  ["quote", "Quote"],
];

const callouts = TYPES.map(
  ([type, label]) => `
    <blockquote class="theme-blockquote theme-blockquote--${type}">
      <span class="theme-blockquote__label">${label}</span>
      <p class="theme-text">A ${label.toLowerCase()} note.</p>
    </blockquote>`,
).join("");

const PAGE = `
${LAYOUT}
<div class="demo-shell">
  <aside class="theme-sidebar">
    <div class="theme-sidebar-sign">
      <svg class="theme-sidebar-sign__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8 6 6 9 6 12a6 6 0 0 0 12 0c0-3-2-6-6-10Z" />
      </svg>
      <p class="theme-sidebar-sign__eyebrow">Welcome to</p>
      <p class="theme-sidebar-sign__name">Driftwood Cove</p>
      <p class="theme-sidebar-sign__subtitle">Island</p>
    </div>
    <nav aria-label="Island">
      <ul class="theme-nav">
        ${navLink("home", "Home", true)}
        ${navLink("overview", "Overview")}
        ${navLink("tasks", "Tasks")}
        ${navLink("residents", "Residents")}
      </ul>
    </nav>
  </aside>

  <main class="demo-main">
    <header>
      <p class="theme-text theme-text--caption">Island / Home</p>
      <h1 class="theme-heading theme-heading--h1">Good morning, islander</h1>
      <p class="theme-text">
        Here is how the cove is doing today.
        <a class="theme-link" href="#demo-help">Read the island guide</a>.
      </p>
    </header>

    <div class="demo-columns">
      <section class="theme-card">
        <h2 class="theme-heading theme-heading--h2">Overview</h2>
        <h3 class="theme-heading theme-heading--h3">Residents</h3>
        <p class="theme-text">8 of 10 cottages are occupied.</p>
        <h4 class="theme-heading theme-heading--h4">Today</h4>
        <ul class="theme-container">
          <li class="theme-item">Water the garden</li>
          <li class="theme-item">Repair the dock</li>
          <li class="theme-item">Welcome the new neighbour</li>
        </ul>
        <div aria-busy="true" aria-label="Loading forecast">
          <div class="theme-skeleton-heading"></div>
          <div class="theme-skeleton-text"></div>
          <div class="theme-skeleton-text" style="width: 70%;"></div>
        </div>
        <details class="theme-detail" id="demo-help">
          <summary>How ratings work</summary>
          <p class="theme-text">Each occupied cottage and finished task adds to the island rating.</p>
        </details>
      </section>

      <section class="theme-card">
        <h2 class="theme-heading theme-heading--h2">Island settings</h2>
        <form class="demo-form" id="demo-settings">
          <div class="theme-field">
            <label for="demo-name">Island name</label>
            <input class="theme-input" type="text" id="demo-name" name="island" value="Driftwood Cove" required />
          </div>

          <div class="theme-field">
            <label for="demo-email">Contact email</label>
            <input class="theme-input" type="email" id="demo-email" name="email" placeholder="you@example.com" required aria-describedby="demo-email-hint" />
            <p class="theme-text theme-text--caption" id="demo-email-hint">Harvest reports are sent here.</p>
          </div>

          <div class="theme-field">
            <label for="demo-season">Season</label>
            <select class="theme-select" id="demo-season" name="season">
              <option value="spring">Spring</option>
              <option value="summer" selected>Summer</option>
              <option value="autumn">Autumn</option>
            </select>
          </div>

          <fieldset class="theme-field">
            <legend>Notify me about</legend>
            <label class="theme-field__option">
              <input class="theme-input" type="checkbox" name="topics" value="harvest" checked />
              Harvest
            </label>
            <label class="theme-field__option">
              <input class="theme-input" type="checkbox" name="topics" value="visitors" />
              Visitors
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
            <textarea class="theme-textarea" id="demo-notes" name="notes" rows="3" placeholder="Anything the neighbours should know"></textarea>
          </div>

          <div class="demo-actions">
            <button class="theme-button" type="submit">Save settings</button>
            <button class="theme-button theme-button--secondary" type="reset">Reset</button>
            <button class="theme-button theme-button--ghost" type="button" disabled>Archive</button>
          </div>

          <output class="theme-text theme-text--caption" aria-live="polite"></output>
        </form>
      </section>
    </div>

    <section class="theme-card">
      <h2 class="theme-heading theme-heading--h2">Callouts</h2>
      <div class="demo-types">${callouts}</div>
    </section>
  </main>
</div>
`;

const meta: Meta = {
  title: "Theme/Forest Isle/Demo",
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
