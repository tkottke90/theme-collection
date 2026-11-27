import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Detail",
  parameters: {
    intro: {
      tag: ".theme-detail",
      title: "Detail",
      description: [
        "A native details/summary disclosure on a raised parchment card, with a serif summary so it reads like a heading in a field journal.",
        "The disclosure works without JavaScript; keyboard focus draws an outline around the summary.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <details class="theme-detail">
      <summary>Click to expand</summary>
      <p class="theme-text">Hidden content revealed once the detail is expanded.</p>
    </details>
  `,
};
