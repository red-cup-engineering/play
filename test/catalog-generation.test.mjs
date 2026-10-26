import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverCatalog } from '../src/discover-catalog.mjs';
import { catalogSources } from './publication.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const exec = promisify(execFile);

// Mutation cases keep their original synthetic authored records in a separate
// Git source. The real game sources remain read-only and explicitly selected.
async function fixture(t) {
  const repositoryRoot = await mkdtemp(path.join(tmpdir(), 'play-catalog-generation-'));
  t.after(() => rm(repositoryRoot, { recursive: true, force: true }));
  const git = (...args) => exec('git', ['-C', repositoryRoot, '-c', 'core.hooksPath=/dev/null', ...args]);
  await git('init', '-q');
  await writeFile(path.join(repositoryRoot, 'README'), 'Synthetic catalog mutation fixture; no game runtime.\n');
  await git('add', 'README');
  await git('-c', 'user.name=Catalog generation fixture', '-c', 'user.email=catalog-fixture@example.invalid',
    'commit', '-qm', 'original catalog mutation fixture');
  return { root: repositoryRoot, sources: [...(catalogSources ?? []), {
    repository: 'fixture/catalog-generation', repositoryRoot, catalogRoots: ['.'], gameSiteRoots: [],
  }] };
}

test('every game with a catalog-entry.json is represented in catalog.json exactly once', async () => {
  const { catalog } = await discoverCatalog({ sources: catalogSources });
  const ids = catalog.games.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate game id in generated catalog');
  assert.ok(ids.length > 0, 'expected at least one game');
});

test('catalog sidecars expose every independently replayable casino and parlor game, never their non-game service lobbies', async () => {
  const { catalog } = await discoverCatalog({ sources: catalogSources });
  const byId = new Map(catalog.games.map((game) => [game.id, game]));

  for (const id of ['blackjack', 'slots', 'pig', 'farkle', 'yacht', 'chutes', 'reels']) {
    const game = byId.get(id);
    assert.ok(game, `expected the executable ${id} manifest to have a shelf record`);
    assert.equal(game.cartridgeWrapped, true, `${id} must retain its replay contract`);
    assert.equal(typeof game.replayVerifier, 'string', `${id} must name its verifier`);
  }
  assert.equal(byId.has('casino'), false, 'Casino is a service lobby, not one game');
  assert.equal(byId.has('parlor'), false, 'Parlor is a service lobby, not one game');
});

test('build ignores generated dist trees, which are publication artifacts rather than game homes', async (t) => {
  const source = await fixture(t);
  // An explicit source must contain an authored record. Its invalid generated
  // sibling must still be excluded before JSON parsing.
  await writeFile(path.join(source.root, 'catalog-entry.json'), JSON.stringify({
    id: '__catalog-dist-control', displayName: 'Dist exclusion control', subdomain: 'dist-control',
    entryPoints: { browser: '/' }, cartridgeWrapped: false,
  }));
  const tempDir = path.join(source.root, '__catalog-dist-test-fixture', 'dist');
  await mkdir(tempDir, { recursive: true });
  await writeFile(path.join(tempDir, 'catalog-entry.json'), '{ this is not authored catalog JSON }', 'utf8');

  try {
    await discoverCatalog({ sources: source.sources });
  } finally {
    await rm(path.dirname(tempDir), { recursive: true, force: true });
  }
});

