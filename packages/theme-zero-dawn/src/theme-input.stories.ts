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
/** Option text set like the theme's controls: display face, theme ink. */
const OPTION = html`<style>
  .zd-option {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-sans);
    color: var(--color-text);
    cursor: pointer;
  }
  .zd-group {
    border: 0;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .zd-group legend {
    padding: 0;
    margin-bottom: 0.75rem;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text);
  }
</style>`;

/** Clicking the words toggles the box: the label activates the control. */
export const Checkbox: Story = {
  render: () =>
    html`${OPTION}
      <div style="display: flex; flex-direction: column; gap: 0.75rem">
        <label class="zd-option"
          ><theme-input type="checkbox" name="core" value="exposed"></theme-input>Core was
          exposed</label
        >
        <label class="zd-option"
          ><theme-input type="checkbox" name="tracked" value="yes" checked></theme-input>Machine is
          being tracked</label
        >
      </div>`,
};

/**
 * Radios sharing a `name` form one group: choosing one clears the others. A
 * fieldset and legend give the group an accessible name, read before each
 * option.
 */
export const Radio: Story = {
  render: () =>
    html`${OPTION}
      <fieldset class="zd-group">
        <legend>Threat level</legend>
        <label class="zd-option"
          ><theme-input type="radio" name="threat" value="low"></theme-input>Low</label
        >
        <label class="zd-option"
          ><theme-input type="radio" name="threat" value="medium" checked></theme-input
          >Medium</label
        >
        <label class="zd-option"
          ><theme-input type="radio" name="threat" value="high"></theme-input>High</label
        >
      </fieldset>`,
};
