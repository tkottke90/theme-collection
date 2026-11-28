import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-skeleton-heading.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Skeleton Heading",
  parameters: {
    intro: {
      tag: "theme-skeleton-heading",
      title: "Skeleton Heading",
      description: [
        "A heading-height placeholder bar with square corners, a shade darker than the page, with a lighter parchment highlight sweeping across it while content loads. Set its width to roughly the length of the heading it stands in for.",
      ],
    },
  },
  render: (args) => html`<theme-skeleton-heading width=${args["width"]}></theme-skeleton-heading>`,
  args: { width: "60%" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
