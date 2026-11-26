import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-heading.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Skeleton Heading",
  parameters: {
    intro: {
      tag: "theme-skeleton-heading",
      title: "Skeleton Heading",
      description: [
        "A loading placeholder for a heading: a shimmering bar in the dark skeleton tones. Width is configurable.",
      ],
    },
  },
  render: (args) => html`<theme-skeleton-heading width=${args["width"]}></theme-skeleton-heading>`,
  args: { width: "60%" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
