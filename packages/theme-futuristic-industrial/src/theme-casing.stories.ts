import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-casing.js";
import "./theme-text.js";
import "./theme-link.js";
import "./theme-button.js";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Casing",
  parameters: {
    intro: {
      tag: "theme-casing",
      title: "Casing",
      description: [
        "The theme's dark surface, from the sheet's mechanical-arm body: a charcoal panel with rounded corners, a thin inset rule, a rivet in each corner and a strip of hazard tape set into the bottom edge.",
        "Text, headings, links, list items and field labels slotted inside switch to light, contrast-checked colours. Light panels placed inside it, such as a Card or Detail, keep their own dark-on-light text.",
      ],
    },
  },
  render: () => html`
    <theme-casing heading="Reactor control">
      <theme-text>Core output holding at 92% of rated load.</theme-text>
      <theme-text variant="caption">Last calibrated 04:12 by OP-1182.</theme-text>
      <p><theme-link href="#">Open the reactor log</theme-link></p>
      <theme-button variant="primary" label="Vent"></theme-button>
      <theme-button variant="secondary" label="Hold"></theme-button>
    </theme-casing>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

/** A light Card inside the casing keeps its own dark-on-light text. */
export const WithNestedCard: Story = {
  render: () => html`
    <theme-casing heading="Bay 4">
      <theme-card heading="Seal status">
        <theme-text>All six seals verified.</theme-text>
      </theme-card>
    </theme-casing>
  `,
};
