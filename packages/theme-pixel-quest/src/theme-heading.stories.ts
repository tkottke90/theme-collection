import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-heading.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Heading",
  parameters: {
    intro: {
      tag: "theme-heading",
      title: "Heading",
      description: [
        "Plain headings are bold Courier Prime in dark brown ink, on a 2.25 / 1.75 / 1.375 / 1.125rem scale for levels 1 to 4.",
        "The banner variant is the poster's own title treatment: the heading inside the three-layer badge (near-black edge, gold ring, forest-green fill) set in Pixelify Sans, a true pixel bitmap face, in cream. Use it for page and section titles, sparingly.",
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

export const Banner: Story = {
  render: () =>
    html`<theme-heading level="1" banner>Your Real-Life Character Stats</theme-heading>`,
};
