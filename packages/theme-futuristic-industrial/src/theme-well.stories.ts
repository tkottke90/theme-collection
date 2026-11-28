import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-well.js";
import "./theme-button.js";
import "./theme-input.js";
import "./theme-casing.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Well",
  render: () => html`
    <theme-well>
      <theme-button variant="ghost" label="▲" aria-label="Lift up"></theme-button>
    </theme-well>
    <theme-well>
      <theme-button variant="ghost" label="▼" aria-label="Lift down"></theme-button>
    </theme-well>
  `,
};
export default meta;

type Story = StoryObj;

export const IconButtons: Story = {};

export const ControlGroup: Story = {
  render: () => html`
    <theme-well>
      <theme-input placeholder="OP-0000"></theme-input>
      <theme-button variant="primary" label="Authorize"></theme-button>
    </theme-well>
  `,
};

export const OnDark: Story = {
  render: () => html`
    <theme-casing>
      <theme-well>
        <theme-button variant="ghost" label="▲" aria-label="Lift up"></theme-button>
      </theme-well>
      <theme-well>
        <theme-button variant="ghost" label="▼" aria-label="Lift down"></theme-button>
      </theme-well>
    </theme-casing>
  `,
};
