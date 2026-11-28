import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-conduit-panel.js";
import "./theme-text.js";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Conduit Panel",
  parameters: {
    intro: {
      tag: "theme-conduit-panel",
      title: "Conduit Panel",
      description: [
        "A lighter panel, from the sheet's top-right conduit: a thin double ink rule with rounded bevels, open screw holes at the bottom corners, and an orange-striped channel across the top-right corner.",
        "The channel is sized to stay clear of content padded 28px from the top and right, and its stripes cross it rather than running along it.",
      ],
    },
  },
  render: () => html`
    <theme-conduit-panel heading="Lift controls">
      <theme-text>East lift is at deck 2 and idle.</theme-text>
      <p>
        <theme-button variant="secondary" label="Call up"></theme-button>
        <theme-button variant="secondary" label="Call down"></theme-button>
      </p>
    </theme-conduit-panel>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
