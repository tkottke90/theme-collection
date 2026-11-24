import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-glyph.js";
import { GLYPHS } from "./glyphs.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Glyph",
  parameters: {
    intro: {
      tag: "theme-glyph",
      title: "Glyph",
      description: [
        "The glyphs are original, drawn in the grammar of the tribal sign-painting reference without tracing it: symmetric, chevron-heavy, a few chunky strokes. Each sits on a painted triangle, shield or diamond, and the whole mark is passed through a fractal-noise displacement filter so its edges read as dry brush.",
        "The stroke colour is chosen per paint for contrast, paint-white on the deep colours and core-dark on ochre and steel-blue. A glyph is decorative by default and becomes an announced image only when given a label.",
      ],
    },
  },
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
