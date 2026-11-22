import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeContainer } from "./ThemeContainer.js";
import { ThemeItem } from "./ThemeItem.js";

const meta: Meta<typeof ThemeContainer> = {
  title: "Theme/Tactical React/Container",
  component: ThemeContainer,
};
export default meta;

type Story = StoryObj<typeof ThemeContainer>;

export const Div: Story = {
  args: {
    as: "div",
    children: (
      <>
        <ThemeItem as="div">First</ThemeItem>
        <ThemeItem as="div">Second</ThemeItem>
      </>
    ),
  },
};

export const UnorderedList: Story = {
  args: {
    as: "ul",
    children: (
      <>
        <ThemeItem>First</ThemeItem>
        <ThemeItem>Second</ThemeItem>
      </>
    ),
  },
};

export const OrderedList: Story = {
  args: {
    as: "ol",
    children: (
      <>
        <ThemeItem>First</ThemeItem>
        <ThemeItem>Second</ThemeItem>
      </>
    ),
  },
};
