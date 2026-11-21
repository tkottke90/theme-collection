import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Textarea",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<textarea class="theme-input theme-textarea" placeholder="Notes"></textarea>`,
};
