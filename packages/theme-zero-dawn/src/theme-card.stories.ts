import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";
import "./theme-text.js";
import "./theme-link.js";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Card",
  render: (args) =>
    html`<div style="max-width: 32rem">
      <theme-card heading=${args["heading"]}>${args["body"]}</theme-card>
    </div>`,
  args: {
    heading: "Card title",
    body: "Body copy rendered inside the default slot.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

/** Slotted typography and links pick up the plate's dark ink automatically. */
export const WithContent: Story = {
  render: () =>
    html`<div style="max-width: 32rem">
      <theme-card heading="Field notes">
        <theme-text
          >Plates overlap like scales along the neck; the darker machinery shows through every seam.
          <theme-link href="#">Read the survey</theme-link>.</theme-text
        >
        <theme-text variant="caption">Recorded at dusk</theme-text>
        <div style="margin-top: 1rem"><theme-button label="Track"></theme-button></div>
      </theme-card>
    </div>`,
};
