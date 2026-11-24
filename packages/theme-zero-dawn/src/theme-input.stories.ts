import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Input",
  parameters: {
    intro: {
      tag: "theme-input",
      title: "Input",
      description: [
        "Inputs are the one surface that is deliberately not bevelled. They are recessed sockets: a dark core well with a plate-grey edge that turns cyan and glows on focus. The glow is the point, giving the controls the ethereal, emissive feel of the world's technology rather than another physical plate.",
        "Checkboxes and radios are drawn in SVG: a chamfered square and a diamond, filling with cyan when checked. All of them are real form controls, submitting with their form, resetting, following a disabled fieldset, and toggling when you click their label's text.",
      ],
    },
  },
  render: (args) =>
    html`<theme-input type=${args["type"]} placeholder=${args["placeholder"]}></theme-input>`,
  args: { placeholder: "" },
};
export default meta;

type Story = StoryObj;

export const Text: Story = { args: { type: "text", placeholder: "Text" } };
export const Email: Story = { args: { type: "email", placeholder: "Email" } };
export const Password: Story = { args: { type: "password", placeholder: "Password" } };
export const Number: Story = { args: { type: "number", placeholder: "Number" } };
export const Checkbox: Story = { args: { type: "checkbox" } };
export const Radio: Story = { args: { type: "radio" } };
