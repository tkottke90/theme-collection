import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Input",
};
export default meta;

type Story = StoryObj;

export const Text: Story = {
  render: () => `<input class="theme-input" type="text" placeholder="10.23.43.324" />`,
};

export const Email: Story = {
  render: () => `<input class="theme-input" type="email" placeholder="oncall@network-ops.io" />`,
};

export const Password: Story = {
  render: () => `<input class="theme-input" type="password" placeholder="Access token" />`,
};

export const Number: Story = {
  render: () => `<input class="theme-input" type="number" placeholder="Threshold %" />`,
};

export const Checkbox: Story = {
  render: () => `
    <label class="theme-field-label">
      <input class="theme-checkbox" type="checkbox" checked />
      Alert on threshold breach
    </label>
  `,
};

export const Radio: Story = {
  render: () => `
    <label class="theme-field-label">
      <input class="theme-radio" type="radio" name="story-radio" checked />
      Scanning
    </label>
  `,
};

export const Range: Story = {
  render: () => `<input class="theme-range" type="range" min="0" max="100" value="68" />`,
};
