import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-heading.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Heading",
  parameters: {
    intro: {
      tag: "theme-heading",
      title: "Heading",
      description: [
        "Headings are set in Saira, a squared display face, in tracked capitals. Levels 1 and 2 carry a painted ornament: tapered rules either side of a diamond bead.",
        "The ornament is centred on the text, not the container. Text and ornament share a column that shrinks to the text's width, and the letter-spacing after the last letter is cancelled so the bead lands on the visual centre. When a heading wraps, CSS can no longer find its longest line, so the heading measures its own lines and positions the ornament under the widest one.",
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
