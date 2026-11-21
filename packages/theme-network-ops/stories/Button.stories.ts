import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Button",
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => `<button class="theme-button">Acknowledge</button>`,
};

export const Secondary: Story = {
  render: () => `<button class="theme-button theme-button--secondary">Dismiss</button>`,
};

export const Ghost: Story = {
  render: () => `<button class="theme-button theme-button--ghost">View raw logs</button>`,
};

export const Disabled: Story = {
  render: () => `<button class="theme-button" disabled>Acknowledge</button>`,
};

export const Glow: Story = {
  render: () => `<button class="theme-button theme-button--glow">Critical alert</button>`,
};
