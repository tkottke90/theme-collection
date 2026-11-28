import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-blockquote.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Blockquote",
  parameters: {
    intro: {
      tag: "theme-blockquote",
      title: "Blockquote",
      description: [
        "A callout in the same thin pixel frame as the cards: a dark 2px outline with pixel-stepped round corners on parchment, plus a thick 4px left rule in the type's accent colour.",
        "Ten types (info, tip, question, success, warning, failure, danger, bug, example, quote) each pair a muted, earthy ink with a semibold label in the same colour. The accents are deliberately desaturated so they sit on parchment like old print, not like neon status lights.",
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
