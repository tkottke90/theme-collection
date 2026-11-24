import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeLink } from "./ThemeLink.js";

const meta: Meta<typeof ThemeLink> = {
  title: "Theme/Starter React/Link",
  component: ThemeLink,
  parameters: {
    intro: {
      tag: "ThemeLink",
      title: "Link",
      description: [
        "An inline link in the brand colour with an underline, so it stays recognisable without relying on colour alone.",
        "When copying the starter, describe your link colour on each surface, the underline treatment, and the hover and focus states.",
      ],
    },
  },
  args: { href: "#", children: "Learn more" },
};
export default meta;

type Story = StoryObj<typeof ThemeLink>;

export const Default: Story = {};
