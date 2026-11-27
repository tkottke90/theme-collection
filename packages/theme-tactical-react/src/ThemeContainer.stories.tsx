import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeContainer } from "./ThemeContainer.js";
import { ThemeItem } from "./ThemeItem.js";

const meta: Meta<typeof ThemeContainer> = {
  title: "Theme/Tactical React/Container",
  component: ThemeContainer,
  parameters: {
    intro: {
      tag: "ThemeContainer",
      title: "Container",
      description: [
        "A plain bordered surface: the alt-surface fill, a hairline border and the theme's small radius. It renders a div by default, or a ul or ol via the as prop, for grouping items and forms.",
        "List markers are removed, so an ol shows no numbers.",
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
