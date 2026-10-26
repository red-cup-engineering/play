import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import observations from '../docs/player-observations-2026-10-26.json' with { type: 'json' };
import inventory from '../docs/game-inventory-2026-10-25.json' with { type: 'json' };
import { attachPlayerObservations, validatePlayerObservations } from '../src/player-observations.mjs';
import { discoverCatalog } from '../src/discover-catalog.mjs';
import { browserAvailable, catalogCardBodyHtml, catalogEntryToTile, observedEntryBlocked, playerObservationHtml } from '../js/catalog.mjs';
import { detailText, listLabel } from '../src/shelf/catalog.mjs';

const cutoff = '2026-10-26';
function entry(id) {
  const note = observations.games.find(game => game.id === id);
  const url = new URL(note.entryUrl);
  return { id, displayName: inventory.games.find(game => game.id === id).displayName,
    hostname: url.hostname, entryPoints: { browser: url.pathname },
    description: 'Original authored description.', status: 'playable',
    availability: { state: 'reachable', httpStatus: 200, checkedAt: '2026-10-26T00:00:00Z' } };
}
const attach = games => attachPlayerObservations(games, { asOf: cutoff });

test('retained checks cover the actual 21-game inventory without claiming completion or a deployment revision', () => {
  assert.strictEqual(validatePlayerObservations(observations), observations);
  assert.equal(observations.games.length, 21);
  assert.deepEqual(new Set(observations.games.map(game => game.id)), new Set(inventory.games.map(game => game.id)));
  assert.ok(observations.games.every(game => game.completion === 'not-verified'));
  assert.ok(observations.games.every(game => !('deployedRevision' in game)));
  assert.match(observations.scope, /not a fabricated per-page timestamp/);
  assert.deepEqual(observations.games.filter(game => game.state === 'blocked').map(game => game.id).sort(), ['blackjack', 'farstone', 'slots']);
});

test('blocked player entries stay visibly blocked even when authored playable and HTTP reachable', () => {
  for (const id of ['blackjack', 'slots', 'farstone']) {
    const original = entry(id), before = structuredClone(original);
    const [game] = attach([original]);
    assert.deepEqual(original, before, 'publication does not mutate original evidence');
    assert.equal(game.status, 'playable');
    assert.strictEqual(game.availability, original.availability);
    assert.equal(browserAvailable(game), true, 'existing HTTP helper keeps its exact meaning');
    assert.equal(observedEntryBlocked(game), true);
    assert.equal(catalogEntryToTile(game).confidence, 'low');
    const html = catalogCardBodyHtml(game);
    assert.match(html, /Entry blocked at check/);
    assert.match(html, /Reported playable/);
    assert.match(html, /Page reached/);
    assert.match(html, /Recheck /);
    assert.match(html, /Recorded <time datetime="2026-10-26">2026-10-26<\/time>/);
    assert.ok(html.includes(game.playerObservation.summary));
    assert.match(listLabel({ game }), /entry blocked at check/);
    assert.match(detailText(game), /Full game completion: not verified/);
  }
});

test('environment-limited Aletheon and the Gnaw title remain qualified observations', () => {
  const [aletheon, gnaw] = attach([entry('aletheon'), entry('flickering-delve')]);
  assert.equal(observedEntryBlocked(aletheon), false);
  assert.match(playerObservationHtml(aletheon), /Browser limitation observed/);
  assert.match(playerObservationHtml(aletheon), /not a claim that the service is unavailable to every browser/);
  assert.doesNotMatch(playerObservationHtml(aletheon), /Entry blocked at check/);
  assert.equal(gnaw.displayName, 'Flickering Delve');
  assert.equal(gnaw.id, 'flickering-delve');
  assert.equal(gnaw.playerObservation.observedTitle, 'the Gnaw');
  assert.match(playerObservationHtml(gnaw), /the Gnaw/);
  assert.match(playerObservationHtml(gnaw), /stripe\(off\)/);
});

test('future records, moved entrances, headless entries and unobserved games do not acquire stale check labels', () => {
  const source = entry('farstone');
  assert.strictEqual(attachPlayerObservations([source], { asOf: '2026-10-25' })[0], source);
  for (const changed of [
    { ...source, hostname: 'new.561.group' },
    { ...source, entryPoints: { browser: '/new-game/' } },
    { ...source, entryPoints: { headless: '/api' } },
    { ...source, id: 'future-game' },
  ]) assert.strictEqual(attach([changed])[0], changed);
  assert.equal(playerObservationHtml(source), '');
});

test('malformed or duplicate observation documents fail rather than silently mislabel a game', () => {
  for (const change of [
    doc => { doc.games.push(doc.games[0]); },
    doc => { doc.games[0].state = 'verified-playable'; },
    doc => { doc.games[0].completion = 'completed'; },
    doc => { doc.games[0].observedUrl = 'https://other.example/'; },
    doc => { doc.recordedOn = '2026-02-30'; },
  ]) {
    const document = structuredClone(observations); change(document);
    assert.throws(() => validatePlayerObservations(document), /invalid/);
  }
  assert.throws(() => attachPlayerObservations([], { asOf: 'tomorrow' }), /UTC date/);
});

test('observation prose is escaped and cannot inject markup into browser cards', () => {
  const [game] = attach([entry('blackjack')]);
  game.playerObservation = { ...game.playerObservation,
    summary: '<script>bad()</script>', details: ['<img src=x onerror=bad()>'], environment: '<bad>' };
  const html = playerObservationHtml(game);
  assert.match(html, /&lt;script&gt;bad\(\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>|<img|<bad>/);
});

test('real discovery publishes player checks beside independently observed HTTP evidence', async t => {
  const root = await mkdtemp(path.join(tmpdir(), 'play-observed-source-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const execute = promisify(execFile);
  const git = async (...args) => execute('git', ['-C', root, '-c', 'core.hooksPath=/dev/null', ...args]);
  await git('init', '-q');
  const authored = entry('blackjack'); delete authored.availability;
  await writeFile(path.join(root, 'catalog-entry.json'), JSON.stringify(authored));
  await git('add', 'catalog-entry.json');
  await git('-c', 'user.name=Player observation fixture', '-c', 'user.email=observation@example.invalid', 'commit', '-qm', 'Synthetic original-owner fixture');
  const { catalog, json } = await discoverCatalog({
    sources: [{ repository: 'fixture/casino', repositoryRoot: root, catalogRoots: ['.'], gameSiteRoots: [] }],
    generatedDate: cutoff, observePages: true, checkedAt: '2026-10-26T00:00:00Z',
    fetchImpl: async () => new Response('<h1>Closed</h1>', { headers: { 'content-type': 'text/html' } }),
  });
  assert.equal(catalog.games[0].availability.state, 'reachable');
  assert.equal(catalog.games[0].playerObservation.state, 'blocked');
  const published = JSON.parse(json).games[0];
  assert.equal(published.status, authored.status);
  assert.equal(published.playerObservation.recordedOn, cutoff);
  assert.equal('catalogSource' in published, false);
});
