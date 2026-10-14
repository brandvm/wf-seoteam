// Loads dist/fs-bundle.js next to index.js (same base and query, so a
// release loads its own copy) when the page has Finsweet markup. Keep NAMES
// in step with src/modules/finsweet-registry.ts (a test checks it).
export const NAMES = ['list'];

// document.currentScript is only set while index.js evaluates, so read it here.
const self = typeof document !== 'undefined' ? (document.currentScript as HTMLScriptElement | null)?.src : undefined;

export function bundleUrl(indexSrc: string): string {
  const url = new URL(indexSrc);
  url.pathname = url.pathname.replace(/index\.js$/, 'fs-bundle.js');
  return url.href;
}

export function initFinsweetLoader() {
  if (!NAMES.some((name) => document.querySelector(`[fs-${name}-element]`))) return;
  // A Finsweet CDN tag still on the page would start the same elements twice.
  if (document.querySelector('script[src*="@finsweet/attributes"]')) return;
  if (!self || document.querySelector('script[data-fs-bundle]')) return;
  const script = document.createElement('script');
  script.src = bundleUrl(self);
  script.defer = true;
  script.dataset.fsBundle = '';
  document.head.appendChild(script);
}
