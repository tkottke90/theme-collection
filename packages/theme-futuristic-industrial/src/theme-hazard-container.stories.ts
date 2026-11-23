import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-hazard-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Hazard Container",
  render: () => html`
    <theme-hazard-container>
      Restricted zone. Authorised personnel only beyond this point.
    </theme-hazard-container>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const AsList: Story = {
  render: () => html`
    <theme-hazard-container as="ul">
      <theme-item>Reactor Bay 4 — sealed</theme-item>
      <theme-item>Coolant loop B — venting</theme-item>
      <theme-item>Loading Bay 2 — clear</theme-item>
    </theme-hazard-container>
  `,
};
