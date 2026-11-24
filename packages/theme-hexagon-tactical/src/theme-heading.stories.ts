import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-heading.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Heading",
  parameters: {
    intro: {
      tag: "theme-heading",
      title: "Heading",
      description: [
        "Headings are Chakra Petch in the light text colour. Levels 1 and 2 are bold, uppercase and tracked like panel stencilling (1.875rem and 1.5rem). Levels 3 and 4 are semibold sentence case (1.25rem and 1.125rem), for titles inside panels where uppercase would shout.",
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
