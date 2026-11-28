import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Item",
  parameters: {
    intro: {
      tag: ".theme-item",
      title: "Item",
      description: [
        "A single row or tile: a rounded sand-bordered panel on the alternate parchment fill, used for list entries inside a container.",
        "It has no hover or selected state of its own; make it a link or button inside if it should be interactive.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<div class="theme-item">A single themed item</div>`,
};
