import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Card",
  parameters: {
    intro: {
      tag: ".theme-card",
      title: "Card",
      description: [
        "The main surface: parchment on the slightly darker page, with the theme's generous rounding and a soft warm shadow instead of a border. Its direct children are spaced 0.75rem apart.",
        "Cards hold headings, text and actions; put form fields inside one for a settings panel.",
      ],
    },
  },
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
