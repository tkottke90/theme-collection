import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-circuit.js";
import "./theme-heading.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Circuit",
  render: (args) =>
    html`<theme-circuit ?glow=${args["glow"]}>
      <theme-heading level="1">The world remade</theme-heading>
      <theme-text>Nothing logged here yet.</theme-text>
    </theme-circuit>`,
  args: { glow: false },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const Glow: Story = { args: { glow: true } };
