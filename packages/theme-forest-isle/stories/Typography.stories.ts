import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Typography",
  parameters: {
    intro: {
      tag: ".theme-heading, .theme-text",
      title: "Typography",
      description: [
        "Headings are set in a serif (Lora) at bold weight, which gives the cottage-journal feel; body copy and captions use a rounded sans (Nunito). The heading classes carry a size modifier (--h1 to --h4) that is independent of the element, so a document outline never has to bend to the visual scale.",
        "Body copy is 1rem at a 1.6 line height. Captions are smaller and use the muted ink.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Heading1: Story = {
  render: () => `<h1 class="theme-heading theme-heading--h1">Heading level 1</h1>`,
};

export const Heading2: Story = {
  render: () => `<h2 class="theme-heading theme-heading--h2">Heading level 2</h2>`,
};

export const Heading3: Story = {
  render: () => `<h3 class="theme-heading theme-heading--h3">Heading level 3</h3>`,
};

export const Heading4: Story = {
  render: () => `<h4 class="theme-heading theme-heading--h4">Heading level 4</h4>`,
};

export const BodyText: Story = {
  render: () => `<p class="theme-text">Body copy styled with the theme's typography tokens.</p>`,
};

export const CaptionText: Story = {
  render: () => `<p class="theme-text theme-text--caption">Caption copy, smaller and muted.</p>`,
};
