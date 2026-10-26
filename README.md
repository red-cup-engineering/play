# play.561.group

<!-- 561-group-standards:badges:start -->
[![Causeway Services](https://img.shields.io/badge/561%20Group-Causeway%20Services-115e69)](https://github.com/causeway-services)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-115e69)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/causeway-services/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

## Voluntary sustaining support

Play is a public 561 Group games project. If this free-to-use software is useful to you, you can [support the Group's public research, games, and reusable infrastructure for USD $10 per month](https://buy.stripe.com/28E28s1b4gJcb2Y3Io5EY02) using its existing Stripe-hosted sustaining-support checkout. Support renews monthly until canceled, is optional, and provides no extra access, editorial influence, or charitable tax deduction. [Read the existing terms and confidential help route](https://561.group/#support) before subscribing.

This is a repository-visible first-party funding route; it does not assert that `play.561.group`, the separate house-ad server, or its advertising campaign has deployed, that anyone has seen the link, or that a payment has occurred.

The shelf and daily page also render this same offer as ordinary HTML, below
the game collection and independently of the optional house-ad request. The
price, renewal, recipient and terms are visible before the checkout link.

## Player-facing shelf

The index and UTC daily page share a visual identity, authored vector covers,
native game links and the TUFTE touch-control contract. Cards show a short
opening paragraph with the complete authored description available in a native
disclosure. The browser observation badge stays separate from the author's
reported playability; an unchecked page never inherits a successful observation.
Keyboard focus, narrow screens, display safe areas and reduced-motion settings
remain part of the shared layout. Cover glyphs are illustrative symbols, not
screenshots or promises about game content.

Both public entry pages use the existing TUFTE metadata projection for their
canonical URLs, social metadata and structured data. The shelf's ordered
machine-readable list comes from the same authored records as its visible
cards, and its alternate JSON link points to the complete published catalog.
The daily page is a native directory publication at `/today/`; the original
`/today` and `/today.html` addresses redirect there through the existing
Cloudflare assets target. Its assets and catalog reads use root-relative URLs.
VICTOR derives the sitemap from the same TUFTE metadata supplied to those page
renders. These declarations describe the published pages; they do not assert search-engine indexing,
rankings, completed playthroughs, or independently verified game availability.

Dependency resolution uses the public npm registry for public packages and the
Group registry for the declared Group scopes. The committed native lock retains
the exact supplier versions and integrity values; release-age and trust policy
checks continue to apply.

Catalog cartridge manifests, replay verifiers and schema references resolve
through the owning game's public package exports, including nested Parlor
records. An unrelated game package installed beside Play cannot substitute its
manifest for the selected source. Legacy source-relative references remain
supported. The qualified game exports are string/default mappings; import-only
or divergent import/require conditions need their own native receiving before
adoption. Source discovery still receives explicit Git bindings and does not
turn a recovered subset into the estate's complete membership.

The [2026-10-25 release receiving record](docs/release-receiving-2026-10-25.md)
binds all 21 authored records to 16 exact original source commits,
including Weiqi's Science owner and Equivo's public service owner. Stoke's
original manifest description now acknowledges its approximate prestige
calculation and unsettled estimates, matching the game's current rules and
known limitation. The complete
VICTOR build emits 20 artifacts, including the nine supplied by the shelf
projector; its native release manifest verifies the other 19 files. The current
published-provider composition passes 56 focused source and Worker-route cases.
The direct TUFTE 0.16.5-dev.0 release contains the received touch-style export;
the older 0.16.3 registry label does not.

Fresh independent Chromium receiving of the publication before that Stoke
description correction, through its
actual Wrangler 4.123.0 preview passed at 1440×1000, 390×844 and 320×700. The 21
game links rendered, search for `farkle` displayed one Farkle result, the playable
filter updated its pressed state, and the status controls were at least 44 CSS
pixels high, with no observed horizontal overflow or page exceptions. Desktop
and 390px screenshots were visually reviewed. External advertising requests
were deliberately blocked, so this is local UI receiving, not ad delivery or
production evidence. Earlier Chromium 134 source receiving additionally covered
the ten daily strips and no-JavaScript baseline; those cases were not repeated
in this fresh preview. The later original-owner text correction changes only
the catalog, index HTML and release manifest; all browser scripts, CSS and the
other 17 publication artifacts remain byte-identical.

The [dated game inventory](docs/game-inventory-2026-10-25.json) records all 21
titles, their observed launch URLs and immutable authored-source links. It also
distinguishes FizzOS and QwzSpace engines and GamesHost infrastructure. It is a
receiving record; runtime membership continues to come from the authored inputs.

## Current source composition

This complete application lives under Public Media's declared Public Games child.
Its package metadata names this existing application repository. Source receiving,
installed provider composition, successful builds, deployment, and public observation
remain separate. The current scripts and explicit source inputs below govern the
portable interface.

Consumers can import `@causeway-services/play/catalog` (`discoverCatalog` and
`readGitCatalogSources`) and `@causeway-services/play/catalog-presentation`
(`playUrl`, `hasBrowser`, and the existing presentation helpers). Importing these
surfaces does not require a machine-specific Group checkout or execute game code.

`discoverCatalog({sources, generatedDate, observePages: false})` receives a nonempty
array of local Git source bindings. Every binding provides:

- `repositoryRoot`: the absolute, exact root of an existing Git checkout
- `catalogRoots`: nonempty repository-relative directories containing authored records
- `gameSiteRoots`: explicit repository-relative directories containing game gitlinks;
  use an explicit empty array for a source with no such children
- optional `repository`: the caller's nonempty repository identity label

Roots cannot escape their checkout. Each supplied source must contribute an authored
record; missing roots, listed-but-missing records and missing pinned objects refuse
composition. Worktree catalog records must be regular files whose resolved location
stays inside the declared roots; file symlinks and redirected outside ancestors refuse
before reading record bytes. This is a source-custody check, not a hostile-filesystem
sandbox guarantee. An intentional staged deletion is no longer enumerated by Git. Ordinary
records still include tracked and nonignored untracked files, excluding generated/test
directories and retained `lib/legacy` history. Pinned child records come from their
exact gitlink commits in either materialization state. Duplicate IDs still refuse.

Compose Public Games and external Science through separate bindings when they live
in separate repositories. A Public Games-only binding does not prove that the external
Science input was received. The caller must supply the complete received source set;
the application neither invents a membership registry nor hardcodes today's games.
The old integrated Group scan remains a lazy compatibility adapter for existing
callers. Outside that layout, omitted sources refuse on discovery, not on import.

The internal catalog retains `repoPath` and `catalogSource` (record path, Git HEAD,
actual blob hash, worktree-versus-Git-object read, and child pin when applicable).
The optional repository label is a caller binding, not a remote verification or
canonical-admission receipt. A worktree record is not claimed to equal Git HEAD.
Both internal provenance fields are omitted from public catalog JSON.

`createShelfProjector({sources, date, observePages: false})` on the publication export
binds these inputs to the existing static publisher. `victor.config.mjs` accepts an
explicit JSON source array through `PLAY_CATALOG_SOURCES` and an optional real UTC
date `PLAY_CATALOG_DATE=YYYY-MM-DD`. These are invocation inputs, not a persistent
registry. The default publisher performs no page observations; unchecked pages are
labelled not checked. A programmatic caller may explicitly request observations with
the boolean `observePages: true`; nonboolean values refuse before source reads.

Play selects `feeds: false` in that same publisher configuration. Its shelf and
daily page are projections of the authored game catalog, and `content/` has no
document publication stream. The publisher therefore omits RSS, Atom and JSON
Feed files and their generated discovery links. Catalog generation dates and
daily seed dates retain their own meanings.

The terminal application also accepts `PLAY_CATALOG_SOURCES`. Its default is local
discovery, with no HTTP request. Setting `SHELF_CATALOG_URL` explicitly opts into the
existing remote-read/local-fallback behavior. `SHELF_DURANTE_TERMINAL_BIN` supplies
the received absolute Durante client path; the pure terminal-launch export accepts
the same path as `planLaunch(game, {duranteTerminalBin})`. Without the integrated
layout or an explicit client path, no terminal location is invented. Browser/API
entries and the full authored terminal and chrome assets remain present.

Provider versions are not selected by this interface. In particular, an older
registry label does not qualify current Parlor or Weiqi replay contracts. Engineering
implementations remain external. The actual full provider/game composition must be
received before running the full suite or build; the portable tests use synthetic
local Git inputs and no real game/provider execution, terminal spawn or HTTP request.

Bounded controls:

```
node --test test/catalog-source-selection.test.mjs test/portable-composition.test.mjs
```

A progressively enhanced shelf reads the generated `catalog.json` and renders
game cards with a static HTML baseline. Browser clients and terminal/API clients
remain first-class: a game's authored `entryPoints.headless` describes its own
API, independently of its browser page.

## Layout

| Path | Responsibility |
| --- | --- |
| `victor.config.mjs` | Bind explicit catalog sources to the existing VICTOR publisher. |
| `src/discover-catalog.mjs` | Read authored records and validate their original game exports. |
| `src/publication.mjs`, `src/shells.mjs` | Produce the shelf, daily page and browser assets through VICTOR and TUFTE. |
| `js/catalog.mjs`, `js/today.mjs`, `js/glyphs.mjs` | Filter/render the shelf and compute the supported daily seed projections. |
| `css/style.css`, `chrome/` | Shared theme and shelf chrome. |
| `scripts/shelf-browser.mjs`, `src/shelf/` | Arnold terminal shell, pure navigation and launch planning. |
| `test/` | Native Node behavioral cases. |
| `public/` | Generated publication: HTML, catalog, fingerprinted assets and release manifest. |
| `public.report.json` | VICTOR build, conformance and artifact receiving report, outside the served output. |

## Install and run

Use Node >=24.2.0 and the native PNPM lock. The current composition was received
with Node 24.22.1 and PNPM 11.25.0:

```sh
pnpm install --frozen-lockfile --ignore-scripts --registry=https://registry.561.group
```

`package.json` selects exact published Arnold 0.3.0, Gaming 0.1.10, TUFTE
0.17.0-dev.1, VICTOR 0.1.20-dev.0 and Weiqi 0.3.4, plus esbuild 0.28.1 and Wrangler
4.123.0. The native lock preserves their transitive selections. The workspace
configuration admits the exact selected TUFTE 0.17.0-dev.1 and VICTOR
0.1.20-dev.0 releases through PNPM's release-age check, retaining the earlier
TUFTE 0.16.5-dev.0 admission. It does not override another provider's dependencies.

Receive the complete authored source set and each selected game's declared
dependencies before building: discovery executes the actual manifest/verifier
exports. Set `PLAY_CATALOG_SOURCES` to the JSON array described above. For
example, if the deployment has prepared that invocation array in a local file:

```sh
export PLAY_CATALOG_SOURCES="$(cat /absolute/path/catalog-sources.json)"
export PLAY_CATALOG_DATE=2026-10-25
npm run build
npm run serve
```

Use the real intended UTC build date, or omit `PLAY_CATALOG_DATE` to use the
current date. `npm run build` invokes the installed VICTOR CLI and writes
`public/`. `npm run serve` previews the existing output with the pinned
Wrangler; `npm run dev` rebuilds first. Outside the legacy integrated checkout,
omitting the explicit sources refuses discovery rather than supplying a
partial catalog. No `serve.mjs` or hand-maintained build-catalog script is used.

## The terminal shelf browser

```
npm run shelf                # node scripts/shelf-browser.mjs
```

A terminal app onto the same authored catalog. It discovers local source records
by default. `SHELF_CATALOG_URL=https://play.561.group/catalog.json` explicitly
opts into a remote read, with local-source fallback if that read fails.

Keys: `↑`/`↓` select a game (shelf headers are skipped), `PgUp`/`PgDn` scroll the detail
pane, `Enter` launches, `q` / `Ctrl-C` quit.

`Enter` does one of three honest things, matched by the selected game's `id` and
`entryPoints`, never guessed:

- `durante`, when its terminal client has been received: spawns its actual client
  with `stdio: "inherit"`, hands over the terminal until it quits and then repaints
  the shelf. Set `SHELF_DURANTE_TERMINAL_BIN` to its absolute received path outside
  the integrated checkout.
- any other game with an `entryPoints.browser`: prints its URL and returns to the shelf --
  no takeover, since there is no terminal client for it.
- nothing launchable: says so, plainly.

Farstone retains its authored browser and API record; no absent terminal client
is invented. The terminal UI uses Arnold 0.3.0's layout and widget exports.
All navigation and launch-planning logic lives in `src/shelf/*.mjs` as pure functions --
`scripts/shelf-browser.mjs` is only the imperative shell (fetch, run the `Screen`, execute
whatever a plan says). The portable source and launch cases exercise plans without
opening a terminal or spawning a game.

## Test

`npm test` invokes `node --test test/*.test.mjs`. Some older integration cases
still assume the legacy Group checkout, neighboring game directories and terminal
client. They are not claimed to pass in an isolated application checkout. The
dated receiving record lists the exact 56-case portable/mobile/catalog/route
command qualified with the complete current provider composition. The complete
native build separately executes all selected catalog manifest/verifier imports
and the publisher's HTML, asset and release checks.

## Deploy

The existing `wrangler.jsonc` declares the `play-561-group` Cloudflare Worker,
its `play.561.group` custom domain, and `assets.directory: "./public"`.
Only the generated publication directory is the declared asset source.

```sh
npm run build     # complete publication from the explicitly received source set
npm run deploy    # rebuild, then deploy with the pinned Wrangler
```

These are the repository's native commands. Production requires the existing
Cloudflare identity and target custody. A local build or Wrangler dry-run is not
a deployment receipt. The current workflow covers bounded source tests; it does
not itself provide a production deployment job.

## catalog.json

**Generated — never hand-edit.** `src/discover-catalog.mjs` collects each selected
source's own `catalog-entry.json`, and the shelf projector publishes the result
as `public/catalog.json`. Run `npm run build` with the complete source bindings
when an authored record changes. Records remain owned by their original game or
service repository.

Each game's `catalog-entry.json` is shaped like the spec's `CartridgeManifest`: `id`,
`displayName`, `description`, `subdomain`, `entryPoints`, `seedPolicy`, `intentLog`,
`keywords`, plus the optional `configs`, `energy`, and `replayVerifier`. A field an entry
can't honestly fill in yet (a `replayVerifier` module, an `intentLog.schemaRef`) is
omitted, never set to `null` -- `test/smoke.test.mjs` describes that standing rule. Do
not include `repoPath`: the generator derives it from wherever it actually found the
manifest (build-time only; the published catalog.json omits it), which is also why a game's
directory moving can never leave a stale path behind the way hand-typed `repoPath` values used to.

On top of the spec, each entry carries a few storefront-only extensions:

- `status`: `"playable"` or `"in-development"`.
- `statusNote`: a short note when there's something worth knowing beyond the description
  (a known limitation, a design constraint) -- omitted when there's nothing to add.
- `cartridgeWrapped` / `energyBankWrapped`: whether the game ships its own
  `@red-cup-engineering/gaming/running` manifest module / settles against
  `@red-cup-engineering/energy-bank`. A manifest claiming `cartridgeWrapped: true` is held
  to it: the generator stats `replayVerifier`'s file and import-checks its named export,
  and refuses to build if either doesn't resolve against the real tree -- it does not trust
  the claim.
- `shelf`: which shelf-within-the-shelf the game lives on (Card Table / Puzzle Den /
  Study / Deep / Stars / substrate / unshelved).

## Adding a game

Add the authored `catalog-entry.json` in the game's own source owner and expose
its real manifest/verifier through that game's public package contract where
available. Include its original source root in the caller's complete admitted
bindings and rebuild. Ordinary game cards use the manifest fields without a
per-title shelf implementation. A new `daily-utc` game also needs its seed
projection received in `js/today.mjs` against the game's actual seed contract;
do not infer a daily formula from the title or hostname.
