import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Select",
  parameters: {
    intro: {
      tag: ".theme-select",
      title: "Select",
      description: [
        "A native select styled to match the text inputs: same border, focus ring, invalid and disabled states. It keeps the browser's own dropdown, so it works with forms and assistive technology unchanged.",
        "When you copy the starter, describe how your select matches (or deliberately differs from) your input, including its arrow.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

const options = `
  <option value="one">Option one</option>
  <option value="two">Option two</option>
  <option value="three">Option three</option>
`;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="select-default">Choose one</label>
      <select class="theme-select" id="select-default" name="choice">${options}</select>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <label for="select-disabled">Choose one</label>
      <select class="theme-select" id="select-disabled" name="choice" disabled>${options}</select>
    </div>
  `,
};
