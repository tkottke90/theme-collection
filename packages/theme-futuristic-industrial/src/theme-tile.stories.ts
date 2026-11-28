import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-tile.js";
import "./theme-heading.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Tile",
  parameters: {
    intro: {
      tag: "theme-tile",
      title: "Tile",
      description: [
        "A dark tile for an icon, a short status or a number, from the sheet's rounded tile with light stripes cut into its bottom-right corner, parallel to the corner's diagonal. plain drops the stripes.",
        "Slotted text switches to light colours, and the content centres when tiles in a row stretch to the same height.",
      ],
    },
  },
  render: () => html`
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <theme-tile>
        <div>
          <theme-heading level="2">04</theme-heading>
          <theme-text variant="caption">Bay</theme-text>
        </div>
      </theme-tile>
      <theme-tile>
        <theme-heading level="4">Locked</theme-heading>
      </theme-tile>
      <theme-tile plain>
        <theme-heading level="4">Open</theme-heading>
      </theme-tile>
    </div>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
