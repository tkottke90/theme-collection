import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Select",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <select class="theme-select">
      <option>Option one</option>
      <option>Option two</option>
      <option>Option three</option>
    </select>
  `,
};
