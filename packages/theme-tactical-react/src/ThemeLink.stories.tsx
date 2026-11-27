import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeLink } from "./ThemeLink.js";

const meta: Meta<typeof ThemeLink> = {
  title: "Theme/Tactical React/Link",
  component: ThemeLink,
  parameters: {
    intro: {
      tag: "ThemeLink",
      title: "Link",
      description: [
        "An inline link in the cyan accent, underlined, darkening on hover.",
        "Keyboard focus shows the browser's focus ring.",
      ],
    },
  },
  args: { href: "#", children: "Learn more" },
};
export default meta;

type Story = StoryObj<typeof ThemeLink>;

export const Default: Story = {};
