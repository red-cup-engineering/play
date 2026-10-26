# Recorded player observations

The shelf carries three independent statements: the original game's authored
status, the publisher's HTTP HTML observation, and a dated player observation.
A successful HTTP request does not clear an observed closed entrance or failed
game connection. A single action does not verify a complete game.

`docs/player-observations-2026-10-26.json` retains all 21 live desktop checks from
the Sunday Funday audit. `recordedOn` dates this record; the audit did not retain
precise per-page timestamps or deployed source revisions. The source-record
links identify the game owners from the existing inventory, not the deployed
code observed by the browser. Local Fearful repairs are deliberately absent
from the live-route conclusions until the deployed game is received again.

The document has format `561-player-observations-v1`, a real UTC `recordedOn`
date, scope and environment strings, and one record per checked game. Each
record has an id, original entry URL, inspected destination URL, summary,
details, actual actions, source-record URL and `completion: not-verified`.
The five states have distinct meanings:

| State | Meaning |
| --- | --- |
| `blocked` | The checked entrance explicitly closed or failed before play. |
| `limited` | The interface loaded with a material observed play problem. |
| `environment-limited` | This browser could not establish play; no universal outage is asserted. |
| `action-observed` | The listed reversible action produced a visible transition. |
| `entry-observed` | The entry/interface was inspected without establishing a complete play loop. |

`src/player-observations.mjs` validates the record and joins it by game id plus
the exact original or inspected route. A replacement host or entrance needs a
new check. A historical publication predating the retained record does not
receive future observations. The join does not mutate authored metadata or
HTTP availability, change catalog membership, or rename a game.

The browser shelf and daily page display the dated finding, retain the checked
address, and label a blocked link `Recheck`. The terminal detail includes the
same finding. The Gnaw is identified as an observed page title while its
original `flickering-delve` package identity and authored name are preserved.

To supersede a finding, retain the new browser evidence in the existing
source-owned record workflow, update the admitted observation document, and
run the actual publisher plus desktop/mobile receiving. Do not infer a repair
from a merged source PR, an HTTP 200, or a local screenshot. No observation in
this initial cohort certifies a completed game, payout, mobile device or
deployed revision.
