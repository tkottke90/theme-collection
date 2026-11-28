import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-heading.js";

const meta: Meta = {
  title: "Theme/Starter WC/Heading",
  parameters: {
    intro: {
      tag: "theme-heading",
      title: "Heading",
      description: [
        "Headings at four levels on a fixed type scale, from 4xl bold down to xl semibold, in the theme's sans face and neutral-900 ink. Each level renders the matching h1 to h4.",
        "Copying this starter? Describe your theme's display type: the face, the scale, and any ornament on the higher levels.",
      ],
    },
  },
  render: (args) =>
    html`<theme-heading level=${args["level"]}>Heading level ${args["level"]}</theme-heading>`,
  args: { level: 1 },
};
export default meta;

type Story = StoryObj;

export const Level1: Story = { args: { level: 1 } };
export const Level2: Story = { args: { level: 2 } };
export const Level3: Story = { args: { level: 3 } };
export const Level4: Story = { args: { level: 4 } };
