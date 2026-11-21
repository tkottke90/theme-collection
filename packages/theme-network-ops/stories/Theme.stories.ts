import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops",
};
export default meta;

type Story = StoryObj;

export const Card: Story = {
  render: () => `
    <div class="theme-card">
      <h2 class="theme-card__title">Inbound Traffic</h2>
      <p class="theme-card__body">Node E · 10.23.84.44</p>
      <button class="theme-button theme-button--glow">View details</button>
    </div>
  `,
};

export const Button: Story = {
  render: () => `<button class="theme-button">Acknowledge</button>`,
};

export const ButtonGlow: Story = {
  render: () => `<button class="theme-button theme-button--glow">Critical alert</button>`,
};

export const Input: Story = {
  render: () => `<input class="theme-input" type="text" placeholder="10.23.43.324" />`,
};

export const Typography: Story = {
  render: () => `
    <h1>Load</h1>
    <h2>Inbound Traffic</h2>
    <h3>System status</h3>
    <h4>Chips &amp; tones</h4>
    <h5>Section label</h5>
    <p>Body copy styled with theme tokens, at a glance showing throughput across the cluster.</p>
    <small>Last updated 2 minutes ago</small>
  `,
};

export const Link: Story = {
  render: () => `<p>See the <a href="#">full traffic breakdown</a> for node E.</p>`,
};

export const Details: Story = {
  render: () => `
    <details class="theme-details" open>
      <summary>Nginx &middot; 10.23.43.324</summary>
      <p class="theme-details__body">Inbound traffic node A. No active alerts.</p>
    </details>
  `,
};

export const InputVariants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 320px">
      <input class="theme-input" type="text" placeholder="10.23.43.324" />
      <textarea class="theme-input theme-textarea" placeholder="Notes"></textarea>
      <select class="theme-input theme-select">
        <option>Nginx</option>
        <option>MySQL</option>
        <option>Couchbase</option>
      </select>
      <label class="theme-field-label">
        <input class="theme-checkbox" type="checkbox" checked />
        Alert on threshold breach
      </label>
      <label class="theme-field-label">
        <input class="theme-radio" type="radio" name="story-radio" checked />
        Scanning
      </label>
      <input class="theme-range" type="range" min="0" max="100" value="68" />
    </div>
  `,
};
