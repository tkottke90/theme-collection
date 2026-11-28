#!/usr/bin/env bash
# Release helper shared by the `release` skill (.claude/skills/release) and
# .github/workflows/release.yml. One function per phase:
#
#   bin/release.sh <phase> [args]
#
# Skill phases: pkg-info, preflight, build-guard, bump-version,
#               changelog-range, publish
# CI phases:    verify-tag, pack-all, tag-message, detect-dry-run, publish-npm
#
# Every package under packages/* and the root package.json share one version.
# shared/wc-core and apps/site are private and never bumped or published.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

NPM_REGISTRY="${NPM_REGISTRY:-https://npm.artifacts.tdkottke.com/}"
SEMVER_RE='^[0-9]+\.[0-9]+\.[0-9]+$'
TAG_RE='^v[0-9]+\.[0-9]+\.[0-9]+(-dry-run-[0-9]+)?$'

die() {
  echo "ERROR: $*" >&2
  exit 1
}

pkg_dirs() {
  local d
  for d in packages/*/; do
    [ -f "${d}package.json" ] && echo "${d%/}"
  done
}

json_field() { # <file> <field>
  node -p "require('./$1').$2"
}

current_version() {
  json_field package.json version
}

# prev_tag: latest real release tag, ignoring dry-run tags. Empty if none.
prev_tag() {
  git tag --list 'v[0-9]*' --sort=-v:refname | grep -Ev -- '-dry-run-' | head -n1 || true
}

next_version() { # <major|minor|patch|x.y.z>
  local cur major minor patch
  cur="$(current_version)"
  IFS=. read -r major minor patch <<<"$cur"
  case "$1" in
    major) echo "$((major + 1)).0.0" ;;
    minor) echo "${major}.$((minor + 1)).0" ;;
    patch) echo "${major}.${minor}.$((patch + 1))" ;;
    *)
      [[ "$1" =~ $SEMVER_RE ]] || die "'$1' is not major, minor, patch or x.y.z"
      [ "$1" != "$cur" ] || die "version $1 is already the current version"
      [ "$(printf '%s\n%s\n' "$cur" "$1" | sort -V | tail -n1)" = "$1" ] ||
        die "version $1 is lower than the current version $cur"
      echo "$1"
      ;;
  esac
}

# ---------------------------------------------------------------- skill phases

pkg_info() {
  echo "PKG_NAME=$(json_field package.json name)"
  echo "CURRENT_VERSION=$(current_version)"
  echo "PREV_TAG=$(prev_tag)"
  echo "PACKAGES=$(pkg_dirs | wc -l | tr -d ' ')"
}

preflight() {
  local branch
  [ -z "$(git status --porcelain)" ] || die "working tree is not clean"
  branch="$(git rev-parse --abbrev-ref HEAD)"
  [ "$branch" = "main" ] || die "releases must be cut from main (on '$branch')"
  gh auth status >/dev/null 2>&1 || die "gh is not authenticated (run 'gh auth login')"
  echo "preflight OK (clean tree, on main, gh authenticated)"
}

# build_guard: everything AGENTS.md says must pass, plus the site. Runs before
# anything permanent (version bump, tag, push) happens.
build_guard() {
  local run=(npm run)
  "${run[@]}" lint
  "${run[@]}" typecheck
  "${run[@]}" format:check
  npm run test --workspaces --if-present
  npm run build --workspaces --if-present
  "${run[@]}" storybook:build
  npm run build -w site
  echo "build guard OK"
}

# bump_version <bump> [--dry-run]: set every package and the root to the new
# version and commit. --dry-run only prints the version it would use.
bump_version() {
  local bump="${1:-}" dry="${2:-}" new dir
  [ -n "$bump" ] || die "usage: bump-version <major|minor|patch|x.y.z> [--dry-run]"
  new="$(next_version "$bump")"
  if [ "$dry" = "--dry-run" ]; then
    echo "NEW_VERSION=$new"
    echo "DRY_RUN=true (no files changed)"
    return
  fi
  npm version "$new" --no-git-tag-version --workspaces=false --allow-same-version >/dev/null
  while read -r dir; do
    npm version "$new" --no-git-tag-version --allow-same-version -w "$dir" >/dev/null
  done < <(pkg_dirs)
  git add package.json package-lock.json packages/*/package.json
  git commit -q -m "chore: release v$new"
  echo "NEW_VERSION=$new"
}

# changelog_range <version>: material for drafting the changelog.
changelog_range() {
  local prev
  prev="$(prev_tag)"
  if [ -z "$prev" ]; then
    echo "PREV_TAG=(none: first release, cover the full history)"
    git log --no-merges --pretty='%h %s'
  else
    echo "PREV_TAG=$prev"
    echo "COMPARE=https://github.com/tkottke90/theme-collection/compare/$prev...v${1:-HEAD}"
    git log --no-merges --pretty='%h %s' "$prev..HEAD"
  fi
}

