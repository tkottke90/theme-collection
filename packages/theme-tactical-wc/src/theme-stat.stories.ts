import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-stat.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Stat",
  parameters: {
    intro: {
      tag: "theme-stat",
      title: "Stat",
      description: [
        "A large numeric readout in the same HUD frame as the card: a tracked muted label above a monospace cyan value with an optional unit.",
      ],
    },
  },
  render: (args) =>
    html`<theme-stat
      label=${args["label"]}
      value=${args["value"]}
      unit=${args["unit"]}
    ></theme-stat>`,
  args: { label: "System Status", value: "1565", unit: "" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const WithUnit: Story = {
  args: { label: "Altitude", value: "12800", unit: "ft" },
};

/** See theme-card.stories.ts for why `data-theme` is set on the element itself. */
export const Light: Story = {
  render: (args) =>
    html`<theme-stat
      data-theme="light"
      label=${args["label"]}
      value=${args["value"]}
    ></theme-stat>`,
};
