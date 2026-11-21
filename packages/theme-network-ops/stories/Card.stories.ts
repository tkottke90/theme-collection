import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Card",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-card">
      <h2 class="theme-card__title">Inbound Traffic</h2>
      <p class="theme-card__body">Node E &middot; 10.23.84.44</p>
      <button class="theme-button theme-button--glow">View details</button>
    </div>
  `,
};
