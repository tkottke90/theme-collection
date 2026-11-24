import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Card",
  parameters: {
    intro: {
      tag: ".theme-card",
      title: "Card",
      description: [
        "The theme's primary surface: a lightly tinted brand panel with a hairline border and the shared corner radius. It sets ink colour and font for whatever goes inside it.",
        "When you copy the starter, explain what a card is made of in your theme (fill, edge, depth, corners) and what kind of content it is meant to hold.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-card">
      <h3 class="theme-heading theme-heading--h3">Card title</h3>
      <p class="theme-text">Body copy styled with theme tokens.</p>
      <button class="theme-button">Action</button>
    </div>
  `,
};
