import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeTextarea, type ThemeTextareaProps } from "./ThemeTextarea.js";

const meta: Meta<ThemeTextareaProps> = {
  title: "Theme/Starter React/Textarea",
  component: ThemeTextarea,
  parameters: {
    intro: {
      tag: "ThemeTextarea",
      title: "Textarea",
      description: [
        "A native, vertically resizable textarea that matches ThemeInput. It forwards every native prop, submits under its name and resets to its defaultValue.",
        "When copying the starter, describe it alongside the input: the same well, border and focus ring.",
      ],
    },
  },
  args: { placeholder: "Write something...", rows: 4 },
};
export default meta;

type Story = StoryObj<ThemeTextareaProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};
