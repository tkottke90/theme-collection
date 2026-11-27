import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeInput, type ThemeInputProps } from "./ThemeInput.js";

const meta: Meta<ThemeInputProps> = {
  title: "Theme/Tactical React/Input",
  component: ThemeInput,
  parameters: {
    intro: {
      tag: "ThemeInput",
      title: "Input",
      description: [
        "A native input in the theme's style for text, email, password, number, checkbox and radio. Text types sit on the alt surface with a hairline border and a cyan focus ring; checkbox and radio stay native, tinted cyan.",
        "Every native prop is forwarded, so it submits under its name, resets with its form, follows fieldset disabled, and works controlled or uncontrolled.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<ThemeInputProps>;

export const Text: Story = {
  args: { type: "text", name: "text", "aria-label": "Text", placeholder: "Text" },
};

export const Email: Story = {
  args: { type: "email", name: "email", "aria-label": "Email", placeholder: "you@example.com" },
};

export const Password: Story = {
  args: { type: "password", name: "password", "aria-label": "Password", placeholder: "Password" },
};

export const Number: Story = {
  args: { type: "number", name: "quantity", "aria-label": "Quantity", placeholder: "0" },
};

export const Checkbox: Story = {
  args: { type: "checkbox", name: "ack", value: "yes", "aria-label": "Acknowledge" },
};

export const Radio: Story = {
  args: { type: "radio", name: "priority", value: "urgent", "aria-label": "Urgent" },
};

export const Disabled: Story = {
  args: {
    type: "text",
    name: "locked",
    "aria-label": "Locked",
    placeholder: "Disabled",
    disabled: true,
  },
};
