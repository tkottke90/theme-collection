import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeHeading } from "./ThemeHeading.js";

const meta: Meta<typeof ThemeHeading> = {
  title: "Theme/Starter React/Heading",
  component: ThemeHeading,
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
