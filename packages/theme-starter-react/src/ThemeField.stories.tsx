import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeField } from "./ThemeField.js";
import { ThemeInput } from "./ThemeInput.js";

const meta: Meta<typeof ThemeField> = {
  title: "Theme/Starter React/Field",
  component: ThemeField,
  args: {
    label: "Email address",
    htmlFor: "email-field",
    children: <ThemeInput type="email" placeholder="you@example.com" />,
  },
};
export default meta;

type Story = StoryObj<typeof ThemeField>;

export const Default: Story = {};
