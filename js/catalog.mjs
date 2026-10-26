// Authored game record -> card and TUFTE tile. Cowrie Games and its world
// directory share the same entry links and dated observation wording.
import { GLYPHS, FALLBACK_GLYPH, EXTERNAL_LINK_ICON, TERMINAL_ICON } from './glyphs.mjs';

export { GLYPHS, FALLBACK_GLYPH, EXTERNAL_LINK_ICON, TERMINAL_ICON };

export function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function statusLabel(status) {
  return status === 'playable' ? 'Reported playable' : 'In development';
}

export function hostname(entry) {
  return entry.hostname || `${entry.subdomain}.561.group`;
}

export function playUrl(entry) {
  return `https://${hostname(entry)}${(entry.entryPoints && entry.entryPoints.browser) || '/'}`;
}

export function hasHeadless(entry) {
  return Boolean(entry.entryPoints && entry.entryPoints.headless);
}

export function hasBrowser(entry) {
  return Boolean(entry.entryPoints && entry.entryPoints.browser);
}

export function browserAvailable(entry) {
  return entry.status === 'playable' && hasBrowser(entry)
    && entry.availability?.state === 'reachable';
}

export function observedEntryBlocked(entry) {
  return entry.playerObservation?.state === 'blocked';
}

export function playerObservationHtml(entry) {
  const observation = entry.playerObservation;
  if (!observation || !hasBrowser(entry)) return '';
  const labels = {
    blocked: 'Entry blocked at check',
    limited: 'Play issue observed',
    'environment-limited': 'Browser limitation observed',
    'action-observed': 'Action observed',
    'entry-observed': 'Entry inspected',
  };
  const label = labels[observation.state];
  if (!label) return '';
  return `<aside class="play-observation" data-state="${esc(observation.state)}" aria-label="Recorded player observation">
    <strong>${label}</strong><p>${esc(observation.summary)}</p>
    <details><summary>What this check covered</summary>
      <ul>${(observation.details || []).map(detail => `<li>${esc(detail)}</li>`).join('')}</ul>
      <p>${esc(observation.environment)} A full game completion was not verified.</p>
      <a href="${esc(observation.observedUrl)}">Inspected entry address</a>
    </details>
    <p class="observation-date">Recorded <time datetime="${esc(observation.recordedOn)}">${esc(observation.recordedOn)}</time>.</p>
  </aside>`;
}

export function publicationPageStatus(entry) {
  if (entry.availability?.state === 'reachable') return 'Entry page reached at publication.';
  if (entry.availability?.state === 'unavailable') return 'Entry page unavailable at publication; you can still try its address.';
  return 'Entry page not checked at publication; you can still try its address.';
}

// Keep the author's complete description, with a short opening on the shelf.
// This changes disclosure, not the game's claims or catalog record.
export function descriptionParts(description = '') {
  const text = String(description).trim();
  if (text.length <= 220) return { lead: text, rest: '' };
  const sentence = text.slice(0, 221).match(/^.*?[.!?](?=\s)/u);
  const boundary = sentence ? sentence[0].length : text.lastIndexOf(' ', 220);
  const cut = boundary > 0 ? boundary : 220;
  return { lead: text.slice(0, cut), rest: text.slice(cut).trimStart() };
}

