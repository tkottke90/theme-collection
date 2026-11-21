import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Textarea",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    `<textarea class="theme-textarea" rows="4" placeholder="Write something..."></textarea>`,
};
