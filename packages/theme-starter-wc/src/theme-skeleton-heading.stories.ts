import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-heading.js";

const meta: Meta = {
  title: "Theme/Starter WC/Skeleton Heading",
  parameters: {
    intro: {
      tag: "theme-skeleton-heading",
      title: "Skeleton heading",
      description: [
        "A loading placeholder the height of a heading, filled with the theme's shared shimmer between the skeleton base and highlight tokens. The shimmer stops for people who prefer reduced motion.",
        "Copying this starter? Describe your placeholder's colours and shape so it reads as the heading it stands in for.",
      ],
    },
  },
  render: (args) => html`<theme-skeleton-heading width=${args["width"]}></theme-skeleton-heading>`,
  args: { width: "60%" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
