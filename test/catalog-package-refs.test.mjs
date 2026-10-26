import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const PACKAGE = fileURLToPath(new URL('../', import.meta.url));
const NAME = '@catalog-fixture/native-game';

async function write(root, filename, body) {
  const destination = path.join(root, filename);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, typeof body === 'string' ? body : `${JSON.stringify(body)}\n`);
}

async function git(root, ...args) {
  return (await exec('git', ['-C', root, '-c', 'core.hooksPath=/dev/null', ...args])).stdout.trim();
}

async function fixture(t, { nested = false, relative = false, hiddenManifest = false, hiddenSchema = false } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'catalog-native-owner-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const consumer = path.join(root, 'consumer');
  const owner = path.join(root, 'owner');
  await mkdir(owner, { recursive: true });
  // The consumer deliberately has a conflicting installed game. A resolver
  // anchored to Play must never be able to substitute it for this source.
  await write(consumer, `node_modules/${NAME}/package.json`, {
    name: NAME, type: 'module', exports: { './manifest': './wrong.mjs', './schema': './wrong.mjs' },
  });
  await write(consumer, `node_modules/${NAME}/wrong.mjs`, 'throw new Error("consumer copy must never load");\n');
  for (const filename of ['src/discover-catalog.mjs', 'src/player-observations.mjs', 'docs/player-observations-2026-10-26.json', 'js/catalog.mjs', 'js/glyphs.mjs']) {
    await mkdir(path.dirname(path.join(consumer, filename)), { recursive: true });
    await copyFile(path.join(PACKAGE, filename), path.join(consumer, filename));
  }
  const home = nested ? 'src/games/pig' : '.';
  const modulePath = nested ? `${home}/manifest.mjs` : 'src/manifest.mjs';
  const schemaPath = nested ? `${home}/schema.mjs` : 'src/schema.mjs';
  await write(owner, 'package.json', {
    name: NAME, type: 'module', exports: {
      ...(hiddenManifest ? {} : { './manifest': `./${modulePath}` }),
      ...(hiddenSchema ? {} : { './schema': `./${schemaPath}` }),
      './package.json': './package.json',
    },
  });
  const manifestRef = relative ? 'src/manifest.mjs' : `${NAME}/manifest`;
  const schemaRef = relative ? 'src/schema.mjs' : `${NAME}/schema`;
  await write(owner, modulePath, `
export const verify = (log) => ({ received: log });
export const manifest = {
  id: 'native-owner', displayName: 'Native owner', subdomain: 'native-owner',
  entryPoints: { browser: '/play' },
  replayVerifier: ${JSON.stringify(`${manifestRef}#verify`)},
  intentLog: { schemaRef: ${JSON.stringify(`${schemaRef}#Intent`)} },
};
`);
  await write(owner, schemaPath, 'export const schemaVersion = 1;\n');
  await write(owner, `${home}/catalog-entry.json`, { cartridgeManifest: `${manifestRef}#manifest`, status: 'playable' });
  await git(owner, 'init', '-q');
  await git(owner, 'add', '--all');
  await git(owner, '-c', 'user.name=Catalog native fixture', '-c', 'user.email=catalog-fixture@example.invalid', 'commit', '-qm', 'synthetic native catalog source');
  const { discoverCatalog } = await import(pathToFileURL(path.join(consumer, 'src/discover-catalog.mjs')).href);
  return () => discoverCatalog({ sources: [{ repositoryRoot: owner, catalogRoots: ['.'], gameSiteRoots: [] }] });
}

test('native cartridge, replay and schema self references resolve from their source owner', async (t) => {
  const discover = await fixture(t);
  const { catalog } = await discover();
  assert.equal(catalog.games.length, 1);
  assert.equal(catalog.games[0].id, 'native-owner');
  assert.equal(catalog.games[0].cartridgeWrapped, true);
});

test('nested game records inherit their real owning package exports', async (t) => {
  const discover = await fixture(t, { nested: true });
  const { catalog } = await discover();
  assert.equal(catalog.games[0].repoPath, 'src/games/pig');
  assert.equal(catalog.games[0].id, 'native-owner');
});

test('unexported cartridge files fail instead of bypassing native export encapsulation', async (t) => {
  const discover = await fixture(t, { hiddenManifest: true });
  await assert.rejects(discover(), /cartridgeManifest failed to load.*not defined by "exports"/);
});

test('unexported schemas fail even when their source files exist', async (t) => {
  const discover = await fixture(t, { hiddenSchema: true });
  await assert.rejects(discover(), /intentLog\.schemaRef file does not exist.*not defined by "exports"/);
});

test('existing source-relative cartridge, replay and schema references still load', async (t) => {
  const discover = await fixture(t, { relative: true });
  const { catalog } = await discover();
  assert.equal(catalog.games[0].id, 'native-owner');
});
