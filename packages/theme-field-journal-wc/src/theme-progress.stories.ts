import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-progress.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Progress",
  parameters: {
    intro: {
      tag: "theme-progress",
      title: "Progress",
      description: [
        "A pressed-in parchment track with a grainy green fill, labelled with its percentage. It exposes progressbar semantics with a value and a max.",
        "The label and percentage sit either side of the track in muted ink.",
      ],
    },
  },
  render: (args) =>
    html`<theme-progress
      label=${args["label"]}
      value=${args["value"]}
      max=${args["max"]}
    ></theme-progress>`,
  args: { label: "Overall progress", value: 42, max: 100 },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100 } };
export const WithoutLabel: Story = { args: { label: "" } };
