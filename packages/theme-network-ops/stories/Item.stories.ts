import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Item",
  parameters: {
    intro: {
      tag: ".theme-item",
      title: "Item",
      description: [
        "One row in a container: the raised surface step, a 1px border and 0.5rem corners. It is the smallest unit of a list, such as a host, an alert or a step.",
        "It is a plain block with no states of its own. Put a link or button inside it for something interactive.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<div class="theme-item">Nginx &middot; 10.23.43.324</div>`,
};
