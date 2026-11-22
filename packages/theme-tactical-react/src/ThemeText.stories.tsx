import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeText } from "./ThemeText.js";

const meta: Meta<typeof ThemeText> = {
  title: "Theme/Tactical React/Text",
  component: ThemeText,
};
export default meta;

type Story = StoryObj<typeof ThemeText>;

export const Body: Story = {
  args: { variant: "body", children: "Body copy rendered as a paragraph." },
};

export const Caption: Story = {
  args: { variant: "caption", children: "Caption text rendered as small print." },
};
