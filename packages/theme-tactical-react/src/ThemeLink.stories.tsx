import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeLink } from "./ThemeLink.js";

const meta: Meta<typeof ThemeLink> = {
  title: "Theme/Tactical React/Link",
  component: ThemeLink,
  args: { href: "#", children: "Learn more" },
};
export default meta;

type Story = StoryObj<typeof ThemeLink>;

export const Default: Story = {};
