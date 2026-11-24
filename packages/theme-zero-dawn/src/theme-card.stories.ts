import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";
import "./theme-text.js";
import "./theme-link.js";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "The card is the theme's signature surface: a sunlit armour plate over dark machinery. Its rim is a band of flat bevel facets, lit from the top-left and shaded toward the bottom-right, and the face itself falls away from the light in a gradient. A seam notch cut into the top edge shows the dark core beneath, with an amber wire running through it, and the top-left chamfer glows cyan where the plate meets the light.",
        "Content needs no configuration. The card sets its own dark inks, so slotted text, captions and links switch automatically, and those inks are tuned to hold AA contrast even at the plate's darkest corner. It also fills its height and stacks its content as a column, so cards in a row stay equal and actions pinned to the bottom line up.",
      ],
    },
  },
  render: (args) =>
    html`<div style="max-width: 32rem">
      <theme-card heading=${args["heading"]}>${args["body"]}</theme-card>
    </div>`,
  args: {
    heading: "Card title",
    body: "Body copy rendered inside the default slot.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

/** Slotted typography and links pick up the plate's dark ink automatically. */
export const WithContent: Story = {
  render: () =>
    html`<div style="max-width: 32rem">
      <theme-card heading="Field notes">
        <theme-text
          >Plates overlap like scales along the neck; the darker machinery shows through every seam.
          <theme-link href="#">Read the survey</theme-link>.</theme-text
        >
        <theme-text variant="caption">Recorded at dusk</theme-text>
        <div style="margin-top: 1rem"><theme-button label="Track"></theme-button></div>
      </theme-card>
    </div>`,
};
