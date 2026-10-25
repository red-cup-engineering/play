import { publishShelf } from '../src/publication.mjs';
let publication;
export async function readPublication(path) {
  // Match the actual publisher's explicit-source invocation outside the old
  // integrated checkout. Defer construction until a receiving case requests it.
  publication ??= publishShelf({ observePages: false,
    ...(process.env.PLAY_CATALOG_SOURCES ? { sources: JSON.parse(process.env.PLAY_CATALOG_SOURCES) } : {}),
  });
  const artifact = (await publication).artifacts.find((asset) => asset.path === path);
  if (!artifact) throw new Error(`No publication artifact: ${path}`);
  return artifact.body;
}
