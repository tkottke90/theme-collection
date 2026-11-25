import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-detail.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Detail",
  parameters: {
    intro: {
      tag: "theme-detail",
      title: "Detail",
      description: [
        "A collapsible section built on a native details element, so it keeps keyboard and screen-reader behaviour. The summary is set in the theme's title face in brand red, on a grainy cream panel with a tan border.",
        "The body sits on the same panel under the summary.",
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
