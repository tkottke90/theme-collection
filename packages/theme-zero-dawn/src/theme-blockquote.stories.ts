import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-blockquote.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Blockquote",
  parameters: {
    intro: {
      tag: "theme-blockquote",
      title: "Blockquote",
      description: [
        "Callouts pair the two material languages. The steel plate is machine-made; the band down its left edge and the label chip are painted, their edges roughened by a fractal-noise displacement filter so they read as dry brush rather than vector fills. Each of the ten types has its own original glyph on the chip.",
        "The colours are the tribal paint palette, with two shifted darker within their hue to pass contrast. Each chip's text colour is chosen per fill, paint-white on the deep colours and core-dark on ochre, amber, cyan and plate, and the label always names the type, so colour is never the only signal.",
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
