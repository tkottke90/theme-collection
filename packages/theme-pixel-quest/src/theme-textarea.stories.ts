import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-textarea.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Textarea",
  parameters: {
    intro: {
      tag: "theme-textarea",
      title: "Textarea",
      description: [
        "A multi-line field in the input's recessed, thin-framed parchment well, resizable vertically only so the frame keeps its width.",
        "Like the input, the host is form-associated: it submits under name, resets to its value attribute, follows a disabled fieldset and takes its name from aria-label or a label.",
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
