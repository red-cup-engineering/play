// games-catalog-storefront -- shared glyph set. Zero dependencies.
// One small hand-drawn line icon per game id, plus the storefront's own chrome icons
// (external-link, terminal). Moved from play.561.group/js/glyphs.mjs (its origin site) so a
// catalog storefront draws the same icon for the same game id instead of carrying its own
// copy -- one house, one hand, per
// the-suite-and-the-studio.md §1.3.

/** One glyph per game id. A game id with no glyph yet falls back to FALLBACK_GLYPH (see
 *  catalog.mjs), never broken markup. */
export const GLYPHS = {
  durante: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 21V9l8-6 8 6v12M8 21V11h8v10M4 9h16"/><circle cx="12" cy="15" r="2"/><path d="M12 11v2M12 17v2M8 15h2M14 15h2"/></svg>`,
  farstone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-35 12 12)"/><path d="M18 2v4M16 4h4M4 18v4M2 20h4"/></svg>`,
  aletheon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m12 2 10 19H2ZM12 2v19M7 12h10M4 17h16"/><circle cx="12" cy="12" r="3"/></svg>`,
  'be-not-so-fearful': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 18c4-8 8-12 18-12-1 10-5 14-12 13M6 21 17 10M11 16v-5M11 16h5"/><path d="M3 4h4M5 2v4"/></svg>`,
  'you-are-conscious': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M3 3l2 2M19 19l2 2M21 3l-2 2M5 19l-2 2"/></svg>`,
  blackjack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="4" y="3" width="16" height="19" rx="2"/><path d="M12 6c-2 3-5 4-4 7 1 2 3 1 4 0 1 1 3 2 4 0 1-3-2-4-4-7ZM12 12v6M9 18h6"/></svg>`,
  pig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
  farkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 7v1M8 12v1M8 17v1M16 7v1M16 12v1M16 17v1" stroke-width="3" stroke-linecap="round"/></svg>`,
  yacht: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2v15H3l4 5h11l3-5h-9M10 4 3 14h7ZM14 6l6 8h-6Z"/></svg>`,
  chutes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 22 10 2M8 22 14 2M5 17h5M6 12h6M8 7h5M17 3c9 6-8 8 0 13l4 3"/></svg>`,
  reels: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M8 5v14M16 5v14M4 10h2l-2 5M10 10h4l-3 5M18 10h2l-2 5"/></svg>`,
  slots: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 17c4-13 14-13 18 0l-9 5ZM12 7v15M7 9l5 13M17 9l-5 13M2 3c3 3 5-3 8 0s5-3 8 0 3 0 4-1"/></svg>`,
  equivo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2v19M4 5h16M2 15l4-9 4 9M14 15l4-9 4 9M2 15h8M14 15h8M7 22h10"/></svg>`,
  'flickering-delve': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <path d="M12 3c-1 2.2-3.4 3.6-3.4 6.6a3.4 3.4 0 0 0 6.8 0C15.4 6.6 13 5.2 12 3Z"/>
    <path d="M12 12.4c-.6 1.3-2 2.1-2 3.9a2 2 0 0 0 4 0c0-1.8-1.4-2.6-2-3.9Z"/>
    <path d="M6.5 21h11"/>
  </svg>`,
  onestone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <path d="M12 2.5 21 8v8l-9 5.5L3 16V8Z"/>
    <path d="M3 8l9 5.5L21 8"/>
    <path d="M12 13.5V21"/>
  </svg>`,
  solitaire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <rect x="4" y="7" width="9" height="13" rx="1.3" transform="rotate(-8 8.5 13.5)"/>
    <rect x="10.5" y="5" width="9" height="13" rx="1.3"/>
    <circle cx="15" cy="11.5" r="1.4"/>
  </svg>`,
  lantern: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <path d="M9 3h6"/>
    <path d="M12 3v3"/>
    <path d="M7.5 8h9l-1.2 10.5a2 2 0 0 1-2 1.8h-2.6a2 2 0 0 1-2-1.8Z"/>
    <path d="M9 12h6"/>
    <path d="M10.4 21h3.2"/>
  </svg>`,
  weiqi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17"/>
    <path d="M3.5 9h17M3.5 15h17M9 3.5v17M15 3.5v17"/>
    <circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="15" r="1.3" fill="none"/>
  </svg>`,
  ruinfold: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <path d="M5 21V9l3-4h8l3 4v12"/>
    <path d="M5 9h14"/>
    <path d="M9 21v-6h6v6"/>
    <path d="M9 5v4M15 5v4"/>
  </svg>`,
  crucible: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <circle cx="6" cy="7" r="2"/>
    <circle cx="18" cy="7" r="2"/>
    <circle cx="12" cy="17" r="2"/>
    <path d="M8 7h8M7.3 8.7 10.7 15.3M16.7 8.7 13.3 15.3"/>
  </svg>`,
  'gambling-trainer': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M6.5 17.5l2-2"/>
  </svg>`,
  stoke: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
    <circle cx="12" cy="6" r="2"/>
    <path d="M7.6 16.8 10.8 7.6M16.4 16.8 13.2 7.6M8 18h8"/>
  </svg>`,
};

export const FALLBACK_GLYPH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <rect x="4" y="4" width="16" height="16" rx="3"/>
  <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/>
  <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none"/>
</svg>`;

export const EXTERNAL_LINK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>
</svg>`;

export const TERMINAL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/>
</svg>`;
