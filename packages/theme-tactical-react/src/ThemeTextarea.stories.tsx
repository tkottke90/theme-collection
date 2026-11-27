import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeTextarea, type ThemeTextareaProps } from "./ThemeTextarea.js";

const meta: Meta<ThemeTextareaProps> = {
  title: "Theme/Tactical React/Textarea",
  component: ThemeTextarea,
  parameters: {
    intro: {
      tag: "ThemeTextarea",
      title: "Textarea",
      description: [
        "A native textarea with the same surface, border and cyan focus ring as the input. It only resizes vertically.",
        "Every native prop is forwarded, so it submits under its name, resets with its form and follows fieldset disabled.",
      ],
    },
  },
  args: { name: "message", "aria-label": "Message", placeholder: "Write something...", rows: 4 },
};
export default meta;

type Story = StoryObj<ThemeTextareaProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};