export function catalogCardBodyHtml(entry) {
  const glyph = GLYPHS[entry.id] || FALLBACK_GLYPH;
  const playable = entry.status === 'playable';
  const keywords = (entry.keywords || []).slice(0, 6)
    .map((keyword) => `<li class="keyword">${esc(keyword)}</li>`).join('');
  const headlessBadge = hasHeadless(entry)
    ? `<span class="badge headless" title="${esc(entry.entryPoints.headless)}">${TERMINAL_ICON} API / terminal play</span>`
    : '';
  const actionLink = hasBrowser(entry)
    ? `<a class="play-link" data-tufte-control href="${esc(playUrl(entry))}">${EXTERNAL_LINK_ICON} ${observedEntryBlocked(entry) ? 'Recheck' : browserAvailable(entry) ? 'Open' : 'Visit'} ${esc(entry.displayName)}</a>`
    : '<span class="play-link">No browser entry</span>';
  const pageState = hasBrowser(entry) ? entry.availability?.state : null;
  const pageStatus = pageState === 'reachable' ? 'Page reached' : pageState === 'unavailable' ? 'Page unavailable' : 'Page not checked';
  const description = descriptionParts(entry.description);

  return `
    <div class="card-art" data-shelf="${esc(entry.shelf || '')}" aria-hidden="true"><span class="card-glyph">${glyph}</span><span class="card-art-line"></span></div>
    <div class="card-actions">${actionLink}</div>
    ${playerObservationHtml(entry)}
    <p class="desc">${esc(description.lead)}</p>
    ${description.rest ? `<details class="game-description"><summary>More about ${esc(entry.displayName)}</summary><p>${esc(description.rest)}</p></details>` : ''}
    <div class="badges">
      <span class="badge ${playable ? 'playable' : 'in-development'}">${statusLabel(entry.status)}</span>
      ${hasBrowser(entry) ? `<span class="badge availability-${pageState === 'reachable' ? 'reachable' : pageState === 'unavailable' ? 'unavailable' : 'unchecked'}">${pageStatus}</span>` : ''}
      ${entry.seedPolicy?.kind === 'daily-utc' ? '<span class="badge daily">Daily seed</span>' : ''}
      ${headlessBadge}
    </div>
    ${hasHeadless(entry) ? `<details class="headless-interface"><summary>Read the API or terminal interface</summary><code>${esc(entry.entryPoints.headless)}</code></details>` : ''}
    ${entry.statusNote ? `<p class="status-note">${esc(entry.statusNote)}</p>` : ''}
    <ul class="keywords">${keywords}</ul>
    <span class="subdomain-hint">${esc(hostname(entry))}</span>
    ${entry.availability?.checkedAt ? `<p class="availability-note">${pageStatus} at ${esc(entry.availability.checkedAt.slice(0, 16).replace('T', ' '))} UTC.</p>` : ''}
  `;
}

export function catalogEntryToTile(entry) {
  return {
    id: entry.id,
    title: entry.displayName,
    eyebrow: entry.shelf,
    lifecycle: entry.status === 'in-development' ? 'imminent' : 'present',
    confidence: browserAvailable(entry) && !observedEntryBlocked(entry) ? 'high' : 'low',
    html: catalogCardBodyHtml(entry),
  };
}

export function catalogModel(entries) {
  return { tiles: entries.map(catalogEntryToTile) };
}

export const STATUS_FILTERS = new Set(['all', 'playable', 'in-development']);

export function shelfValues(entries) {
  return [...new Set(entries.map((entry) => entry.shelf).filter(Boolean))];
}

export function matchesSearch(entry, term) {
  if (!term) return true;
  return [entry.displayName, entry.description, entry.id, ...(entry.keywords || [])]
    .join(' ').toLowerCase().includes(term.toLowerCase());
}

export function filterEntries(entries, { term = '', status = 'all', shelf = 'all' } = {}) {
  return entries.filter((entry) => (status === 'all' || entry.status === status)
    && (shelf === 'all' || entry.shelf === shelf) && matchesSearch(entry, term));
}

export function normalizeFilters({ term = '', status = 'all', shelf = 'all' } = {}, entries = []) {
  return {
    term: String(term).trim(),
    status: STATUS_FILTERS.has(status) ? status : 'all',
    shelf: shelf === 'all' || shelfValues(entries).includes(shelf) ? shelf : 'all',
  };
}

export function filtersFromSearchParams(params, entries) {
  return normalizeFilters({ term: params.get('q') || '', status: params.get('status') || 'all', shelf: params.get('shelf') || 'all' }, entries);
}

