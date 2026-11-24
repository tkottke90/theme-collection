## Summary

<!-- What does this PR change and why? -->

## Type of change

- [ ] New theme package
- [ ] Changes to an existing package's components/styles
- [ ] Tooling / CI / docs
- [ ] Other (describe above)

## Minimum component set

Only applicable when adding or substantially changing a theme package.
Check off what this PR implements; note in the summary above if an item
doesn't apply to this theme.

- [ ] Button — primary, secondary, ghost, disabled
- [ ] Input — text, email, password, number, textarea, select, checkbox, radio
- [ ] Card
- [ ] Typography scale — headings (reasonable h1-h6 subset), body, caption
- [ ] Link
- [ ] Container (`ol`/`ul`/`div` wrapper)
- [ ] Item (`li`/child wrapper)
- [ ] Field (label + input/select wrapper)
- [ ] Detail (`<details>`/`<summary>`)
- [ ] Blockquote — all 10 color variants (info, tip, question, success,
      warning, failure, danger, bug, example, quote)
- [ ] Skeleton — standalone per-typography-level placeholders

## Package standard

Only applicable when adding or migrating a theme package. See
CONTRIBUTING.md, "Package standard"; `npm run lint` checks the first four.

- [ ] `README.md` follows the starter template and links `docs/screenshot.png`
- [ ] `AGENTS.md` follows the starter template and is in `package.json` `files`
- [ ] Every stories `meta` has a `parameters.intro`
- [ ] A `.../Demo` story composes a full page from the package's components
- [ ] Form controls are form-ready (WC packages use the shared
      `FormControlElement`/`FieldElement` and `aria-label`)
- [ ] Removed the package from `PENDING` in
      `scripts/check-package-standard.mjs` (migrations only)

## Screenshots

- [ ] This PR touches a package's styles, and I regenerated and committed
      its screenshot (`npm run build-storybook -w <package>` then
      `npm run screenshot -w <package>`), and it's linked from that
      package's `README.md`.
- [ ] N/A — this PR doesn't change any package's styles.

## Required checks

Ran from the repo root, all passing:

- [ ] `npm run lint`
- [ ] `npm run format:check`
- [ ] `npm run test --workspaces --if-present`
- [ ] `npm run build --workspaces --if-present`
- [ ] `npm run build-storybook -w <package-name>` for every package touched
