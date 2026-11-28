import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-girder.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Girder",
  parameters: {
    intro: {
      tag: "theme-girder",
      title: "Girder",
      description: [
        "A decorative band from the sheet's dark truss bar: a Warren truss whose 45° diagonals meet the chords at flat joints, so the openings are trapezoids rather than triangles.",
        "Chord, member and joint widths are measured from the source. The number of panels is worked out for each width so the joints stay even and the two end openings mirror each other. Set its height with CSS.",
      ],
    },
  },
  render: () => html`<theme-girder></theme-girder>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <theme-girder style="height:24px"></theme-girder>
      <theme-girder style="height:48px"></theme-girder>
      <theme-girder style="height:48px;width:180px"></theme-girder>
    </div>
  `,
};