export function filtersToSearchParams(filters) {
  const params = new URLSearchParams();
  if (filters.term) params.set('q', filters.term);
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.shelf && filters.shelf !== 'all') params.set('shelf', filters.shelf);
  return params;
}

// ---------------------------------------------------------------------------------------
// Browser-only bootstrap below this line. Nothing above here touches `document`.
// ---------------------------------------------------------------------------------------

/** Wires up index.html's progressively enhanced search/status/shelf controls. The static
 *  SSR grid remains readable without JavaScript; with JavaScript, the current filter is
 *  represented in the URL so it can be shared and restored by browser history. */
export async function initCatalogPage() {
  const gridWrapper = document.getElementById('catalog-grid');
  if (!gridWrapper) return; // not on index.html -- safe no-op import elsewhere


  const COUNT = document.getElementById('result-count');
  const SEARCH = document.getElementById('search');
  const SHELF = document.getElementById('shelf-filter');
  const STATUS_BUTTONS = Array.from(document.querySelectorAll('.status-filter button'));

  if (!COUNT || !SEARCH || !SHELF || !STATUS_BUTTONS.length) return;

  function render(entries) {
    const visible = new Set(entries.map((entry) => entry.id));
    for (const tile of gridWrapper.querySelectorAll('.tufte-tile')) tile.hidden = !visible.has(tile.id);
    COUNT.textContent = entries.length ? `${entries.length} game${entries.length === 1 ? '' : 's'}` : 'No games match your filters.';
  }

  let allEntries = [];
  let hydrated = false;

  function selectedFilters() {
    const activeStatus = STATUS_BUTTONS.find((b) => b.getAttribute('aria-pressed') === 'true');
    return normalizeFilters({
      term: SEARCH.value,
      status: activeStatus?.dataset.status || 'all',
      shelf: SHELF.value,
    }, allEntries);
  }

  function applyFilters() {
    render(filterEntries(allEntries, selectedFilters()));
  }

  function restoreControlsFromUrl() {
    const filters = filtersFromSearchParams(new URLSearchParams(window.location.search), allEntries);
    SEARCH.value = filters.term;
    SHELF.value = filters.shelf;
    STATUS_BUTTONS.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.status === filters.status));
    });
  }

  function updateUrl(mode) {
    const query = filtersToSearchParams(selectedFilters()).toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history[mode](null, '', nextUrl);
  }

  try {
    const res = await fetch('catalog.json', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`catalog.json responded ${res.status}`);
    const catalog = await res.json();
    allEntries = Array.isArray(catalog.games) ? catalog.games : [];
    hydrated = true;
  } catch (err) {
    // The published grid stays visible and fully readable --
    // losing live search/filter on a fetch failure is a real degradation, but it is
    // never a blank page the way a full client-only render used to be.
    if (SEARCH) {
      SEARCH.disabled = true;
      SEARCH.placeholder = `Search unavailable (${err.message})`;
    }
    STATUS_BUTTONS.forEach((btn) => { btn.disabled = true; });
    SHELF.disabled = true;
    return;
  }

  if (!hydrated) return;

  restoreControlsFromUrl();
  applyFilters();

  SEARCH.addEventListener('input', () => {
    applyFilters();
    updateUrl('replaceState');
  });
  STATUS_BUTTONS.forEach((btn) => {
    btn.addEventListener('click', () => {
      STATUS_BUTTONS.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      applyFilters();
      updateUrl('pushState');
    });
  });
  SHELF.addEventListener('change', () => {
    applyFilters();
    updateUrl('pushState');
  });
  window.addEventListener('popstate', () => {
    restoreControlsFromUrl();
    applyFilters();
  });
  SEARCH.disabled = false;
  SHELF.disabled = false;
  STATUS_BUTTONS.forEach((button) => { button.disabled = false; });
}

if (typeof document !== 'undefined' && document.getElementById('catalog-grid')) {
  initCatalogPage();
}
