import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-disc.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Disc",
  parameters: {
    intro: {
      tag: "theme-disc",
      title: "Disc",
      description: [
        "A radial gauge with a value, and a spinner without one, in three faces. The dish is a ten-sided raised plate with five bevelled panels, each shaded by the direction it actually faces. Segments is a ring of plate segments that shows its number in the core. Peaks is a ring of painted triangles around the divider's medallion.",
        "In every face the structure stays still and only the light moves. The dish's cyan arc travels the rim while its core breathes in brightness, never in size; a cyan pulse runs round the segments; a lit run ratchets round the peaks. All three stop moving for reduced motion and keep a still in-progress state.",
      ],
    },
  },
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
  parameters: { intro: null },
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
