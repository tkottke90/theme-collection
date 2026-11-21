import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Cyber Frame/Card",
};
export default meta;

type Story = StoryObj;

function card(variant: string, title: string): string {
  return `
    <div class="theme-card ${variant ? `theme-card--${variant}` : ""}" style="width: 220px;">
      <div class="theme-card__header">
        <span class="theme-card__title">${title}</span>
      </div>
      <div class="theme-card__body">
        <p class="theme-text">Panel body content goes here.</p>
      </div>
      <div class="theme-card__footer">
        <span class="theme-card__title">Status</span>
      </div>
    </div>
  `;
}

export const Plain: Story = {
  render: () => card("", "Plain"),
};

export const Chevron: Story = {
  render: () => card("chevron", "Chevron"),
};

export const Diagonal: Story = {
  render: () => card("diagonal", "Diagonal"),
};

export const Bar: Story = {
  render: () => card("bar", "Bar"),
};

export const Hazard: Story = {
  render: () => card("hazard", "Hazard"),
};

export const Block: Story = {
  render: () => card("block", "Block"),
};

export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; background: var(--color-void-900, #050b10); padding: 1rem;">
      ${card("", "Plain")}
      ${card("chevron", "Chevron")}
      ${card("diagonal", "Diagonal")}
      ${card("bar", "Bar")}
      ${card("hazard", "Hazard")}
      ${card("block", "Block")}
    </div>
  `,
};
