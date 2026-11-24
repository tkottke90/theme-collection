import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Item",
  parameters: {
    intro: {
      tag: ".theme-item",
      title: "Item",
      description: [
        "A single row: a neutral, bordered block for list entries, usually inside a theme-container.",
        "When you copy the starter, say how an item marks itself as one of a set (a bullet, a divider, a surface) in your theme.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<div class="theme-item">A single themed item</div>`,
};
