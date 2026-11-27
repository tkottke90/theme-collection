import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeHeading } from "./ThemeHeading.js";

const meta: Meta<typeof ThemeHeading> = {
  title: "Theme/Tactical React/Heading",
  component: ThemeHeading,
  parameters: {
    intro: {
      tag: "ThemeHeading",
      title: "Heading",
      description: [
        "Four heading levels on a tight, tracked, uppercase scale in the primary ink. Pick the level for document structure; the size follows it.",
        "Headings are labels, not sentences: keep them short.",
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
