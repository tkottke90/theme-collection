import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-plate.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Plate",
  parameters: {
    intro: {
      tag: "theme-plate",
      title: "Plate",
      description: [
        "A stencilled ID readout like the sheet's “CODE-13-V-2-44” and “MOD:X5C” tags: a small label over a monospace value.",
        "Its plate cuts the opposite corners to Card's (top-right and bottom-left), with the hazard strip on the bottom-left cut, so it doesn't read as a small Card.",
      ],
    },
  },
  render: (args) => html`<theme-plate label=${args["label"]} value=${args["value"]}></theme-plate>`,
  args: { label: "Code", value: "13-V-2-44" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const ModelTag: Story = {
  args: { label: "Mod", value: "X5C" },
};
