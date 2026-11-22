import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeTextarea } from "./ThemeTextarea.js";

const meta: Meta<typeof ThemeTextarea> = {
  title: "Theme/Tactical React/Textarea",
  component: ThemeTextarea,
  args: { placeholder: "Write something...", rows: 4 },
};
export default meta;

type Story = StoryObj<typeof ThemeTextarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled" },
};
