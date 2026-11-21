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
