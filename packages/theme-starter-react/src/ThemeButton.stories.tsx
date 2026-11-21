import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeButton } from "./ThemeButton.js";

const meta: Meta<typeof ThemeButton> = {
  title: "Theme/Starter React/Button",
  component: ThemeButton,
  args: { label: "Click me" },
};
export default meta;

type Story = StoryObj<typeof ThemeButton>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: { label: "Submit" },
};
