import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeViewfinder } from "./ThemeViewfinder.js";

const meta: Meta<typeof ThemeViewfinder> = {
  title: "Theme/Tactical React/Viewfinder",
  component: ThemeViewfinder,
  parameters: {
    intro: {
      tag: "ThemeViewfinder",
      title: "Viewfinder",
      description: [
        "A content panel framed like a camera viewfinder: a tab-notch at the top and corner brackets in cyan, resizing with its content. An optional heading sits above the children.",
        "Like the card, give it room rather than a fixed height.",
      ],
    },
  },
  args: {
    heading: "Target lock",
    children: "Body copy rendered as children.",
  },
};
export default meta;

type Story = StoryObj<typeof ThemeViewfinder>;

export const Default: Story = {};

export const NoHeading: Story = {
  args: { heading: "", children: "A viewfinder panel with no heading." },
};
