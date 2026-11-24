import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "A panel drawn with the theme's pixel frame: a 2px near-black outline whose corners are a rasterised circle, with long shallow steps near the edges and short tight ones at the 45\u00b0 point, the way pixel art rounds a corner. The fill is the parchment page colour, so a card reads as an inked box on the poster rather than a raised surface.",
        "The optional heading is bold Courier Prime, the theme's slab typewriter face, used for every label and title that isn't a banner.",
      ],
    },
  },
  render: (args) => html` <theme-card heading=${args["heading"]}>${args["body"]}</theme-card> `,
  args: {
    heading: "Card title",
    body: "Body copy rendered inside the default slot.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
