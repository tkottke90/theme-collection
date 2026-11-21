import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeItem } from "./ThemeItem.js";

const meta: Meta<typeof ThemeItem> = {
  title: "Theme/Starter React/Item",
  component: ThemeItem,
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
