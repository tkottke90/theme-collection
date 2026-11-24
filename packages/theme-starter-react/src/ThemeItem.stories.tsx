import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeItem } from "./ThemeItem.js";

const meta: Meta<typeof ThemeItem> = {
  title: "Theme/Starter React/Item",
  component: ThemeItem,
  parameters: {
    intro: {
      tag: "ThemeItem",
      title: "Item",
      description: [
        "One row inside a ThemeContainer, rendered as an li or a div. The starter gives each row its own white tile so lists read as a stack.",
        "When copying the starter, describe your list marker or row treatment and how rows are separated.",
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
