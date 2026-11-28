import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-text.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Skeleton Text",
  parameters: {
    intro: {
      tag: "theme-skeleton-text",
      title: "Skeleton Text",
      description: [
        "A line-height loading bar with the same dark shimmer as Skeleton Heading. Stack several with decreasing widths to suggest a paragraph.",
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
