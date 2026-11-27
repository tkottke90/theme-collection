import type { Meta, StoryObj } from "@storybook/html";

/**
 * A full page composed only from this package's classes: a network
 * monitoring dashboard. All data is placeholder text. The <style> block
 * below is page layout only (widths and grids); every visual style comes
 * from the theme's classes.
 */

const LAYOUT = `<style>
  .demo-page { max-width: 62rem; margin: 0 auto; padding: 2rem 1rem; display: flex; flex-direction: column; gap: 1.5rem; }
  .demo-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; }
  .demo-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .demo-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
  .demo-stack { display: flex; flex-direction: column; gap: 1rem; }
  .demo-callouts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
  .demo-callouts p { margin: 0; }
</style>`;

const CALLOUTS = [
  ["info", "Info", "Scheduled maintenance on Node B."],
  ["tip", "Tip", "Pin a host to keep it on top."],
  ["question", "Question", "Who owns the Node C alert?"],
  ["success", "Success", "Failover to Node D completed."],
  ["warning", "Warning", "Couchbase latency is rising."],
  ["failure", "Failure", "Health check failed on Node C."],
  ["danger", "Danger", "Edge gateway is unreachable."],
  ["bug", "Bug", "Probe reports a stale cache."],
  ["example", "Example", "Use 10.23.0.0/16 for the lab."],
  ["quote", "Quote", "Quiet dashboards are good dashboards."],
]
  .map(
    ([variant, label, text]) => `
      <blockquote class="theme-blockquote theme-blockquote--${variant}">
        <span class="theme-blockquote__label">${label}</span>
        <p>${text}</p>
      </blockquote>`,
  )
  .join("");

const PAGE = `
${LAYOUT}
<main class="demo-page">
  <header class="demo-header">
    <div>
      <small>Operations / Network</small>
      <h1>Network overview</h1>
      <p>
        Live status for the production cluster.
        <a href="#runbook">Open the runbook</a>.
      </p>
    </div>
    <div class="demo-actions">
      <button class="theme-button theme-button--glow" type="button">Acknowledge alert</button>
      <button class="theme-button theme-button--secondary" type="button">Export</button>
      <button class="theme-button theme-button--ghost" type="button">View raw logs</button>
      <button class="theme-button" type="button" disabled>Failover</button>
    </div>
  </header>

  <div class="demo-callouts">${CALLOUTS}</div>

  <div class="demo-columns">
    <section class="theme-card">
      <h2 class="theme-card__title">Inbound traffic</h2>
      <p class="theme-card__body">Node E &middot; 10.23.84.44</p>
      <h3>Hosts</h3>
      <ul class="theme-container">
        <li class="theme-item">Nginx &middot; 10.23.43.324 &middot; Healthy</li>
        <li class="theme-item">MySQL &middot; 10.23.54.32 &middot; Healthy</li>
        <li class="theme-item">Couchbase &middot; 10.23.84.44 &middot; Degraded</li>
      </ul>
      <h3>Next steps</h3>
      <ol class="theme-container">
        <li class="theme-item">Acknowledge the alert on Node C</li>
        <li class="theme-item">Check failover status for Node B</li>
      </ol>
      <details class="theme-details" id="runbook" open>
        <summary>Runbook: edge gateway</summary>
        <p class="theme-details__body">Restart the gateway with <code>systemctl restart edge-gw</code>, then watch the log:</p>
        <pre class="theme-details__body">edge-gw: listening on 10.23.43.324:443</pre>
      </details>
      <h3>Loading</h3>
      <div aria-busy="true" aria-label="Loading latency">
        <div class="theme-skeleton-heading"></div>
        <div class="theme-skeleton-text"></div>
        <div class="theme-skeleton-text" style="width: 70%;"></div>
      </div>
    </section>

    <section class="theme-card">
      <h2 class="theme-card__title">Alert rules</h2>
      <form class="demo-stack" id="demo-rules">
        <div class="theme-field">
          <label for="demo-host">Hostname</label>
          <input class="theme-input" type="text" id="demo-host" name="hostname" value="edge-gw-04.ops.local" required />
        </div>

        <div class="theme-field">
          <label for="demo-email">Contact email</label>
          <input class="theme-input" type="email" id="demo-email" name="email" placeholder="oncall@network-ops.io" required aria-describedby="demo-email-hint" />
          <small id="demo-email-hint">Alerts are sent here.</small>
        </div>

        <div class="theme-field">
          <label for="demo-service">Service</label>
          <select class="theme-input theme-select" id="demo-service" name="service">
            <option value="nginx">Nginx</option>
            <option value="mysql" selected>MySQL</option>
            <option value="couchbase">Couchbase</option>
          </select>
        </div>

        <div class="theme-field">
          <label for="demo-load">Alert threshold</label>
          <input class="theme-range" type="range" id="demo-load" name="threshold" min="0" max="100" value="68" />
        </div>

        <fieldset class="theme-field">
          <legend>Notify me about</legend>
          <label class="theme-field-label">
            <input class="theme-checkbox" type="checkbox" name="topics" value="alerts" checked />
            Alerts
          </label>
          <label class="theme-field-label">
            <input class="theme-checkbox" type="checkbox" name="topics" value="failover" />
            Failover events
          </label>
        </fieldset>

        <fieldset class="theme-field">
          <legend>Scan mode</legend>
          <label class="theme-field-label">
            <input class="theme-radio" type="radio" name="scan" value="passive" checked />
            Passive
          </label>
          <label class="theme-field-label">
            <input class="theme-radio" type="radio" name="scan" value="active" />
            Active
          </label>
        </fieldset>

        <div class="theme-field">
          <label for="demo-notes">Notes</label>
          <textarea class="theme-input theme-textarea" id="demo-notes" name="notes" rows="3" placeholder="Anything on-call should know"></textarea>
        </div>

        <div class="demo-actions">
          <button class="theme-button" type="submit">Save rule</button>
          <button class="theme-button theme-button--secondary" type="reset">Reset</button>
        </div>

        <output class="theme-text-small" aria-live="polite"></output>
      </form>
    </section>
  </div>
</main>
`;

const meta: Meta = {
  title: "Theme/Network Ops/Demo",
  parameters: { intro: null },
};
export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    const root = document.createElement("div");
    root.innerHTML = PAGE;
    const form = root.querySelector<HTMLFormElement>("#demo-rules")!;
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
