import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-chevron-rule.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Chevron Rule",
  parameters: {
    intro: {
      tag: "theme-chevron-rule",
      title: "Chevron Rule",
      description: [
        "A directional divider: a row of chunky chevrons, with proportions measured from the uncropped chevron stack in the middle of the sheet.",
        "It points right, left, down or up, and only ever shows whole chevrons, centred along its length. Assistive technology treats it as a separator.",
      ],
    },
  },
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
