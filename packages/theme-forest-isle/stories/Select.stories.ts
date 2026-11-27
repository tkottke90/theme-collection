import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Select",
  parameters: {
    intro: {
      tag: ".theme-select",
      title: "Select",
      description: [
        "A native select dressed like the text input: the same parchment fill, sand border, rounded corners and sage focus ring, so a form's fields read as one family.",
        "It is a real select, so it submits under its name, resets with its form, and the operating system draws the option list.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="select-example">Island</label>
      <select class="theme-select" id="select-example" name="island">
        <option value="one">Option one</option>
        <option value="two">Option two</option>
        <option value="three">Option three</option>
      </select>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <label for="select-disabled">Island</label>
      <select class="theme-select" id="select-disabled" name="island-locked" disabled>
        <option value="one">Option one</option>
      </select>
    </div>
  `,
};
