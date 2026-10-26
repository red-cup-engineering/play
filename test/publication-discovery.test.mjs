import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from '@red-cup-engineering/static-site-publisher/build';
import project from '../victor.config.mjs';

test('the original Play publisher exposes the real shelf and daily page to text discovery', async () => {
  const result = await build({ ...project, contentDir: fileURLToPath(new URL('../content/', import.meta.url)) });
  assert.equal(result.report.releasable, true, JSON.stringify(result.report.refusals));
  assert.ok(JSON.parse(result.artifacts.get('catalog.json')).games.length > 0, 'the native game source bindings supply the shelf');
  const index = result.artifacts.get('llms.txt');
  const full = result.artifacts.get('llms-full.txt');
  assert.match(index, /## Pages[\s\S]*Cowrie Games — the 561 Group game shelf[\s\S]*Today — Cowrie Games/u);
  assert.match(full, /# Cowrie Games — the 561 Group game shelf\nURL: https:\/\/play\.561\.group\/\nContent: Published page metadata\nSource: game-shelf\nDescription: Find your next game:/u);
  assert.match(full, /# Today — Cowrie Games\nURL: https:\/\/play\.561\.group\/today\/\nContent: Published page metadata\nSource: daily-seeds\nDescription: Shared UTC daily seeds and game entry links\./u);
  for (const body of [index, full]) {
    assert.doesNotMatch(body, /feed\.(?:rss\.xml|atom\.xml|json)|\/search\/|today\.html|Published:/u);
  }
  assert.ok(index.includes('https://play.561.group/sitemap.xml'));
  assert.ok(index.includes('https://play.561.group/llms-full.txt'));
  for (const path of ['sitemap.xml', 'llms.txt', 'llms-full.txt']) {
    assert.equal(result.artifactRecords.get(path).provenance.projector, 'victor-discovery');
    assert.ok(JSON.parse(result.artifacts.get('release-manifest.json')).artifacts.some(artifact => artifact.path === path));
  }
});
