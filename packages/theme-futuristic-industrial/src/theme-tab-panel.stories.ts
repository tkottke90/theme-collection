import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-tab-panel.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Tab Panel",
  parameters: {
    intro: {
      tag: "theme-tab-panel",
      title: "Tab Panel",
      description: [
        "A thin-ruled panel whose heading sits in a raised tab, from the sheet's large outlined panel. The tab joins the body through a 45° shoulder, the top-right corner is cut, and the bottom edge has a step.",
        "The tab is sized to the rendered heading, so it fits any label.",
      ],
    },
  },
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
