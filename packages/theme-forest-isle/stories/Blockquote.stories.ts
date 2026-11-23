import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Blockquote",
};
export default meta;

type Story = StoryObj;

function blockquote(variant: string, label: string, text: string): string {
  return `
    <blockquote class="theme-blockquote theme-blockquote--${variant}">
      <span class="theme-blockquote__label">${label}</span>
      <p class="theme-text">${text}</p>
    </blockquote>
  `;
}

export const Info: Story = {
  render: () => blockquote("info", "Info", "Here's something useful you should know."),
};

export const Tip: Story = {
  render: () => blockquote("tip", "Tip", "A helpful suggestion to make this easier."),
};

export const Question: Story = {
  render: () =>
    blockquote("question", "Question", "Something worth double-checking before you continue."),
};

export const Success: Story = {
  render: () => blockquote("success", "Success", "That worked exactly as expected."),
};

export const Warning: Story = {
  render: () => blockquote("warning", "Warning", "Proceed carefully, this has side effects."),
};

export const Failure: Story = {
  render: () =>
    blockquote("failure", "Failure", "That attempt didn't produce the expected result."),
};

export const Danger: Story = {
  render: () => blockquote("danger", "Danger", "This action cannot be undone."),
};

export const Bug: Story = {
  render: () => blockquote("bug", "Bug", "A known issue is tracked here."),
};

export const Example: Story = {
  render: () => blockquote("example", "Example", "Here's a worked example of the concept above."),
};

export const Quote: Story = {
  render: () => blockquote("quote", "Quote", "A quoted passage styled on its own."),
};
