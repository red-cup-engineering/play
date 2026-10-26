import { publishShelf } from '../src/publication.mjs';
import { catalogSourcesFromEnvironment } from '../src/composition.mjs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
export const catalogSources = catalogSourcesFromEnvironment();

export async function sourceExport(repository, specifier) {
  const source = catalogSources?.find(source => source.repository === repository);
  if (!source) throw new Error(`The authored source binding is required: ${repository}`);
  const owner = createRequire(join(source.repositoryRoot, 'package.json'));
  return import(pathToFileURL(owner.resolve(specifier)).href);
}
let publication;
export async function readPublication(path) {
  // Match the actual publisher's explicit-source invocation outside the old
  // integrated checkout. Defer construction until a receiving case requests it.
  publication ??= publishShelf({ observePages: false, sources: catalogSources });
  const artifact = (await publication).artifacts.find((asset) => asset.path === path);
  if (!artifact) throw new Error(`No publication artifact: ${path}`);
  return artifact.body;
}
