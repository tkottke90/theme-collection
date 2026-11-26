import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-heading.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Heading",
  parameters: {
    intro: {
      tag: "theme-heading",
      title: "Heading",
      description: [
        "Four heading levels on a tight, tracked, uppercase scale in the primary ink. Pick the level for document structure; the size follows it.",
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
