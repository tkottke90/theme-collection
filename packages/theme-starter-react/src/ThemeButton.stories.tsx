import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeButton } from "./ThemeButton.js";

const meta: Meta<typeof ThemeButton> = {
  title: "Theme/Starter React/Button",
  component: ThemeButton,
  args: { label: "Click me" },
};
export default meta;

type Story = StoryObj<typeof ThemeButton>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ghost" },
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};
