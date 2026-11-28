import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Skeleton Text",
  parameters: {
    intro: {
      tag: "theme-skeleton-text",
      title: "Skeleton Text",
      description: [
        "A loading placeholder at body-text height: a square-cornered bar shimmering between the two lightest neutrals. Stack a few, the last one shorter, to stand in for a paragraph.",
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
