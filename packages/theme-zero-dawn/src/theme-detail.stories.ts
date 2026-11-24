import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-detail.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Detail",
  parameters: {
    intro: {
      tag: "theme-detail",
      title: "Detail",
      description: [
        "A collapsible steel plate. The marker is a solid triangle that turns to point down when open, in the theme's chevron vocabulary, and the summary is set in the display face's tracked capitals.",
        "The plate frame is drawn in SVG and redraws as the panel opens, so its cut corners and bevel follow the new height instead of stretching. It deliberately omits the seam notch the cards carry: at a collapsed panel's thin height the notch read as a rendering glitch.",
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
