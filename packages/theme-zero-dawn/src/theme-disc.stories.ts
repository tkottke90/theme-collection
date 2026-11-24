import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-disc.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Disc",
  render: (args) =>
    html`<theme-disc
      .value=${args["value"]}
      label=${args["label"]}
      variant=${args["variant"]}
    ></theme-disc>`,
  args: { value: 64, label: "Override", variant: "dish" },
  argTypes: { variant: { control: "select", options: ["dish", "segments", "peaks"] } },
};
export default meta;

type Story = StoryObj;

export const Gauge: Story = {};
export const Spinner: Story = { args: { value: undefined, label: "Syncing" } };
export const SegmentsGauge: Story = { args: { variant: "segments" } };
export const SegmentsSpinner: Story = {
  args: { variant: "segments", value: undefined, label: "Syncing" },
};
export const PeaksGauge: Story = { args: { variant: "peaks" } };
export const PeaksSpinner: Story = {
  args: { variant: "peaks", value: undefined, label: "Syncing" },
};

/** All three faces side by side, as a gauge (top) and a spinner (bottom). */
export const Compare: Story = {
  render: () =>
    html`<div
      style="display: grid; grid-template-columns: repeat(3, auto); gap: 2.5rem 3.5rem; justify-content: start"
    >
      ${["dish", "segments", "peaks"].map(
        (v) => html`<theme-disc variant=${v} value="64" label=${v}></theme-disc>`,
      )}
      ${["dish", "segments", "peaks"].map(
        (v) => html`<theme-disc variant=${v} label="Syncing"></theme-disc>`,
      )}
    </div>`,
};
