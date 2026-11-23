import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-textarea.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Textarea",
  render: (args) =>
    html`<theme-textarea rows=${args["rows"]} placeholder=${args["placeholder"]}></theme-textarea>`,
  args: { rows: 4, placeholder: "Write something..." },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
