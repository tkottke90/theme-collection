import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-chevron-rule.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Chevron Rule",
  render: () => html`<theme-chevron-rule></theme-chevron-rule>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Directions: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <theme-chevron-rule size="28"></theme-chevron-rule>
      <theme-chevron-rule direction="left" size="14"></theme-chevron-rule>
      <div style="height:160px;display:flex;gap:24px">
        <theme-chevron-rule direction="down" size="28"></theme-chevron-rule>
        <theme-chevron-rule direction="up" size="18"></theme-chevron-rule>
      </div>
    </div>
  `,
};
