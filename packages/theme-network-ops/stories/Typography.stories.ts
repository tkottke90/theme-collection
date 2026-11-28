import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Typography",
  parameters: {
    intro: {
      tag: "h1 \u2013 h6, p, small, code, pre",
      title: "Typography",
      description: [
        "Type is applied to elements, not classes: headings, paragraphs, small, code, pre and kbd are styled directly. Inter is the sans face and the system monospace the mono one. Headings are tight at 600 weight, with h1 at 700 and h5/h6 as small uppercase section labels in muted ink.",
        "Body copy is 0.9375rem at 1.5 line height in near-white on the near-black page; small and muted text use the grey-blue muted ink.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => `
    <h1>Load</h1>
    <h2>Inbound Traffic</h2>
    <h3>System status</h3>
    <h4>Chips &amp; tones</h4>
    <h5>Section label</h5>
    <h6>Subsection label</h6>
  `,
};

export const BodyText: Story = {
  render: () => `
    <p>Body copy styled with theme tokens, at a glance showing throughput across the cluster.</p>
    <small>Last updated 2 minutes ago</small>
  `,
};

export const Code: Story = {
  render: () => `
    <p>Run <code>npm run build</code> to compile the theme, or see the full log:</p>
    <pre>nginx: 10.23.43.324 &middot; healthy</pre>
  `,
};
