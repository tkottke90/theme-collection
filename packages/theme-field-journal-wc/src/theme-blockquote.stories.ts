import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-blockquote.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Blockquote",
  parameters: {
    intro: {
      tag: "theme-blockquote",
      title: "Blockquote",
      description: [
        "A callout set into the page: a tinted cream panel with a coloured left rule and a small-caps label. Ten types (info, tip, question, success, warning, failure, danger, bug, example, quote) each take a hue from the theme's category palette so they stay distinct but never louder than the page.",
        "The ink on each panel stays the dark brown body colour; the thick left rule carries the type's pure colour, a thinner border in a softer shade of it outlines the other three edges, and the label is that colour blended into the brown so it stays readable.",
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
