import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Card",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-card">
      <h2 class="theme-heading theme-heading--h2">Overview</h2>
      <p class="theme-text">Island rating: 4 stars. 8 of 10 residents moved in.</p>
      <button class="theme-button">View map</button>
    </div>
  `,
};
