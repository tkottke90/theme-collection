import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-text.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Skeleton Text",
  parameters: {
    intro: {
      tag: "theme-skeleton-text",
      title: "Skeleton Text",
      description: [
        "A loading placeholder for a line of body text: a shorter shimmering bar in the dark skeleton tones. Width is configurable.",
      ],
    },
  },
  render: (args) => html`
    <theme-skeleton-text width=${args["width"]}></theme-skeleton-text>
    <theme-skeleton-text width="90%"></theme-skeleton-text>
    <theme-skeleton-text width="75%"></theme-skeleton-text>
  `,
  args: { width: "100%" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
