import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeInput, type ThemeInputProps } from "./ThemeInput.js";

const meta: Meta<ThemeInputProps> = {
  title: "Theme/Starter React/Input",
  component: ThemeInput,
  parameters: {
    intro: {
      tag: "ThemeInput",
      title: "Input",
      description: [
        "A native input in the theme's style for text, email, password, number, checkbox and radio. Every native prop is forwarded, so it submits under its name, resets with its form, follows fieldset disabled, and works controlled or uncontrolled.",
        "When copying the starter, describe the input's well or border, its focus ring, and how checkboxes and radios are drawn. Keep the native element: it is what makes the control form-ready.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<ThemeInputProps>;

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
