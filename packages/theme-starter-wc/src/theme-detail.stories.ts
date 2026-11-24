import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-detail.js";

const meta: Meta = {
  title: "Theme/Starter WC/Detail",
  parameters: {
    intro: {
      tag: "theme-detail",
      title: "Detail",
      description: [
        "A collapsible section built on the native details element, so it opens with the keyboard and needs no script. The summary row toggles the slotted content.",
        "Copying this starter? Describe how your theme shows the open and closed states (marker, motion, surface).",
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
