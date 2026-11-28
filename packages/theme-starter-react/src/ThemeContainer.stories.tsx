import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeContainer } from "./ThemeContainer.js";
import { ThemeItem } from "./ThemeItem.js";

const meta: Meta<typeof ThemeContainer> = {
  title: "Theme/Starter React/Container",
  component: ThemeContainer,
  parameters: {
    intro: {
      tag: "ThemeContainer",
      title: "Container",
      description: [
        "A grouping surface that renders as a div, ul or ol, usually holding ThemeItem rows. The starter draws it as a quiet neutral panel so the items inside carry the detail.",
        "When copying the starter, explain how the container differs from a card in your theme and how list semantics (bullets, numbers) are drawn.",
      ],
    },
  },
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