test('discoverCatalog() refuses to build when a cartridgeWrapped:true manifest claims a replayVerifier that does not exist on disk', async (t) => {
  // Regression: catalog.json used to keep claiming cartridgeWrapped:true for
  // flickering-delve with a replayVerifier pointing at a src/cartridge.manifest.mts
  // that had already been deleted -- nothing checked that claim against
  // reality. Plant a real throwaway manifest making the same false claim and
  // prove the generator now refuses to build rather than publishing it.
  const source = await fixture(t);
  const tempDir = path.join(source.root, '__catalog-generation-test-fixture');
  await mkdir(tempDir, { recursive: true });
  await writeFile(
    path.join(tempDir, 'catalog-entry.json'),
    JSON.stringify({
      id: '__catalog-generation-test-fixture',
      displayName: 'Test Fixture',
      description: 'Throwaway fixture for catalog-generation.test.mts',
      subdomain: 'test-fixture',
      entryPoints: { browser: '/' },
      seedPolicy: { kind: 'on-demand' },
      intentLog: { schemaVersion: 'test-v1' },
      replayVerifier: 'src/does-not-exist.mts#verify',
      keywords: ['test'],
      status: 'playable',
      cartridgeWrapped: true,
      energyBankWrapped: false,
      shelf: 'unshelved',
    }),
    'utf8',
  );

  try {
    await assert.rejects(
      () => discoverCatalog({ sources: source.sources }),
      /replayVerifier module does not exist/,
      'expected discoverCatalog() to reject a cartridgeWrapped:true manifest whose replayVerifier file is missing',
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});

// A new authored record and a later edit must reach the actual page without
// maintaining a second inventory or writing a source catalog.json.
test('authored additions and edits reach publication directly', async (t) => {
  const { publishShelf } = await import('../src/publication.mjs');
  const source = await fixture(t);
  const home = path.join(source.root, '__source-change-fixture');
  const moved = path.join(source.root, '__relocated-source-fixture.play.561.group');
  await mkdir(home, { recursive: true });
  const record = { id: '__source-change-fixture', displayName: 'Unlisted source', description: 'First description', subdomain: 'source-change-fixture', hostname: 'authored-address.561.group', entryPoints: { browser: '/lesson/' }, status: 'in-development', seedPolicy: { kind: 'on-demand' }, cartridgeWrapped: false, keywords: ['fixture'], shelf: 'Study' };
  try {
    await writeFile(path.join(home, 'catalog-entry.json'), JSON.stringify(record));
    const first = await publishShelf({ observePages: false, sources: source.sources });
    assert.ok(first.artifacts.find((asset) => asset.path === 'index.html').body.includes('First description'));
    assert.ok(first.artifacts.find((asset) => asset.path === 'index.html').body.includes('href="https://authored-address.561.group/lesson/"'));
    record.description = 'Edited at the source';
    delete record.hostname;
    await writeFile(path.join(home, 'catalog-entry.json'), JSON.stringify(record));
    const second = await publishShelf({ observePages: false, sources: source.sources });
    const html = second.artifacts.find((asset) => asset.path === 'index.html').body;
    assert.ok(html.includes('Edited at the source'));
    assert.ok(!html.includes('First description'));
    assert.ok(html.includes('href="https://source-change-fixture.561.group/lesson/"'));
    assert.equal(JSON.parse(second.artifacts.find((asset) => asset.path === 'catalog.json').body).games.filter((game) => game.id === record.id).length, 1);
    await assert.rejects(() => readFile(path.join(ROOT, 'catalog.json')), { code: 'ENOENT' });
    await rename(home, moved);
    const relocated = await publishShelf({ observePages: false, sources: source.sources });
    const relocatedHtml = relocated.artifacts.find((asset) => asset.path === 'index.html').body;
    assert.ok(relocatedHtml.includes('href="https://source-change-fixture.561.group/lesson/"'));
    assert.ok(!relocatedHtml.includes('https://__relocated-source-fixture.play.561.group/'));
  } finally {
    await rm(home, { recursive: true, force: true });
    await rm(moved, { recursive: true, force: true });
  }
});

// HTTP observations cannot promote authored or broken games into tested play.
test('page observations retain access and distinguish HTML success, failure, and non-HTML replies', async () => {
  const { observeBrowserPages } = await import('../src/discover-catalog.mjs');
  const { catalogCardBodyHtml } = await import('../js/catalog.mjs');
  const games = ['html', 'failure', 'json', 'offline'].map((id) => ({ id, displayName: id, subdomain: id, status: 'playable', entryPoints: { browser: '/' } }));
  const fetchImpl = async (url) => {
    const id = new URL(url).hostname.split('.')[0];
    if (id === 'offline') throw new Error('offline');
    return new Response(id, { status: id === 'failure' ? 503 : 200, headers: { 'content-type': id === 'json' ? 'application/json' : 'text/html' } });
  };
  const observed = await observeBrowserPages(games, { fetchImpl, checkedAt: '2026-10-04T00:00:00Z' });
  assert.deepEqual(observed.map((game) => game.availability.state), ['reachable', 'unavailable', 'unavailable', 'unavailable']);
  assert.ok(observed.every((game) => catalogCardBodyHtml(game).includes(`href="https://${game.subdomain}.561.group/"`)));
  assert.ok(observed.every((game) => game.status === 'playable'));
});
