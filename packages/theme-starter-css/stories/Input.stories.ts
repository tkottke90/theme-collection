import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Input",
  parameters: {
    intro: {
      tag: ".theme-input",
      title: "Input",
      description: [
        "One class for native text-like inputs, checkboxes and radios. Text inputs get a neutral border that turns brand-coloured with a soft ring on focus, a red border when invalid, and greys when disabled. Checkboxes and radios keep their native shape and use accent-color, so :checked is painted in the brand colour.",
        "Everything is a real input, so it submits with its form under its name. When you copy the starter, describe your theme's input well and each state: focus, invalid, disabled and checked.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

// Every input has a name, so it submits with a <form>, and an accessible
// label (aria-label for a lone input, a wrapping <label> for checkboxes
// and radios).

export const Text: Story = {
  render: () =>
    `<input class="theme-input" type="text" name="name" aria-label="Name" placeholder="Text input" />`,
};

export const Email: Story = {
  render: () =>
    `<input class="theme-input" type="email" name="email" aria-label="Email" placeholder="you@example.com" />`,
};

export const Password: Story = {
  render: () =>
    `<input class="theme-input" type="password" name="password" aria-label="Password" placeholder="Password" />`,
};

export const Number: Story = {
  render: () =>
    `<input class="theme-input" type="number" name="quantity" aria-label="Quantity" placeholder="0" min="0" />`,
};

export const Checkbox: Story = {
  render: () => `
    <div class="theme-field">
      <label class="theme-field__option">
        <input class="theme-input" type="checkbox" name="subscribe" value="yes" checked />
        Subscribe to updates
      </label>
    </div>
  `,
};

export const Radio: Story = {
  render: () => `
    <div class="theme-field">
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="plan" value="free" checked />
        Free
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="plan" value="pro" />
        Pro
      </label>
    </div>
  `,
};

export const Invalid: Story = {
  render: () =>
    `<input class="theme-input" type="email" name="email" aria-label="Email" value="not-an-email" aria-invalid="true" />`,
};

export const Disabled: Story = {
  render: () => `
    <div class="theme-field">
      <input class="theme-input" type="text" name="locked" aria-label="Locked" value="Can't edit this" disabled />
      <label class="theme-field__option">
        <input class="theme-input" type="checkbox" name="locked-check" checked disabled />
        Disabled checkbox
      </label>
    </div>
  `,
};
