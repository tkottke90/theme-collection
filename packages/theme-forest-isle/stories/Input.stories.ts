import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Input",
  parameters: {
    intro: {
      tag: ".theme-input",
      title: "Input",
      description: [
        "One class for native text-like inputs, checkboxes and radios. Fields sit on a slightly darker parchment than the cards around them, with a soft sand border and the same generous rounding as every surface. Focus turns the border sage and adds a pale sage ring; invalid turns the border brick red; disabled flattens to sand.",
        "Checkboxes and radios keep their native shape and use accent-color, so :checked is painted sage. Every input is a real input: it submits under its name, resets with its form and follows a disabled fieldset.",
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
    <fieldset class="theme-field">
      <legend>Plan</legend>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="plan" value="free" checked />
        Free
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="plan" value="pro" />
        Pro
      </label>
    </fieldset>
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
