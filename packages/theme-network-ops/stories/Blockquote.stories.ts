import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Blockquote",
  parameters: {
    intro: {
      tag: ".theme-blockquote",
      title: "Blockquote",
      description: [
        "A callout for status notes: a 4px rule in the status colour, a faint tint of that colour over the surface, and a bold label in the same colour. Ten modifiers (theme-blockquote--info through --quote) each set one accent custom property, so every type is the same shape in a different colour.",
        "Danger reuses the coral brand colour, so a critical callout reads as the same signal as a glowing button. The colour always comes with the text label.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

function blockquote(variant: string, label: string, text: string): string {
  return `
    <blockquote class="theme-blockquote theme-blockquote--${variant}">
      <span class="theme-blockquote__label">${label}</span>
      <p>${text}</p>
    </blockquote>
  `;
}

export const Info: Story = {
  render: () => blockquote("info", "Info", "Node E reports nominal throughput."),
};

export const Tip: Story = {
  render: () => blockquote("tip", "Tip", "Pin dashboards you check hourly to the sidebar."),
};

export const Question: Story = {
  render: () =>
    blockquote("question", "Question", "Is the drop on Node C expected during maintenance?"),
};

export const Success: Story = {
  render: () =>
    blockquote("success", "Success", "Failover to Node B completed with zero packet loss."),
};

export const Warning: Story = {
  render: () => blockquote("warning", "Warning", "Node D is approaching its bandwidth ceiling."),
};

export const Failure: Story = {
  render: () => blockquote("failure", "Failure", "Health check for Node A did not return in time."),
};

export const Danger: Story = {
  render: () => blockquote("danger", "Danger", "Disabling this firewall rule exposes the subnet."),
};

export const Bug: Story = {
  render: () => blockquote("bug", "Bug", "Latency graph mislabels Node C as Node E."),
};

export const Example: Story = {
  render: () =>
    blockquote(
      "example",
      "Example",
      'Sample alert payload: <code>{ "node": "B", "status": "degraded" }</code>',
    ),
};

export const Quote: Story = {
  render: () =>
    blockquote("quote", "Quote", "&ldquo;Uptime is a side effect of good defaults.&rdquo;"),
};
