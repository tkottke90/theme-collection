import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Link",
  parameters: {
    intro: {
      tag: ".theme-link",
      title: "Link",
      description: [
        "Links use the deep sage so they read clearly on parchment, with a pale sage underline that darkens to the full ink colour on hover. Visited links take the forest green.",
        "Keyboard focus draws a sage outline around the link.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<a class="theme-link" href="#">This is a themed link</a>`,
};
