import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-tile.js";
import "./theme-heading.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Tile",
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
