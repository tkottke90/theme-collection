import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Input",
};
export default meta;

type Story = StoryObj;

export const Text: Story = {
  render: () => `<input class="theme-input" type="text" placeholder="Text input" />`,
};

export const Email: Story = {
  render: () => `<input class="theme-input" type="email" placeholder="you@example.com" />`,
};

export const Password: Story = {
  render: () => `<input class="theme-input" type="password" placeholder="Password" />`,
};

export const Number: Story = {
  render: () => `<input class="theme-input" type="number" placeholder="0" />`,
};

export const Checkbox: Story = {
  render: () => `<input class="theme-input" type="checkbox" />`,
};

export const Radio: Story = {
  render: () => `<input class="theme-input" type="radio" />`,
};
