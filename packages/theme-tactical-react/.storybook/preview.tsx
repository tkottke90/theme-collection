import type { Preview } from "@storybook/preact";

// Built by `npm run build` (runs automatically via the pre* npm hooks
// before `storybook dev` / `build-storybook`).
import "../dist/theme.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: "var(--color-bg)",
          color: "var(--color-text)",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "var(--font-sans)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
