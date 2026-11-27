import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeBlockquote } from "./ThemeBlockquote.js";

const meta: Meta<typeof ThemeBlockquote> = {
  title: "Theme/Tactical React/Blockquote",
  component: ThemeBlockquote,
  parameters: {
    intro: {
      tag: "ThemeBlockquote",
      title: "Blockquote",
      description: [
        "A callout for notes, warnings and quotes: a tinted panel (the status colour mixed into the surface) with a 4px bar of the full colour on the left and a coloured label. The ten types (info, tip, question, success, warning, failure, danger, bug, example, quote) each take their own accent from the status tokens.",
        "The label is pulled toward the ink so it stays readable on the tint; colour never carries the meaning alone.",
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
