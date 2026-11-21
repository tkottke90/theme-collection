# site

Eleventy static site that showcases the `theme-collection` repo and links
to each package's own Storybook build.

`src/_data/packages.js` reads `packages/*/package.json` at build time, so
the "Themes" page updates automatically whenever a package is added or
removed — no manual edits needed here.

## Build pipeline

```
npm run build-storybook --workspaces --if-present   # (run from repo root first)
npm run build -w site
```

`npm run build` here runs `eleventy` (renders the site into `_site/`) and
then `scripts/collect-storybooks.mjs`, which copies each package's
`storybook-static/` into `_site/storybooks/<package-dir-name>/`. A package
without a `storybook-static/` build yet is skipped with a warning rather
than failing the build.

## Local preview

```
npm run serve -w site
```
