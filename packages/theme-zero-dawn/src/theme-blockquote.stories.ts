import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-blockquote.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Blockquote",
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
