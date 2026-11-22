import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeViewfinder } from "./ThemeViewfinder.js";

const meta: Meta<typeof ThemeViewfinder> = {
  title: "Theme/Tactical React/Viewfinder",
  component: ThemeViewfinder,
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
