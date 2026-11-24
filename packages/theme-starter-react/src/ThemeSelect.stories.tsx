import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSelect, type ThemeSelectProps } from "./ThemeSelect.js";

const meta: Meta<ThemeSelectProps> = {
  title: "Theme/Starter React/Select",
  component: ThemeSelect,
  parameters: {
    intro: {
      tag: "ThemeSelect",
      title: "Select",
      description: [
        "A native select in the theme's style, taking option children. It forwards every native prop, submits under its name, and resets to its defaultValue (or the option marked selected).",
        "When copying the starter, describe the select's surface and its arrow. Keep the native element so keyboard use and form behaviour stay intact.",
      ],
    },
  },
  args: {
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
