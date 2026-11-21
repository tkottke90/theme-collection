# theme-collection

A collection of drop-in CSS themes and component libraries, published as
installable `@tkottke90/theme-*` npm packages. Themes range from a single
CSS file to full component libraries, built as either framework-agnostic
Web Components or Preact/React components depending on the package.

This is an npm-workspaces monorepo:

- `packages/*` — the theme packages themselves. See `CONTRIBUTING.md` for
  the supported package shapes and how to add a new one.
- `apps/site` — the Eleventy site that showcases the repo and links out to
  each package's Storybook.

See `CONTRIBUTING.md` for contributor conventions and `AGENTS.md` for
guidance aimed at AI coding agents working in this repo.
