import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-glyph.js";
import { GLYPHS } from "./glyphs.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Glyph",
  render: (args) =>
    html`<theme-glyph
      name=${args["name"]}
      color=${args["color"]}
      shape=${args["shape"]}
      size=${args["size"]}
    ></theme-glyph>`,
  args: { name: "spear", color: "red", shape: "triangle", size: 96 },
  argTypes: {
    name: { control: "select", options: Object.keys(GLYPHS) },
    color: {
      control: "select",
      options: ["red", "orange", "ochre", "moss", "teal", "cobalt", "violet", "band", "core"],
    },
    shape: { control: "select", options: ["triangle", "shield", "diamond", "none"] },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

const COLORS = [
  "red",
  "violet",
  "teal",
  "cobalt",
  "moss",
  "orange",
  "ochre",
  "band",
  "core",
  "red",
];
const SHAPES = ["triangle", "shield", "diamond", "none"];

export const Sheet: Story = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 1rem">
      ${SHAPES.map(
        (shape) =>
          html`<div style="display: flex; flex-wrap: wrap; gap: 0.75rem">
            ${Object.keys(GLYPHS).map(
              (name, i) =>
                html`<theme-glyph
                  name=${name}
                  color=${COLORS[i]}
                  shape=${shape}
                  size="64"
                ></theme-glyph>`,
            )}
          </div>`,
      )}
    </div>`,
};
