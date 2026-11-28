---
name: release
description: >
  Cuts a release of this repo end-to-end: runs the full build guard before
  touching anything, bumps every package (and the root) to one shared
  version, drafts an end-user-facing changelog, and pushes the `vX.Y.Z` tag
  that makes CI build, create the GitHub Release with one tarball per
  package, publish to the private npm registry, and deploy the site. Use
  whenever the user wants to cut, ship, or publish a release, says things
  like "release v1.2.0", "do a patch release", "publish a new version", or
  asks to bump the version — version bumps here always flow into a full
  release. Prefer this over anything that only drafts release notes.
compatibility: >
  Requires git, npm and an authenticated GitHub CLI (`gh`), and must be run
  from `main` with a clean tree. Pushing the tag triggers
  `.github/workflows/release.yml`, which needs the `NPM_TOKEN` secret and the
  DIGITAL_OCEAN_* secrets/variables (see CONTRIBUTING.md "Releasing"). Specific
  to this repo: tag convention and `bin/release.sh` phases.
---

# Release

The pipeline is ordered so the build guard (lint, typecheck, format, tests,
build, Storybook, site) runs **before** anything permanent: the version
bump commit, the tag, the push. Keep that ordering; it exists so a broken
build never costs a burned patch version.

All mechanical steps are phases of `bin/release.sh <phase> [args]`. Use it
instead of re-deriving commands inline; it is also what CI calls, so the
skill and CI cannot drift. Run it from the repo root.

All packages share one version, bumped on every release whether or not they
changed. `shared/wc-core` and `apps/site` are never bumped or published.

## 0. Version and plan

Run `bin/release.sh pkg-info` (package name, current version, previous tag).
Ask which bump the user wants: **major, minor, patch, or an explicit x.y.z**,
unless they already said (e.g. "release v1.2.0"). Ask whether this is a real
or **dry** run if that isn't obvious.

Note: the root is `0.0.0` while packages are `0.1.0`, so for the first
release use an explicit version (e.g. `0.1.0` or `1.0.0`), not `minor`.

Run `bin/release.sh preflight`: clean tree, on `main`, `gh` authenticated.
It fails on any other branch. If it fails, stop and report exactly why; don't
work around a dirty tree or the wrong branch.

## 1. Build guard

`bin/release.sh build-guard`. If it fails, **stop**: do not bump. Report the
output as-is; these are real errors to fix outside this skill. Never skip it,
even if the user is in a hurry.

## 2. Bump the version

Real run:

```
bin/release.sh bump-version <major|minor|patch|x.y.z>
```

Sets the root and every `packages/*` to the new version, refreshes the
lockfile, and makes a local commit `chore: release vX.Y.Z`. Prints
`NEW_VERSION`. Nothing is pushed or tagged yet.

Dry run: `bin/release.sh bump-version <bump> --dry-run` only prints the
version it would use. No commit is made.

## 3. Write the changelog

```
bin/release.sh changelog-range <NEW_VERSION>
```

Prints the previous tag (or says there is none) and the commits since. You
draft the changelog; the script can't judge it:

- This is an application of themes: write for people who **use** the
  packages ("the Forest Isle button now shows a visible focus ring"), not
  for maintainers. Skip release machinery (version bumps, lockfile-only,
  CI-only changes).
- If a subject references `#NN`, read it (`gh pr view NN`, `gh issue view
NN`). For vague subjects look at the diff; never guess, since a wrong claim
  in release notes is worse than a missing one.
- Lead with the most impactful change. Breaking changes come first, with
  what users must do. Group related commits into one story.
- With no previous tag it's the first release: cover the full history and
  skip the compare link.
- Mention how to install: the changelog is the GitHub Release body, which
  also carries the per-package tarballs. A closing line pointing to the site's
  package pages is enough.

Write it to `/tmp/<pkg-name>-<version>-changelog.md` (or the session scratch
directory). It becomes the annotated tag's message, which CI reads as the
release notes.

## 4. Confirm before publishing

Everything so far is local. Everything below is public: a pushed commit to
`main`, a pushed tag (which triggers CI, a GitHub Release, a registry publish
and a site deploy). **Show the version, the full changelog, and whether it is
a real or dry run, then wait for explicit go-ahead.** This is the one gate.

## 5. Publish

```
bin/release.sh publish <version> <changelog-file> [--dry-run]
```

Tags (annotated, changelog as the message), pushes `main`, then pushes the
tag. For `--dry-run` it tags `HEAD` as `vX.Y.Z-dry-run-<unix-ts>` (no bump
commit) and pushes that.

If `publish` fails, **stop and report which step failed and which
succeeded** (the script echoes each command). Don't try to roll back; public
state may already be visible. Let the user decide.

## What CI does after the tag

`.github/workflows/release.yml`:

1. `verify`: tag must equal the root and every package version (dry-run tags
   get a format check only).
2. `build`: tests, lint, typecheck, build, Storybook, site, and `npm pack`
   for each package. Always runs, dry run or not; this is the real
   validation.
3. `release`: creates the GitHub Release (notes = tag message) with the
   tarballs attached.
4. `publish-npm`: publishes each tarball to `npm.artifacts.tdkottke.com`,
   skipping any `name@version` already there, so a failed job can be re-run.
5. `deploy-site`: uploads the site to DigitalOcean Spaces under `themes/`.

Steps 3 to 5 are skipped for dry-run tags. If CI fails after the tag is
public, **don't roll back**: fix forward with a new patch release. If only
`publish-npm` or `deploy-site` failed (a transient error), re-running that
job in GitHub Actions is safe.

## Dry-run mode

A dry run exercises the real pipeline minus the public effects: preflight,
build guard and changelog run for real, and the pushed dry-run tag runs
`verify` and `build` in CI but skips release, publish and deploy. Clean up the
tag afterwards; it isn't deleted automatically:

```
git tag -d <dry-run-tag>
git push origin :refs/tags/<dry-run-tag>
```
