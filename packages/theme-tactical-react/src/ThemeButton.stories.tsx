import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeButton, type ThemeButtonProps } from "./ThemeButton.js";

const meta: Meta<ThemeButtonProps> = {
  title: "Theme/Tactical React/Button",
  component: ThemeButton,
  parameters: {
    intro: {
      tag: "ThemeButton",
      title: "Button",
      description: [
        "A button in three variants. Primary is a solid cyan plate with a glow; secondary is an outlined cyan label on the dark ground; ghost drops the outline. Labels are uppercase and tracked like HUD readouts.",
        'It renders a native button, so type="submit" and type="reset" act on the surrounding form and a ref reaches the element. Disabled drops to the alt surface with muted ink.',
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
