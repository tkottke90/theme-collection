import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-textarea.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Textarea",
  parameters: {
    intro: {
      tag: "theme-textarea",
      title: "Textarea",
      description: [
        "Input's multi-line sibling: the same surface-alt well, grey border, muted placeholder and lime focus ring, in a form-associated host that submits, resets and follows a disabled fieldset. It resizes vertically only.",
      ],
    },
  },
  render: (args) =>
    html`<theme-textarea rows=${args["rows"]} placeholder=${args["placeholder"]}></theme-textarea>`,
  args: { rows: 4, placeholder: "Write something..." },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
