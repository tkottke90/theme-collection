import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-tab-panel.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Tab Panel",
  render: (args) => html`
    <theme-tab-panel heading=${args["heading"]}>
      <theme-text
        >Deck 3 is sealed for maintenance. Route all cargo through the east lift until the shift
        ends.</theme-text
      >
    </theme-tab-panel>
  `,
  args: { heading: "Sector map" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const LongHeading: Story = {
  args: { heading: "Structural integrity report" },
};
