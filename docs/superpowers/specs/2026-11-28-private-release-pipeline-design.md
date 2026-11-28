# Private release pipeline — design

Status: draft for approval. Date: 2026-11-28.

## Intent and why

The owner wants to share the `@tkottke90/theme-*` packages with specific
people without publishing to public npm. Distribution happens two ways:

1. A private npm registry, `npm.artifacts.tdkottke.com`.
2. Per-package `.tgz` tarballs attached to a GitHub Release, for people who
   would rather download and unpack into `node_modules`.

Pushing a version tag triggers everything. A `release` skill automates the
local half (checks, version bump, changelog, tag, push).

## Goals

- One tag `vX.Y.Z` produces: a GitHub Release with one tarball per package,
  every package published to the private registry, and the static site
  deployed to DigitalOcean Spaces (S3-compatible object storage).
- Every package shares one version, bumped on every release even if the
  package did not change (owner's decision: simpler to manage).
- The site has a dedicated page per package with both install methods, the
  version, and a link to that package's tarball on the release.
- The release skill makes the whole process one guided flow with a single
  confirmation gate before anything public happens.

## Non-goals

- Publishing to public npm.
- Independent per-package versioning or "only release what changed".
- Rolling back a public release automatically (recovery is fix-forward with
  the next patch version).
- Creating the Spaces bucket, its keys, or the private registry. The owner
  configures Spaces; the registry already exists.

## Anti-goals

- A release where `main` shows one version and the shipped tarballs another.
- Publishing to the registry before cheaper steps (build, release creation)
  have succeeded. npm publishes are effectively permanent.
- Hand-copying versions or install snippets into pages; they derive from
  `package.json` at site-build time.

## Constraints

- Monorepo of npm workspaces: `packages/*` (11 packages, all `0.1.0`),
  `shared/wc-core` (private, never published), `apps/site` (private).
- Packages have no dependencies on each other, so no internal-dependency
  range rewriting is needed on bump. (Builder: re-verify at implementation.)
- Existing CI jobs (`Test`, `Lint`, `Style`, `Build Site`) stay as they are.
- Eleventy site is generated from `packages/*/package.json` at build time
  (`apps/site/src/_data/packages.js`); Storybook output is copied in by
  `apps/site/scripts/collect-storybooks.mjs`.
- Spaces secrets/variables are provided by the owner later. The workflow step must
  be real but may be untestable until then.

## Approaches considered

|                | Approach                                                                              | Trade-off                                                                                |
| -------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **A (chosen)** | Skill bumps all versions, commits, tags; CI verifies tag equals every package version | One bump commit per release; `main` and tarballs always agree; site needs no extra logic |
| B              | CI derives version from the tag and stamps it at build time                           | No bump commit, but repo versions go stale and the site would show wrong versions        |
| C              | CI bumps and pushes back to `main` after the tag                                      | Needs CI write access to `main`, races with merges; no advantage over A                  |

Owner picked A.

## Design

### Versioning and tags

- Tag format: `vX.Y.Z`. Pre-release / dry-run tags: `vX.Y.Z-dry-run-<unix-ts>`.
- The release skill sets every `packages/*/package.json` and the root
  `package.json` to `X.Y.Z` and updates `package-lock.json`, then commits
  ("chore: release vX.Y.Z") and creates the annotated tag. `shared/wc-core`
  and `apps/site` are private and unpublished; they are not bumped.
- The commit is pushed before the tag.

### Workflow: `.github/workflows/release.yml`

Trigger: `push` of tags matching `v*`. Jobs, in order, each needing the
previous:

1. **verify** — checkout, `npm ci`, assert tag version equals the version in
   the root and every `packages/*/package.json` (strip any `-dry-run-*`
   suffix before comparing). Fail fast with a clear message.
2. **build** — `npm run build --workspaces --if-present`, tests, lint,
   typecheck. This is the CI-side guard (the skill runs a local one first).
   Also builds all Storybooks and the site, uploading the `_site` output as
   a workflow artifact for the deploy job.
3. **release** — for each `packages/*`, `npm pack` into a tarball directory
   (`tkottke90-theme-<name>-X.Y.Z.tgz`); create the GitHub Release (title =
   tag, body = the changelog) and upload the tarballs as assets. The
   changelog body is supplied by the skill (see below). Skipped for dry-run
   tags.
4. **publish-npm** — authenticate to `npm.artifacts.tdkottke.com` with the
   `NPM_TOKEN` secret and `npm publish` each tarball (the same `.tgz` that
   was attached to the release). Each package is checked with `npm view`
   first and skipped if that version already exists, so a failed job can be
   re-run safely (Verdaccio rejects republishing a version). Skipped for dry-run tags.
5. **deploy-site** — upload `_site` to DigitalOcean Spaces with
   `BetaHuhn/do-spaces-action@v2` (the owner's existing pattern: `source:
apps/site/_site`, `out_dir: themes`), using the secrets/vars below. The
   action is pinned to a commit SHA, since it handles deploy credentials.
   Skipped for dry-run tags.

Dry-run tags run steps 1 and 2 for real and skip 3–5, mirroring the attached
skill's behavior.

`site-deploy.yml` (push to `main`) is removed; deployment now happens only
from tags. `site-build.yml` (PR build check) stays.

### Secrets and variables (named here, set by owner)

- `NPM_TOKEN` — publish-scoped token for the private registry (Verdaccio).
- Spaces, reusing the owner's existing names: secrets
  `DIGITAL_OCEAN_STORAGE_ID` and `DIGITAL_OCEAN_STORAGE_KEY`; variables
  `DIGITAL_OCEAN_SPACES_NAME` and `DIGITAL_OCEAN_SPACES_REGION`.

### Site is served from a `/themes/` prefix

`out_dir: themes` puts the site at `<host>/themes/`. The templates use
root-absolute links (`/themes/`, `/storybooks/<pkg>/`), which would break.
Eleventy gets a `pathPrefix: "/themes/"` and the templates use the `url`
filter. The current `/themes/` listing page becomes the site's package list
at `<host>/themes/themes/` unless the builder renames its permalink, which is
left to them. Local dev (`serve`) uses the same prefix.

The action uploads but may not delete files removed from the site; stale
files are an accepted limitation unless the builder finds a cheap fix.

### Site changes

- New per-package page generated by Eleventy pagination over the existing
  `packages` data: `/themes/<dirName>/`. Contents: name, version,
  description, link to Storybook, and an **Install** section with:
  - **Private registry:** the install needs a token. The page shows an
    `.npmrc` with the scope line
    (`@tkottke90:registry=https://npm.artifacts.tdkottke.com/`) and an
    `_authToken` line using a placeholder (`${NPM_TOKEN}`), then
    `npm install @tkottke90/theme-<name>`, and says to ask the maintainer
    for a token. No real token ever appears on the site.
  - **Tarball:** a download link to the release asset (the repo is public, so these
    links work without signing in)
    (`https://github.com/tkottke90/theme-collection/releases/download/vX.Y.Z/<file>.tgz`)
    plus either `npm install ./<file>.tgz` or an unpack-into-`node_modules`
    recipe.
- `/themes/` list links to each package page, in addition to Storybook.
- All instructions derive from `package.json` name/version; no hand edits per
  package.

### Release skill: `.claude/skills/release/SKILL.md` (+ `bin/release.sh`)

Shape taken from the attached skill, adapted to this repo (no Docker, no
Zot, no single-package `npm version`):

0. `pkg-info` / `preflight`: show current version; ask major / minor / patch /
   explicit version and real vs dry run; require clean tree, `main` branch,
   authenticated `gh`.
1. `build-guard`: run the AGENTS.md checks (`lint`, `typecheck`,
   `format:check`, `test`, `build`, Storybook builds). Stop on failure;
   never bump first.
2. `bump-version`: set all package versions, commit, create the tag (or the
   dry-run-suffixed tag).
3. `changelog-range`: print previous tag and commits; the model drafts an
   end-user-facing changelog (what theme users see, not internals), written
   to a temp file.
4. **Confirm gate:** show version, changelog, real/dry-run. Wait for go-ahead.
5. `publish`: push the branch, push the tag. CI creates the Release using the
   changelog, so the skill passes the changelog to CI by pushing it in the
   annotated tag message (CI reads it with `git tag -l --format`) rather than
   calling `gh release create` itself.
6. Dry-run cleanup instructions for the suffixed tag.

On any failure after the gate: stop, report exactly what has already happened,
do not roll back.

### Docs and guardrail updates

- `AGENTS.md`: remove the "no npm-publish workflow / `NPM_TOKEN`" and "don't
  fill in the S3 upload step" guardrails (the deploy target is now Spaces); add a short "Releasing" pointer to
  the skill and the tag-driven flow.
- `CONTRIBUTING.md`: replace "published" language where needed with the
  private-registry + release-tarball distribution model; document the
  release process and the new secrets.
- Update the root `package.json` description (it says "published as
  @tkottke90/theme-* npm packages"; still true, but clarify private).

## Confirmed with the owner

- The GitHub repo is public; the registry install requires a token; the
  registry is Verdaccio; the publish secret is `NPM_TOKEN`.
- The skill pushes the bump commit straight to `main` (no branch
  protection). It must refuse to run from any other branch.

## Decided by me (owner can override)

- Dry runs make no bump commit: the dry-run tag lands on the current commit
  and CI only checks the tag's format, not version equality. This keeps
  `main` from drifting ahead of a release that never happened.
- The site is treated as publicly readable; it contains only placeholder
  token text. How people receive tokens is outside this system.
- The attached skill's conventions are adopted as written here: phases
  `pkg-info`, `preflight`, `build-guard`, `bump-version`, `changelog-range`,
  `publish`; a single confirm gate before anything public; `--dry-run`
  creating a real suffixed tag with cleanup instructions
  (`git tag -d` / `git push origin :refs/tags/<tag>`); no automatic rollback.

- All of `packages/*` ship, including the three `theme-starter-*` reference
  templates, since versions stay in sync and exclusion adds special cases.
- `shared/wc-core` and `apps/site` are not bumped or published.
- Changelog travels to CI in the annotated tag message.
- Tarballs published to the registry are the same `.tgz` files attached to the
  release.
- Site deploy uses the owner's `BetaHuhn/do-spaces-action@v2` pattern with
  the action pinned to a SHA.

## Left to the builder

- Exact script boundaries in `bin/release.sh`, and whether it is also used by
  CI (the attached skill shares one script between both).
- Retry/propagation handling between release creation and publish.
- Tarball naming normalization and the unpack recipe wording.
- Per-package page template markup and styling.
- Whether `publishConfig` is added to each package or the registry is
  supplied by the workflow's `.npmrc`.
