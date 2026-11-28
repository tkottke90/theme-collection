import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Input",
  parameters: {
    intro: {
      tag: ".theme-input, .theme-checkbox, .theme-radio, .theme-range",
      title: "Input",
      description: [
        "Text-like inputs are a recessed raised-surface box with a 1px border and monospace text, since values here are addresses and thresholds. Focus turns the border indigo with a matching 1px ring, invalid turns it rose, and disabled flattens it to the page colour with muted ink.",
        "Checkboxes, radios and ranges are native controls painted with accent-color, so they keep their own keyboard and form behaviour. Every control here has a name and a label, so it submits with its form.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

// Every input has a name, so it submits with a <form>, and an accessible
// label (aria-label for a lone input, a wrapping <label> for the rest).

export const Text: Story = {
  render: () =>
    `<input class="theme-input" type="text" name="address" aria-label="Address" placeholder="10.23.43.324" />`,
};

export const Email: Story = {
  render: () =>
    `<input class="theme-input" type="email" name="email" aria-label="Email" placeholder="oncall@network-ops.io" />`,
};

export const Password: Story = {
  render: () =>
    `<input class="theme-input" type="password" name="token" aria-label="Access token" placeholder="Access token" />`,
};

export const Number: Story = {
  render: () =>
    `<input class="theme-input" type="number" name="threshold" aria-label="Threshold" placeholder="Threshold %" min="0" max="100" />`,
};

export const Checkbox: Story = {
  render: () => `
    <label class="theme-field-label">
      <input class="theme-checkbox" type="checkbox" name="alert" value="yes" checked />
      Alert on threshold breach
    </label>
  `,
};

export const Radio: Story = {
  render: () => `
    <label class="theme-field-label">
      <input class="theme-radio" type="radio" name="mode" value="scanning" checked />
      Scanning
    </label>
  `,
};

export const Range: Story = {
  render: () =>
    `<input class="theme-range" type="range" name="load" aria-label="Load" min="0" max="100" value="68" />`,
};

export const Invalid: Story = {
  render: () =>
    `<input class="theme-input" type="email" name="email" aria-label="Email" value="not-an-email" aria-invalid="true" />`,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <input class="theme-input" type="text" name="locked" aria-label="Locked" value="Read-only host" disabled />
      <label class="theme-field-label">
        <input class="theme-checkbox" type="checkbox" name="locked-check" checked disabled />
        Disabled checkbox
      </label>
      <input class="theme-range" type="range" name="locked-range" aria-label="Locked range" value="40" disabled />
    </div>
  `,
};
