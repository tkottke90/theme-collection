import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Select",
  parameters: {
    intro: {
      tag: ".theme-input.theme-select",
      title: "Select",
      description: [
        'A native select that shares the input\'s box: raised surface, 1px border, indigo focus ring. Pair it with theme-input (class="theme-input theme-select"), which supplies the box; theme-select adds the sans face and pointer cursor.',
        "It is a real select, so it submits under its name, follows fieldset disabled, and turns rose when invalid.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="select-service">Service</label>
      <select class="theme-input theme-select" id="select-service" name="service">
        <option value="nginx">Nginx</option>
        <option value="mysql">MySQL</option>
        <option value="couchbase">Couchbase</option>
      </select>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <label for="select-locked">Service</label>
      <select class="theme-input theme-select" id="select-locked" name="service" disabled>
        <option>Nginx</option>
      </select>
    </div>
  `,
};
