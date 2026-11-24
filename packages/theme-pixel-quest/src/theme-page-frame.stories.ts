import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-page-frame.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Page Frame",
  parameters: {
    intro: {
      tag: "theme-page-frame",
      title: "Page Frame",
      description: [
        "The poster's own outer border: a straight 3px near-black edge, a 2px gold pinstripe just inside it, and then the parchment page with generous padding. Unlike the panels it has square corners, because it's the edge of the sheet, not an object on it.",
        "Wrap a whole page or a large standalone sheet in it, once; nested page frames read as a mistake.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <theme-page-frame>
      <p>
        The whole-page frame the source image's own poster uses — a straight dark border with a gold
        pinstripe.
      </p>
    </theme-page-frame>
  `,
};
