import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Link",
  parameters: {
    intro: {
      tag: "a",
      title: "Link",
      description: [
        "Links are plain a elements, styled by the stylesheet with no class. They use the lighter indigo, underlined at 40% opacity that goes solid on hover, and a deeper indigo while pressed.",
        "Keyboard focus draws a 2px indigo outline offset from the text.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<p>See the <a href="#">full traffic breakdown</a> for node E.</p>`,
};
