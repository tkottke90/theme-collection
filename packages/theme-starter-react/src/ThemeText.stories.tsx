import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeText } from "./ThemeText.js";

const meta: Meta<typeof ThemeText> = {
  title: "Theme/Starter React/Text",
  component: ThemeText,
  parameters: {
    intro: {
      tag: "ThemeText",
      title: "Text",
      description: [
        "Body copy, as a paragraph, and a smaller muted caption. The starter uses the theme's sans face at a comfortable reading size.",
        "When copying the starter, describe your body and caption faces, sizes and inks, and the contrast each keeps on the theme's surfaces.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeText>;

export const Body: Story = {
  args: { variant: "body", children: "Body copy rendered as a paragraph." },
};

export const Caption: Story = {
  args: { variant: "caption", children: "Caption text rendered as small print." },
};
