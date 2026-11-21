import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Cyber Frame/Link",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<a class="theme-link" href="#">This is a themed link</a>`,
};
