import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-conduit-panel.js";
import "./theme-text.js";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Conduit Panel",
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
