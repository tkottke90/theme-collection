import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Textarea",
  parameters: {
    intro: {
      tag: ".theme-input.theme-textarea",
      title: "Textarea",
      description: [
        'A multi-line field that shares the input\'s box, with the sans face instead of mono for prose, a 5rem minimum height and vertical resize. Pair it with theme-input (class="theme-input theme-textarea").',
        "It is a native textarea, so it submits under its name and shows the same focus, invalid and disabled states as the input.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="textarea-notes">Notes</label>
      <textarea class="theme-input theme-textarea" id="textarea-notes" name="notes" placeholder="Notes"></textarea>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <label for="textarea-locked">Notes</label>
      <textarea class="theme-input theme-textarea" id="textarea-locked" name="notes" disabled>Locked during failover</textarea>
    </div>
  `,
};
