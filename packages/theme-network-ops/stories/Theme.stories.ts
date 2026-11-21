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
