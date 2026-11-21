import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Cyber Frame/Field",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-example">Email address</label>
      <input class="theme-input" type="email" id="field-example" placeholder="you@example.com" />
    </div>
  `,
};
