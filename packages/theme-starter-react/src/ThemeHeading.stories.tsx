import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeHeading } from "./ThemeHeading.js";

const meta: Meta<typeof ThemeHeading> = {
  title: "Theme/Starter React/Heading",
  component: ThemeHeading,
  parameters: {
    intro: {
      tag: "ThemeHeading",
      title: "Heading",
      description: [
        "Display headings for levels 1 to 4, each rendering the matching h1 to h4. The starter steps the size down per level in the theme's sans face, bold, with no ornament.",
        "When copying the starter, describe your heading face, weight, case and tracking per level, and any ornament or rule that marks the top levels.",
      ],
    },
  },
  args: { children: "Heading text" },
};
export default meta;

type Story = StoryObj<typeof ThemeHeading>;

export const Level1: Story = {
  args: { level: 1 },
};

export const Level2: Story = {
  args: { level: 2 },
};

export const Level3: Story = {
  args: { level: 3 },
};

export const Level4: Story = {
  args: { level: 4 },
};
