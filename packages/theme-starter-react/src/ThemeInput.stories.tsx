import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeInput } from "./ThemeInput.js";

const meta: Meta<typeof ThemeInput> = {
  title: "Theme/Starter React/Input",
  component: ThemeInput,
};
export default meta;

type Story = StoryObj<typeof ThemeInput>;

export const Text: Story = {
  args: { type: "text", placeholder: "Text" },
};

export const Email: Story = {
  args: { type: "email", placeholder: "you@example.com" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "Password" },
};

export const Number: Story = {
  args: { type: "number", placeholder: "0" },
};

export const Checkbox: Story = {
  args: { type: "checkbox" },
};

export const Radio: Story = {
  args: { type: "radio" },
};

export const Disabled: Story = {
  args: { type: "text", placeholder: "Disabled", disabled: true },
};