# publish <version> <changelog-file> [--dry-run]: create the annotated tag
# (changelog as its message), push the branch, then push the tag. The tag push
# is what triggers CI. A dry run tags HEAD as vX.Y.Z-dry-run-<ts> with no bump
# commit.
publish() {
  local version="${1:-}" file="${2:-}" dry="${3:-}" tag branch
  [ -n "$version" ] && [ -f "$file" ] || die "usage: publish <version> <changelog-file> [--dry-run]"
  [[ "$version" =~ $SEMVER_RE ]] || die "'$version' is not x.y.z"
  branch="$(git rev-parse --abbrev-ref HEAD)"
  [ "$branch" = "main" ] || die "publish must run from main (on '$branch')"
  if [ "$dry" = "--dry-run" ]; then
    tag="v$version-dry-run-$(date +%s)"
  else
    tag="v$version"
    verify_tag "$tag"
    git rev-parse -q --verify "refs/tags/$tag" >/dev/null && die "tag $tag already exists"
  fi
  set -x
  git tag -a "$tag" -F "$file"
  git push origin "$branch"
  git push origin "refs/tags/$tag"
  set +x
  echo "NEW_TAG=$tag"
  echo "Pushed. CI: https://github.com/tkottke90/theme-collection/actions"
}

# ------------------------------------------------------------------ CI phases

detect_dry_run() { # <tag>
  [[ "${1:-}" == *-dry-run-* ]] && echo true || echo false
}

# verify_tag <tag>: the tag must match root and every package version. Dry-run
# tags only get a format check (no bump commit exists for them).
verify_tag() {
  local tag="${1:-}" version dir v bad=0
  [[ "$tag" =~ $TAG_RE ]] || die "tag '$tag' is not vX.Y.Z or vX.Y.Z-dry-run-<ts>"
  if [ "$(detect_dry_run "$tag")" = true ]; then
    echo "dry-run tag $tag: format OK, version equality not checked"
    return
  fi
  version="${tag#v}"
  v="$(current_version)"
  [ "$v" = "$version" ] || { echo "root package.json is $v, tag is $version" >&2; bad=1; }
  while read -r dir; do
    v="$(json_field "$dir/package.json" version)"
    [ "$v" = "$version" ] || { echo "$dir is $v, tag is $version" >&2; bad=1; }
  done < <(pkg_dirs)
  # Guard: no published package may depend on another one (versions are
  # bumped without rewriting dependency ranges).
  node -e '
    const fs = require("fs");
    let bad = false;
    for (const d of fs.readdirSync("packages")) {
      const f = `packages/${d}/package.json`;
      if (!fs.existsSync(f)) continue;
      const p = JSON.parse(fs.readFileSync(f, "utf8"));
      for (const k of ["dependencies","peerDependencies","optionalDependencies"])
        for (const n of Object.keys(p[k] || {}))
          if (n.startsWith("@tkottke90/theme-")) { console.error(`${d} depends on ${n}`); bad = true; }
    }
    process.exit(bad ? 1 : 0);
  ' || bad=1
  [ "$bad" = 0 ] || die "version verification failed"
  echo "verify-tag OK ($tag)"
}

# pack_all <outdir>: one tarball per package. Requires a prior build.
pack_all() {
  local out="${1:-}" dir n=0
  [ -n "$out" ] || die "usage: pack-all <outdir>"
  mkdir -p "$out"
  out="$(cd "$out" && pwd)"
  while read -r dir; do
    [ -d "$dir/dist" ] || die "$dir has no dist/ (run the build first)"
    npm pack -w "$dir" --pack-destination "$out" >/dev/null
    n=$((n + 1))
  done < <(pkg_dirs)
  echo "packed $n tarballs into $out"
  ls -1 "$out"
}

tag_message() { # <tag>
  git for-each-ref "refs/tags/${1:?usage: tag-message <tag>}" --format='%(contents)'
}

# publish_npm <dir>: publish each tarball unless that name@version is already
# in the registry (makes a re-run after a partial failure safe).
publish_npm() {
  local dir="${1:-}" f name version existing n=0 skipped=0
  [ -d "$dir" ] || die "usage: publish-npm <dir-with-tgz>"
  for f in "$dir"/*.tgz; do
    [ -e "$f" ] || die "no .tgz files in $dir"
    name="$(tar -xOzf "$f" package/package.json | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).name')"
    version="$(tar -xOzf "$f" package/package.json | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).version')"
    existing="$(npm view "$name@$version" version --registry "$NPM_REGISTRY" 2>/dev/null || true)"
    if [ -n "$existing" ]; then
      echo "SKIP $name@$version (already in registry)"
      skipped=$((skipped + 1))
      continue
    fi
    echo "PUBLISH $name@$version"
    npm publish "$f" --registry "$NPM_REGISTRY"
    n=$((n + 1))
  done
  echo "published $n, skipped $skipped"
}

# ------------------------------------------------------------------- dispatch

phase="${1:-}"
[ -n "$phase" ] || die "usage: bin/release.sh <phase> [args]"
shift
case "$phase" in
  pkg-info | preflight | build-guard | bump-version | changelog-range | publish | \
    verify-tag | pack-all | tag-message | detect-dry-run | publish-npm)
    "${phase//-/_}" "$@"
    ;;
  *) die "unknown phase '$phase'" ;;
esac
