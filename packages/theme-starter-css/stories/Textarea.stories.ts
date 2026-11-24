import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Textarea",
  parameters: {
    intro: {
      tag: ".theme-textarea",
      title: "Textarea",
      description: [
        "A multi-line native textarea with the same border, focus, invalid and disabled states as the input. It resizes vertically only, so it never breaks a layout's width.",
        "When you copy the starter, describe your textarea alongside your input: what they share and anything that differs.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="textarea-default">Message</label>
      <textarea class="theme-textarea" id="textarea-default" name="message" rows="4" placeholder="Write something..."></textarea>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <label for="textarea-disabled">Message</label>
      <textarea class="theme-textarea" id="textarea-disabled" name="message" rows="4" disabled>Read-only for now.</textarea>
    </div>
  `,
};
