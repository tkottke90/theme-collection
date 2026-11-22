import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeBlockquote } from "./ThemeBlockquote.js";

const meta: Meta<typeof ThemeBlockquote> = {
  title: "Theme/Tactical React/Blockquote",
  component: ThemeBlockquote,
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
