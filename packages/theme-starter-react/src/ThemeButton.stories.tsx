import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeButton, type ThemeButtonProps } from "./ThemeButton.js";

const meta: Meta<ThemeButtonProps> = {
  title: "Theme/Starter React/Button",
  component: ThemeButton,
  parameters: {
    intro: {
      tag: "ThemeButton",
      title: "Button",
      description: [
        'The theme\'s action control, in primary, secondary and ghost variants, rendered as a native button (type="button" by default, or submit and reset inside a form). The starter keeps it plain: a filled brand button, a tinted one, and a text-only one, all with the shared rounded corner.',
        "When copying the starter, describe your button's shape and depth, what each variant is for, and how hover, press, focus and disabled states look.",
      ],
    },
  },
  args: { label: "Click me" },
};
export default meta;

type Story = StoryObj<ThemeButtonProps>;

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
