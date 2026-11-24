import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Input",
  parameters: {
    intro: {
      tag: "theme-input",
      title: "Input",
      description: [
        "A native input in a form-associated host: it submits under its name, resets with its form, follows a disabled fieldset and fires change from the element.",
        "Text types are a recessed surface-alt well with a 1px grey border, light text and a muted placeholder; focus adds a 2px lime outline. Checkbox and radio stay native, tinted lime through accent-color. Radios with the same name form a group.",
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
