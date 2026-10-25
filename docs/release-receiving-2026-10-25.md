# Published-provider build and local carrier receiving — 2026-10-25

The complete Play publication builds from all 21 authored game records using
the original VICTOR publisher and immutable registry providers. The existing
Wrangler 4.123.0 also produces its local upload successfully. This receiving
does not assert a new production Worker version, public-player use, advertising
activation or commercial results.

The [machine-readable receiving record](release-receiving-2026-10-25.json)
contains the exact original commits, trees and catalog blobs, dependency-file
hashes, provider source comparison, build digest, native test command and local
Worker carrier digest. The [game inventory](game-inventory-2026-10-25.json)
retains the titles and immutable authored-source links. Both are dated evidence;
runtime membership continues to come from the caller's authored source inputs.

## Required source correction

The base is `causeway-services/play` commit
[`8889c5c41223dc43db0304bbd2f07d3cbdeaaf01`](https://github.com/causeway-services/play/commit/8889c5c41223dc43db0304bbd2f07d3cbdeaaf01),
tree `8ea3188c440778fb9be3ad66360780224a811d7d`. Its five `workspace:*`
selectors did not specify an installable isolated registry composition.
`package.json` now selects these actual received releases, and the original
PNPM lock was regenerated through PNPM rather than edited by hand:

| Provider | Exact version | Play responsibility |
| --- | --- | --- |
| `@red-cup-engineering/arnold` | `0.3.0` | Existing terminal UI primitives. |
| `@red-cup-engineering/gaming` | `0.1.10` | Existing manifest and UTC seed contracts. |
| `@red-cup-engineering/web-page-tiling-engine` | `0.16.5-dev.0` | TUFTE fragment rendering and the touch-style export. |
| `@red-cup-engineering/static-site-publisher` | `0.1.18` | Native VICTOR publication, asset transformation and release verification. |
| `@red-cup-engineering/weiqi-engine` | `0.3.4` | The published Weiqi contract, including its verifier. |
| `esbuild` | `0.28.1`, unchanged | Native browser bundling. |
| `wrangler` | `4.123.0`, unchanged | Existing Cloudflare build/preview/deploy tool. |

No Play application runtime source, game economic rule, replay format, Worker
target or deployment configuration changed in this correction. README usage
was brought into agreement with the existing scripts. The separate original
Stoke description correction is recorded below.

PNPM 11.25.0 generated a narrowly scoped `minimumReleaseAgeExclude` entry in
`pnpm-workspace.yaml` for exactly
`@red-cup-engineering/web-page-tiling-engine@0.16.5-dev.0`. This admits the
explicitly selected fresh archive. It does not change other providers'
selections, introduce a broad age exemption or override VICTOR's own TUFTE
0.14.2 dependency. Both TUFTE versions retain their respective native consumers.

## Published TUFTE source identity

The exact 0.16.5-dev.0 archive exists at the house registry even though its
`latest` label was still 0.16.3 when read. Its publication identifies original
source commit
[`e80fd0f3730f3f8729f61dcaa49f120af0b400ce`](https://github.com/red-cup-engineering/web-page-tiling-engine/commit/e80fd0f3730f3f8729f61dcaa49f120af0b400ce).
The archive was downloaded, checked against its published SHA-1 and SHA-512
integrity, and compared against that commit's actual Git blobs:

- All 57 nonmanifest files equal the original source blobs.
- The package manifest has the same semantic content, with only the published
  `gitHead` field added.
- `src/tufte-theme.mjs` has original blob
  `c07a04039195ca5091613a84e4216c20ce886695`; its installed touch-style export
  supplies the 572-byte CSS artifact emitted by this build.
- Archive SHA-1: `ddb82ae46aa99a96c3f26b63bf55c114dc63ed68`.
- Archive integrity:
  `sha512-gvf9Xn9NRSnvlUCeKRz6/M7eOlTxdNte4c1fYkzhxzkTpTZOPRa5h3qOd5bH80ljBiw5IT8Yj4ftLbvUUBf5rg==`.

The other four newly pinned registry artifacts were also independently checked
against their native lock integrities and installed shipped files. Across those
five artifacts, the receiver compared 160 installed files. No substitute
provider was installed and no occupied release was republished for this build.

## Original game source composition

The build starts from the 16 source bindings identified by the dated inventory
and advances only Stoke to its original-owner description correction below.
It does not infer source versions from current public pages or claim that every
selected commit is the latest main. Catalog membership and source ownership
remain with the original records, including the separate Science Weiqi record
and Public Equivo service record.

Private source Git access was unavailable in this receiving environment.
Original GitHub commit, tree and blob objects were therefore read through the
existing source connector and materialized locally, accepting each object only
when its native Git hash equaled the original admitted hash. Public Equivo was
received through an ordinary original Git clone. Each source's `HEAD` is its
actual original commit. There are no synthetic replacement commits, replacement
refs or substituted catalog records.

The materialization is bounded to the selected catalog and required executable
source blobs. It is not a complete historical clone of each repository. The
independent receiver read back all 16 initial remote commit/tree identities and
compared 363 initially materialized tracked files to their original tree blobs.
The corrected Stoke input below received 28 current source files through the
same exact-hash contract. The final catalog's 21 source-record hashes also equal
the corresponding blobs at the selected original
commits. Its internal provenance remains `readFrom: worktree`, accurately
describing how discovery read those received bytes.

Ten source owners execute their own public manifest/verifier exports during
discovery. Their original dependency declarations were received through one
temporary native PNPM workspace with a separate frozen lock. An auxiliary
receiving-root dependency supplies the actual Weiqi 0.3.4 verifier to Science's
authored package reference. The build changes none of those original manifests.

Both Play and the external source workspace passed native frozen, offline
installation. All 91 direct Play/original-game dependency edges matched their
declared exact versions; the independent receiver also checked the auxiliary
Weiqi edge, making 92 in that audit. Neither lock contains dependency overrides
or patched suppliers. The external 714,339-byte lock's SHA-256 is
`eab8f8286f8c508e7d2a9a1c393bb2fdd55be152ad662d1e587c47fba9313272`.
The receiving JSON records its manifest and workspace hashes as well. This
temporary composition is qualification evidence, not another runtime catalog
or service ownership model. Frozen offline receiving passed again after the
Stoke source correction, with the same lock bytes.

## Stoke's original description correction

The actual preview exposed a remaining false statement in Stoke's original
cartridge manifest: it called the current prestige estimate the dominant
Perron-Frobenius eigenvalue and the resource mixture literally its eigenvector.
The known convergence limitation means those claims are too strong; numerical
behavior remains governed by the historical rules pending a versioned migration.

The source owner corrected only the description fields in its then-current
`src/cartridge.manifest.mjs` and `package.json`, through
[Stoke PR 4](https://github.com/red-cup-engineering/stoke/pull/4), merged as
[`b1daba6b040722d38080a09af44419914b2d1d8c`](https://github.com/red-cup-engineering/stoke/commit/b1daba6b040722d38080a09af44419914b2d1d8c),
tree `8c6be17556be9a66999d1853ab0375057cafb31e`. The cartridge manifest's exact
blob is `1b0c63854e790da106b1316897409c4aa4b4f4f7`; the package manifest's is
`55035f1653ca252cdecf81647c07956776d7b63f`. The original `catalog-entry.json`
still references that same public cartridge export and is unchanged.

Play then received that original commit and 28 selected matching source blobs,
retaining the other 15 original source bindings. The native publisher re-read
the manifest normally. Exactly one public catalog field changed:
`stoke.description`. It now describes the current rules' approximate matrix
calculation, including inaccurate or unsettled results on some graphs and the
preservation of existing saved-run rules. No shelf-side description override,
economy change, replay migration or substitute verifier was introduced.

The native rebuild and local Wrangler dry run passed again. Exactly three of
the 20 publication artifacts changed: `catalog.json`, `index.html` and
`release-manifest.json`. All browser JavaScript, CSS and the other 17 artifacts
remain byte-identical. Prior-input artifacts, hashes and browser evidence were
retained separately. The following release identities name the corrected input.

## Native build and tests

The receiving toolchain was Node 24.22.1, npm 11.9.0, PNPM 11.25.0 and Git
2.51.1. Both dependency installations used the declared house registry; the
subsequent frozen checks used the native local cache offline.

With `PLAY_CATALOG_SOURCES` set to the complete array of received original Git
bindings and `PLAY_CATALOG_DATE=2026-10-25`, the existing `npm run build` invokes:

```sh
static-site-publisher build content public --config=victor.config.mjs
```

The complete VICTOR build passed with zero refusals and zero advisories. Its
native HTML and static-site conformance checks passed. It emitted 20 artifacts:
the nine shelf projector artifacts plus VICTOR's generated publication assets
and metadata. The release manifest verifies the other 19 files, totaling
207,321 bytes; it excludes itself from that count. The publisher reports zero
document content cells because the game's 21-record catalog is supplied by the
shelf projector. That count does not mean the game catalog was empty.

The resulting catalog contains all 21 game IDs and ten UTC daily strips. A
separate read-only discovery from the same original bindings reproduced its
bytes exactly. Page observation remained disabled; no successful browser
availability was invented from an author's playability claim. Internal local
paths and `catalogSource` are absent from public JSON.

Native release digest:
`ni:///sha-256;C5cYC_X_CwT2JIlXPttYmWOin4E5Z9WMVdSsRzadEGA`.

Generated catalog SHA-256:
`0e1fd0a86b2b989e935a09679d600889226bf5d782b47532649c9249b485e239`.

This exact native command qualified the unchanged Play runtime and dependency
composition before the later Stoke description correction: 56 tests passed,
with zero failures, cancellations, skips or todos:

```sh
node --test --test-isolation=none --test-reporter=tap \
  test/mobile-contract.test.mjs \
  test/ad-footer.test.mjs \
  test/catalog-source-selection.test.mjs \
  test/catalog-package-refs.test.mjs \
  test/portable-composition.test.mjs \
  test/catalog-availability-status.test.mjs \
  test/player-shelf.test.mjs \
  test/router-wiring.test.mjs
```

This is the bounded source/mobile/catalog/Worker-route set. Older integration
tests still depend on the legacy integrated checkout and neighboring source
paths; this record does not claim a full isolated-repository suite pass. The
unchanged UI source had earlier Chromium desktop/mobile/no-JavaScript receiving
documented in README. The fresh preview below provides additional receiving of
the actual frozen dependency/build output.

## Independent local browser receiving

Before the original Stoke description correction, the independent root receiver
ran the original Wrangler 4.123.0 local preview on port 8971, using the completed
`public/` assets and a separate temporary persistence directory. It did not
rebuild or change runtime source or output.
Actual Chromium checks passed at 1440×1000, 390×844 and 320×700:

- The page returned HTTP 200 and rendered all 21 authored game links.
- Search was enabled; entering `farkle` displayed `1 game` and Farkle.
- The reported-playable filter's `aria-pressed` state changed to `true`.
- The native status controls were at least 44 CSS pixels high.
- No page exceptions or horizontal overflow were observed in the checked
  initial and searched layouts.

The receiver also visually reviewed the desktop and 390px screenshots. The
JSON record binds the prior-input receipt and screenshot bytes by SHA-256. External
`ads.561.group` requests were deliberately aborted. This receives the local
shelf UI and does not test downstream game destinations, advertising delivery,
a new production version, or public use. The earlier daily-strip and
no-JavaScript checks were not repeated in this fresh preview.

## Native Worker carrier

The existing `wrangler.jsonc` remains byte-for-byte unchanged: Worker
`play-561-group`, custom domain `play.561.group`, and `assets.directory` set to
`./public`. The local dry run used the actual declared Wrangler 4.123.0:

```sh
node node_modules/wrangler/bin/wrangler.js deploy --dry-run \
  --config wrangler.jsonc --outdir ../wrangler-dry-run \
  --outfile ../wrangler-dry-run.multipart
```

It exited successfully and emitted Wrangler's own assets-only no-op Worker
upload. No new application Worker was written. The existing
`@red-cup-engineering/computer-web-platform` 0.6.1 `shippedDigestOf` then received
the actual configuration, all output bytes and native multipart upload. Its
content address for the corrected original source composition is:

`sha256:47b271265a2d641a7c68ccd34006b0ff822c423dbe51a085bd47fa456e54a86d`.

The native owner normalizes transport boundaries and the emitted source map's
local output directory when computing that address, while retaining uploaded
module and map content. The raw multipart hash is also retained in the JSON
receipt. This was local carrier receiving only: no `reconcileWorkerSite`
production call, `deployed.json`, live Worker version or rollback receipt was
created.

## Production handoff boundary

The prepared application has its original native install/build/deploy scripts
and current target declaration. A production operation still has to use the
existing Cloudflare identity and deployment owner's actual release custody,
then receive the resulting public assets and version. The repository's bounded
test workflow does not perform that production operation.

The public Play endpoint answered successfully during this session, but its
catalog still identified generation date 2026-10-04. That observation does not
identify a deployed Git commit and is not evidence that this 2026-10-25 candidate
has reached players. Source qualification, local upload preparation and public
deployment remain separately evidenced.
