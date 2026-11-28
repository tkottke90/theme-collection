import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-counter.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Counter",
  parameters: {
    intro: {
      tag: "theme-counter",
      title: "Counter",
      description: [
        "A big readout: the value in 2.125rem bold lime, framed by four grey corner brackets drawn as an SVG background, like the reticle around a number on a device panel.",
        'label gives screen readers a fuller reading than the bare number, for example "9 tiles left" instead of "9".',
      ],
    },
  },
  render: (args) =>
    html`<theme-counter value=${args["value"]} label=${args["label"]}></theme-counter>`,
  args: { value: "9", label: "9 tiles left" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
