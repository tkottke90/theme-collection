import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Field",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-hostname">Hostname</label>
      <input class="theme-input" type="text" id="field-hostname" placeholder="edge-gw-04.ops.local" />
    </div>
  `,
};
