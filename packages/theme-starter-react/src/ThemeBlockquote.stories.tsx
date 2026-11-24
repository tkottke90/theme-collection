import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeBlockquote } from "./ThemeBlockquote.js";

const meta: Meta<typeof ThemeBlockquote> = {
  title: "Theme/Starter React/Blockquote",
  component: ThemeBlockquote,
  parameters: {
    intro: {
      tag: "ThemeBlockquote",
      title: "Blockquote",
      description: [
        "A callout for asides and notices, in ten semantic types (info, tip, question, success, warning, failure, danger, bug, example, quote). The starter marks each with a coloured left rule, a light wash of the same colour and a type label, so colour is never the only signal.",
        "When copying the starter, describe how your theme distinguishes the types (colour, icon, shape) and how it keeps each label readable on its own background.",
      ],
    },
  },
  args: { children: "Styled blockquote content." },
};
export default meta;

type Story = StoryObj<typeof ThemeBlockquote>;

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
