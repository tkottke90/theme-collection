import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeItem } from "./ThemeItem.js";

const meta: Meta<typeof ThemeItem> = {
  title: "Theme/Tactical React/Item",
  component: ThemeItem,
  parameters: {
    intro: {
      tag: "ThemeItem",
      title: "Item",
      description: [
        "A row inside a container: a small-radius surface with a hairline border. It renders an li by default, or a div via the as prop.",
        "Use it inside a ThemeContainer.",
      ],
    },
  },
  args: { children: "List item" },
};
export default meta;

type Story = StoryObj<typeof ThemeItem>;

export const ListItem: Story = {
  args: { as: "li" },
};

export const DivItem: Story = {
  args: { as: "div" },
};
