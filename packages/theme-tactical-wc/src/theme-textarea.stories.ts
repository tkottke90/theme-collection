import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-textarea.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Textarea",
  parameters: {
    intro: {
      tag: "theme-textarea",
      title: "Textarea",
      description: [
        "A native textarea in a form-associated host, with the same surface, border and cyan focus ring as the input. It submits under its name, resets with its form and follows a disabled fieldset.",
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
