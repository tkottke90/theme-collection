import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Select",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <select class="theme-input theme-select">
      <option>Nginx</option>
      <option>MySQL</option>
      <option>Couchbase</option>
    </select>
  `,
};
