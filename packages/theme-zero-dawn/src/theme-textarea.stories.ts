import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-textarea.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Textarea",
  parameters: {
    intro: {
      tag: "theme-textarea",
      title: "Textarea",
      description: [
        "The textarea is the input's socket stretched to several lines: the same dark well, plate-grey edge and cyan focus glow. It resizes vertically only, so it can never break the width of the layout it sits in.",
        "It is a full form control, submitting and resetting with its form.",
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
