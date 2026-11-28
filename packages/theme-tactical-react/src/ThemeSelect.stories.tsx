import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSelect, type ThemeSelectProps } from "./ThemeSelect.js";

const meta: Meta<ThemeSelectProps> = {
  title: "Theme/Tactical React/Select",
  component: ThemeSelect,
  parameters: {
    intro: {
      tag: "ThemeSelect",
      title: "Select",
      description: [
        "A styled native select with the same surface, border and cyan focus ring as the input. Every native prop is forwarded, so it submits under its name, resets with its form (to defaultValue), and follows fieldset disabled.",
        "The operating system draws the option list.",
      ],
    },
  },
  args: {
    name: "channel",
    "aria-label": "Channel",
    children: (
      <>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </>
    ),
  },
};
export default meta;

type Story = StoryObj<ThemeSelectProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
