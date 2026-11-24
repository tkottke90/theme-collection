import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-detail.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Detail",
  parameters: {
    intro: {
      tag: "theme-detail",
      title: "Detail",
      description: [
        "A collapsible panel built on the native details element. It uses the cut-corner frame with only the top-left and bottom-right corners cut, so next to a fully cut card it reads as a secondary plate.",
        "The summary is bold, uppercase, tracked lime text, and the native disclosure marker is tinted lime to match.",
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
