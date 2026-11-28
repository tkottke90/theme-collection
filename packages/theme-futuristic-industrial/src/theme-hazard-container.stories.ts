import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-hazard-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Hazard Container",
  parameters: {
    intro: {
      tag: "theme-hazard-container",
      title: "Hazard Container",
      description: [
        "A container framed in the sheet's hazard tape: an orange band with charcoal stripes inset from both edges, cut at the top-right and bottom-left like the bar's ends. The stripes are one continuous pattern, so they turn the corners instead of restarting on each edge.",
        'variant="light" is the quieter tape from the sheet\'s right edge: darker orange stripes and edges on a light band, for areas that need marking but not alarm.',
      ],
    },
  },
  render: () => html`
    <theme-hazard-container>
      Restricted zone. Authorised personnel only beyond this point.
    </theme-hazard-container>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Light: Story = {
  render: () => html`
    <theme-hazard-container variant="light">
      Maintenance in progress. Keep clear of the lift shaft.
    </theme-hazard-container>
  `,
};

export const AsList: Story = {
  render: () => html`
    <theme-hazard-container as="ul">
      <theme-item>Reactor Bay 4 — sealed</theme-item>
      <theme-item>Coolant loop B — venting</theme-item>
      <theme-item>Loading Bay 2 — clear</theme-item>
    </theme-hazard-container>
  `,
};
