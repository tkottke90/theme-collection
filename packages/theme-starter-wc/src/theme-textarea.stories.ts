import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-textarea.js";

const meta: Meta = {
  title: "Theme/Starter WC/Textarea",
  parameters: {
    intro: {
      tag: "theme-textarea",
      title: "Textarea",
      description: [
        "A native textarea in a form-associated host, styled like the text input, that resizes vertically. Like the other controls it submits, resets and forwards its accessible name.",
        "Copying this starter? Keep the form behaviour and describe how your multi-line field differs from the single-line one, if it does.",
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
