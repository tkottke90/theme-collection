import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Textarea",
  parameters: {
    intro: {
      tag: ".theme-textarea",
      title: "Textarea",
      description: [
        "The multi-line sibling of the input, with the same fill, border and focus ring. It only resizes vertically, so a user can't drag it out of its card.",
        "Placeholder text uses the muted ink so it stays readable on the parchment fill.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="textarea-example">Notes</label>
      <textarea class="theme-textarea" id="textarea-example" name="notes" rows="4" placeholder="Write something..."></textarea>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <label for="textarea-disabled">Notes</label>
      <textarea class="theme-textarea" id="textarea-disabled" name="notes-locked" rows="3" disabled>Can't edit this</textarea>
    </div>
  `,
};
