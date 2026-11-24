import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Link",
  parameters: {
    intro: {
      tag: ".theme-link",
      title: "Link",
      description: [
        "Brand-coloured text with a pale underline that darkens to the text colour on hover. Keyboard focus draws an outline around the link.",
        "When you copy the starter, describe your link colour, underline treatment and hover, and check them for contrast on each surface they appear on.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<a class="theme-link" href="#">This is a themed link</a>`,
};
