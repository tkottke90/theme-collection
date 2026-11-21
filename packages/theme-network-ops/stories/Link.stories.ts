import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Link",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<p>See the <a href="#">full traffic breakdown</a> for node E.</p>`,
};
