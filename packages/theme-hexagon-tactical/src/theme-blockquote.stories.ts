import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-blockquote.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Blockquote",
  parameters: {
    intro: {
      tag: "theme-blockquote",
      title: "Blockquote",
      description: [
        "A callout on the cut-corner panel frame. Each of the ten types recolours the panel's border layer with its status token, the same mechanism the frame uses for its lime accent and red alert borders, and repeats the colour in a small uppercase type label above the content.",
        "The status colours stay inside the theme's palette: info borrows the blue tile ring, success the lime brand, example the rust tile ring and quote the muted text grey.",
      ],
    },
  },
  render: (args) =>
    html`<theme-blockquote type=${args["type"]}>${args["content"]}</theme-blockquote>`,
  args: { content: "A blockquote styled with theme tokens." },
};
export default meta;

type Story = StoryObj;

export const Info: Story = { args: { type: "info" } };
export const Tip: Story = { args: { type: "tip" } };
export const Question: Story = { args: { type: "question" } };
export const Success: Story = { args: { type: "success" } };
export const Warning: Story = { args: { type: "warning" } };
export const Failure: Story = { args: { type: "failure" } };
export const Danger: Story = { args: { type: "danger" } };
export const Bug: Story = { args: { type: "bug" } };
export const Example: Story = { args: { type: "example" } };
export const Quote: Story = { args: { type: "quote" } };
