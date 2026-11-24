import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-detail.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Detail",
  parameters: {
    intro: {
      tag: "theme-detail",
      title: "Detail",
      description: [
        "A native details element inside the pixel frame. The summary is bold Courier Prime, like a quest-log entry, and the body underneath is plain Inter.",
        "Keeping the native details element means keyboard and screen-reader behaviour come free; the frame is only paint.",
      ],
    },
  },
  render: (args) =>
    html`<theme-detail summary=${args["summary"]}>${args["content"]}</theme-detail>`,
  args: {
    summary: "Click to expand",
    content: "Hidden content revealed when the detail is expanded.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
