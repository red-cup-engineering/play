// Retained player observations are a separate publication input. They never
// rewrite the game's authored status or the HTTP observer's evidence.
import retained from '../docs/player-observations-2026-10-26.json' with { type: 'json' };
import { playUrl } from '../js/catalog.mjs';

const STATES = new Set(['blocked', 'limited', 'environment-limited', 'action-observed', 'entry-observed']);
function dateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00.000Z');
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}
function publicUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash;
  } catch { return false; }
}
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const strings = value => Array.isArray(value) && value.every(nonempty);
const route = value => {
  const url = new URL(value);
  return url.origin + (url.pathname.replace(/\/$/, '') || '/');
};

export function validatePlayerObservations(document) {
  if (document?.format !== '561-player-observations-v1' || !dateOnly(document.recordedOn)
    || !nonempty(document.scope) || !nonempty(document.environment) || !Array.isArray(document.games)) {
    throw new TypeError('invalid player-observation document');
  }
  const seen = new Set();
  for (const observation of document.games) {
    if (!nonempty(observation.id) || seen.has(observation.id) || !STATES.has(observation.state)
      || !publicUrl(observation.entryUrl) || !publicUrl(observation.observedUrl)
      || new URL(observation.entryUrl).origin !== new URL(observation.observedUrl).origin
      || !publicUrl(observation.sourceRecord) || !nonempty(observation.summary)
      || !strings(observation.details) || !strings(observation.actions)
      || observation.completion !== 'not-verified'
      || (observation.observedTitle !== undefined && !nonempty(observation.observedTitle))) {
      throw new TypeError('invalid or duplicate player observation: ' + observation.id);
    }
    seen.add(observation.id);
  }
  return document;
}

validatePlayerObservations(retained);

export function attachPlayerObservations(entries, {
  document = retained, asOf = new Date().toISOString().slice(0, 10),
} = {}) {
  validatePlayerObservations(document);
  if (!dateOnly(asOf)) throw new TypeError('player-observation cutoff must be a UTC date');
  if (document.recordedOn > asOf) return entries;
  const observations = new Map(document.games.map(observation => [observation.id, observation]));
  return entries.map(entry => {
    if (!entry.entryPoints?.browser) return entry;
    const observation = observations.get(entry.id);
    if (!observation) return entry;
    // A renamed host or replacement entrance requires a fresh observation.
    // Only the recorded launch address or its inspected destination can match.
    const current = route(playUrl(entry));
    if (![observation.entryUrl, observation.observedUrl].some(url => route(url) === current)) return entry;
    return { ...entry, playerObservation: {
      ...observation, recordedOn: document.recordedOn, environment: document.environment,
    } };
  });
}
