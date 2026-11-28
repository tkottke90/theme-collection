import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-text.js";

const meta: Meta = {
  title: "Theme/Starter WC/Skeleton Text",
  parameters: {
    intro: {
      tag: "theme-skeleton-text",
      title: "Skeleton text",
      description: [
        "A loading placeholder for a line of body text, with the same shimmer as the skeleton heading. Stack a few at different widths to suggest a paragraph.",
        "Copying this starter? Describe your placeholder's colours and shape so it reads as the text it stands in for.",
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
