import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSelect } from "./ThemeSelect.js";

const meta: Meta<typeof ThemeSelect> = {
  title: "Theme/Starter React/Select",
  component: ThemeSelect,
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

type Story = StoryObj<typeof ThemeSelect>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
