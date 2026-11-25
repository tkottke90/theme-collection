import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-detail.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Detail",
  parameters: {
    intro: {
      tag: "theme-detail",
      title: "Detail",
      description: [
        "A disclosure built on the native details element, in the same bordered surface as the container. The summary is set in the cyan accent and the body stays in the standard ink.",
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
