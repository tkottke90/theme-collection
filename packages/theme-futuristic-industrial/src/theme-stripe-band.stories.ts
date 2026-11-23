import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-stripe-band.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Stripe Band",
  render: () => html`<theme-stripe-band></theme-stripe-band>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <theme-stripe-band size="40"></theme-stripe-band>
      <theme-stripe-band size="16" solid="0.6"></theme-stripe-band>
      <theme-stripe-band size="24" solid="0"></theme-stripe-band>
    </div>
  `,
};
