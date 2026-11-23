import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Sidebar",
};
export default meta;

type Story = StoryObj;

const ICONS: Record<string, string> = {
  home: `<path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />`,
  overview: `<rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />`,
  tasks: `<path d="M5 6h14M5 12h14M5 18h9" /><path d="M3 6h.01M3 12h.01M3 18h.01" />`,
  residents: `<circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" /><path d="M14 15.5c2.5.3 4 1.8 4 4.5" />`,
  notes: `<path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M9 11h6M9 15h6" />`,
};

function icon(name: keyof typeof ICONS): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function navLink(name: keyof typeof ICONS, label: string, selected = false): string {
  const classes = selected ? "theme-nav-link theme-nav-link--selected" : "theme-nav-link";
  const current = selected ? ' aria-current="page"' : "";
  return `<li><a class="${classes}" href="#"${current}>${icon(name)}<span>${label}</span></a></li>`;
}

export const Default: Story = {
  render: () => `
    <aside class="theme-sidebar">
      <div class="theme-sidebar-sign">
        <svg class="theme-sidebar-sign__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8 6 6 9 6 12a6 6 0 0 0 12 0c0-3-2-6-6-10Z" />
        </svg>
        <p class="theme-sidebar-sign__eyebrow">Welcome to</p>
        <p class="theme-sidebar-sign__name">Driftwood Cove</p>
        <p class="theme-sidebar-sign__subtitle">Island</p>
      </div>
      <ul class="theme-nav">
        ${navLink("home", "Home", true)}
        ${navLink("overview", "Overview")}
        ${navLink("tasks", "Tasks")}
        ${navLink("residents", "Residents")}
        ${navLink("notes", "Notes")}
      </ul>
    </aside>
  `,
};

export const NavLinkStates: Story = {
  render: () => `
    <div class="theme-sidebar" style="width: 200px;">
      <ul class="theme-nav">
        ${navLink("home", "Selected", true)}
        ${navLink("overview", "Deselected")}
      </ul>
    </div>
  `,
};
