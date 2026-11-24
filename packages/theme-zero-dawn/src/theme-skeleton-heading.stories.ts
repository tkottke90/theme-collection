import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-heading.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Skeleton Heading",
  parameters: {
    intro: {
      tag: "theme-skeleton-heading",
      title: "Skeleton Heading",
      description: [
        "Loading placeholders keep the theme's geometry: the bars have cut corners rather than the rounded pills most skeletons use, so a loading panel already looks like the plate it is about to become.",
        "The shimmer travels between two steel tones from the theme rather than a generic grey, and stops entirely for viewers who prefer reduced motion.",
      ],
    },
  },
  render: (args) => html`<theme-skeleton-heading width=${args["width"]}></theme-skeleton-heading>`,
  args: { width: "60%" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
