import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Button",
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => `<button class="theme-button">Click me</button>`,
};

export const Secondary: Story = {
  render: () => `<button class="theme-button theme-button--secondary">Click me</button>`,
};

export const Ghost: Story = {
  render: () => `<button class="theme-button theme-button--ghost">Click me</button>`,
};

export const Disabled: Story = {
  render: () => `<button class="theme-button" disabled>Click me</button>`,
};
