import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-heading.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Skeleton Heading",
  parameters: {
    intro: {
      tag: "theme-skeleton-heading",
      title: "Skeleton Heading",
      description: [
        "A heading-height loading bar. It shimmers between the skeleton base and highlight tokens, two greys only a step above the page, so the placeholder reads as an unlit panel rather than a bright block. Corners use the theme radius; the shimmer stops under reduced motion.",
      ],
    },
  },
  render: (args) => html`<theme-skeleton-heading width=${args["width"]}></theme-skeleton-heading>`,
  args: { width: "60%" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
