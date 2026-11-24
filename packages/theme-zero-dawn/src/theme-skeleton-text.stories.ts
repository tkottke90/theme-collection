import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-text.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Skeleton Text",
  parameters: {
    intro: {
      tag: "theme-skeleton-text",
      title: "Skeleton Text",
      description: [
        "Text placeholders are thinner bars with a smaller corner cut, sized to a line of body copy, so a block of them reads as paragraphs still arriving.",
        "They share the heading placeholder's steel shimmer, which stops for reduced motion.",
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
