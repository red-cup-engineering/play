import test from 'node:test';
import assert from 'node:assert/strict';
import { descriptionParts, catalogCardBodyHtml } from '../js/catalog.mjs';
import { indexHtml, todayHtml } from '../src/shells.mjs';

test('long descriptions disclose the complete authored wording without interpreted summaries', () => {
  const description = 'Choose a path. ' + 'Every choice leaves evidence. '.repeat(16);
  const { lead, rest } = descriptionParts(description);
  assert.equal(`${lead} ${rest}`, description.trim());
  assert.equal(lead, 'Choose a path.');
  const unbroken = 'x'.repeat(450);
  const parts = descriptionParts(unbroken);
  assert.equal(parts.lead + parts.rest, unbroken);
  const html = catalogCardBodyHtml({ id: 'new-game', displayName: '<Game>',
    description, shelf: 'Unknown', status: 'in-development', entryPoints: {} });
  assert.match(html, /<details class="game-description">/);
  assert.match(html, /More about &lt;Game&gt;/);
  assert.doesNotMatch(html, /<Game>/);
  assert.match(html, /No browser entry/);
});

test('both entry pages offer the existing voluntary support terms in ordinary HTML', () => {
  for (const html of [indexHtml('', []), todayHtml('', '2026-10-25')]) {
    assert.equal((html.match(/id="support-games"/g) || []).length, 1);
    assert.match(html, /USD \$10 per month, renewing until canceled/);
    assert.match(html, /Optional; no extra access or influence/);
    assert.match(html, /href="https:\/\/buy\.stripe\.com\/28E28s1b4gJcb2Y3Io5EY02"/);
    assert.match(html, /Terms and help/);
    assert.ok(html.indexOf('id="support-games"') > html.indexOf('</main>'));
  }
});

test('card presentation preserves authored entries, dates and unknown availability', () => {
  const entry = { id:'durante', displayName:'Durante', description:'Walk a maze.',
    status:'playable', hostname:'durante.561.group', shelf:'Deep',
    entryPoints:{browser:'/web/index.html?seed=0x42'}, keywords:['maze'] };
  const html = catalogCardBodyHtml(entry);
  assert.match(html, /href="https:\/\/durante\.561\.group\/web\/index.html\?seed=0x42"/);
  assert.match(html, /Page not checked/);
  assert.match(html, /Reported playable/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /screenshot|gameplay verified|Daily seed/);
});
