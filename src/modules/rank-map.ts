// Rank map: the Google Maps scan on a case study, as a live map (MapLibre GL,
// OpenFreeMap "positron" tiles: free, no key, OpenStreetMap data).
// Markup (CMS fields: Map Centre Lat, Map Centre Lng, Map Spacing, Ranks
// Before, Ranks After):
//   [data-rank-map][data-lat][data-lng][data-spacing="600"]
//     [data-ranks-before="17,14,…"][data-ranks-after="7,5,…"]
//     [data-rank-canvas]                         the map is drawn here
//     [data-rank-show="before"|"after"] buttons  the Before / After switch
//   [data-rank-count="before"|"after"]           optional, in the section:
//                                                highlighted for the state
// The 25 ranks run row by row over a 5 × 5 grid centred on the scan centre,
// north row first, `spacing` metres apart. Each pin is a button with its
// before → after change in its name and a tooltip on hover / focus. The
// switch changes every pin, rippling out from the centre; the map switches
// to After once the first time it scrolls into view (not with reduced
// motion). Zoom: the buttons, pinch, or Ctrl / ⌘ + scroll (a plain scroll
// keeps scrolling the page; MapLibre's cooperative gestures say so).
// The scan centre has its own map pin, and a recentre button (like a maps
// app's location button) flies back to it and the whole grid.
//
// Loading: MapLibre is not in index.js. When a map nears the viewport this
// module adds dist/maplibre.css and dist/maplibre.js (src/maplibre.ts) from
// the same base and query as index.js (a release loads its own copy, as
// fs-bundle.js does), and points MapLibre at dist/maplibre-worker.js. The
// worker is on another origin than the page (GitHub Pages / jsDelivr);
// MapLibre then starts it through a blob that imports the URL, which both
// hosts allow (CORS *).
import type * as MapLibre from 'maplibre-gl';

// document.currentScript is only set while index.js evaluates, so read it here.
const self = typeof document !== 'undefined' ? (document.currentScript as HTMLScriptElement | null)?.src : undefined;

export function siblingUrl(indexSrc: string, file: string): string {
  const url = new URL(indexSrc);
  url.pathname = url.pathname.replace(/index\.js$/, file);
  return url.href;
}

let library: Promise<typeof MapLibre> | undefined;
function loadMapLibre(): Promise<typeof MapLibre> {
  if (library) return library;
  library = new Promise<typeof MapLibre>((resolve, reject) => {
    if (window.wfcMapLibre) { resolve(window.wfcMapLibre); return; }
    if (!self || !/index\.js(\?|$)/.test(self)) { reject(new Error('rank-map: index.js URL unknown, MapLibre not loaded')); return; }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = siblingUrl(self, 'maplibre.css');
    const cssReady = new Promise<void>((done) => { css.onload = css.onerror = () => done(); });
    document.head.appendChild(css);
    const script = document.createElement('script');
    script.src = siblingUrl(self, 'maplibre.js');
    script.dataset.wfcMaplibre = '';
    script.onload = () => {
      const lib = window.wfcMapLibre;
      if (!lib) { reject(new Error('rank-map: maplibre.js loaded without MapLibre')); return; }
      lib.setWorkerUrl(siblingUrl(self, 'maplibre-worker.js'));
      cssReady.then(() => resolve(lib));
    };
    script.onerror = () => reject(new Error(`rank-map: could not load ${script.src}`));
    document.head.appendChild(script);
  });
  return library;
}

const COLS = 5;
const RIPPLE_MS = 90;
const STYLE = 'https://tiles.openfreemap.org/styles/positron';

type State = 'before' | 'after';
const band = (rank: number) => (rank <= 3 ? 'is-top' : rank <= 10 ? 'is-mid' : 'is-low');

function start(map: HTMLElement) {
  build(map).catch((error) => console.error('[wfc] rank-map failed', error));
}

export function initRankMap() {
  const maps = document.querySelectorAll<HTMLElement>('[data-rank-map]');
  if (!maps.length) return;
  if (!('IntersectionObserver' in window)) { maps.forEach(start); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      start(entry.target as HTMLElement);
    });
  }, { rootMargin: '600px 0px' });
  maps.forEach((m) => observer.observe(m));
}

async function build(map: HTMLElement) {
  const parse = (raw?: string) => (raw ?? '').split(',').map((v) => Number(v.trim())).filter((v) => v > 0);
  const ranks = { before: parse(map.dataset.ranksBefore), after: parse(map.dataset.ranksAfter) };
  const lat = Number(map.dataset.lat), lng = Number(map.dataset.lng), spacing = Number(map.dataset.spacing) || 600;
  const canvas = map.querySelector<HTMLElement>('[data-rank-canvas]');
  if (!canvas || !lat || !lng || ranks.before.length !== 25 || ranks.after.length !== 25) return;

  const maplibregl = await loadMapLibre();
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dLat = spacing / 111320, dLng = spacing / (111320 * Math.cos((lat * Math.PI) / 180));
  const half = 2.6; // grid half-size in steps, with a margin

  const home: [[number, number], [number, number]] = [[lng - half * dLng, lat - half * dLat], [lng + half * dLng, lat + half * dLat]];
  const gl = new maplibregl.Map({
    container: canvas,
    style: STYLE,
    bounds: home,
    fitBoundsOptions: { padding: 24 },
    cooperativeGestures: true,
    attributionControl: { compact: true },
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
  });
  gl.touchZoomRotate.disableRotation();
  gl.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  // Recentre, like a maps app's location button: back to the scan centre and
  // the whole grid.
  const recentre = document.createElement('div');
  recentre.className = 'maplibregl-ctrl maplibregl-ctrl-group';
  recentre.innerHTML = '<button class="cs-map-recentre" type="button" aria-label="Back to the scan centre" title="Back to the scan centre">'
    + '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">'
    + '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></svg></button>';
  recentre.firstElementChild!.addEventListener('click', () => gl.fitBounds(home, { padding: 24, duration: still ? 0 : 900 }));
  gl.addControl({ onAdd: () => recentre, onRemove: () => recentre.remove() }, 'top-right');
  // The button reads as active while the map is moved away from the grid.
  const away = () => {
    const c = gl.getCenter();
    const off = Math.abs(c.lat - lat) > dLat * 0.5 || Math.abs(c.lng - lng) > dLng * 0.5 || gl.getZoom() > zoomHome + 0.3;
    recentre.classList.toggle('is-away', off);
  };
  let zoomHome = 0;
  gl.once('load', () => { zoomHome = gl.getZoom(); });
  gl.on('moveend', away);

  // Scan centre: a map pin whose tip sits just above the centre location's
  // rank pin (the middle of the grid), so both stay visible.
  const centre = document.createElement('div');
  centre.className = 'cs-rank-centre';
  centre.setAttribute('aria-hidden', 'true');
  centre.innerHTML = '<svg viewBox="0 0 24 32" width="24" height="32"><path d="M12 31C12 31 2 19.5 2 12a10 10 0 0 1 20 0c0 7.5-10 19-10 19Z" fill="#200f09" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#f84c1c"/></svg>'
    + '<span class="cs-rank-centre-label">Scan centre</span>';
  new maplibregl.Marker({ element: centre, anchor: 'bottom', offset: [0, -18] }).setLngLat([lng, lat]).addTo(gl);

  const pins = ranks.before.map((b, i) => {
    const row = Math.floor(i / COLS), col = i % COLS;
    const a = ranks.after[i];
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'cs-rank-pin';
    const change = b === a ? 'no change' : b > a ? `up ${b - a}` : `down ${a - b}`;
    el.setAttribute('aria-label', `Location ${'ABCDE'[row]}${col + 1}: position ${b} before, ${a} after (${change})`);
    el.innerHTML = `<span class="cs-rank-num" aria-hidden="true"></span>`
      + `<span class="cs-rank-tip" aria-hidden="true">#${b} → #${a}<small>${b > a ? `▲ ${b - a} places` : b === a ? 'No change' : `▼ ${a - b} places`}</small></span>`;
    new maplibregl.Marker({ element: el })
      .setLngLat([lng + (col - 2) * dLng, lat - (row - 2) * dLat])
      .addTo(gl);
    return { el, num: el.firstElementChild as HTMLElement, delay: Math.hypot(row - 2, col - 2) * RIPPLE_MS };
  });

  const section = map.closest('section') ?? document;
  const switches = [...map.querySelectorAll<HTMLButtonElement>('[data-rank-show]')];
  const counts = [...section.querySelectorAll<HTMLElement>('[data-rank-count]')];
  let state: State = 'before';
  const show = (next: State, animate: boolean) => {
    state = next;
    switches.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.rankShow === next)));
    counts.forEach((c) => c.classList.toggle('is-active', c.dataset.rankCount === next));
    pins.forEach(({ el, num, delay }, i) => {
      const apply = () => {
        const rank = ranks[next][i];
        num.textContent = String(rank);
        el.classList.remove('is-top', 'is-mid', 'is-low');
        el.classList.add(band(rank));
        if (animate) { el.classList.remove('is-flip'); void el.offsetWidth; el.classList.add('is-flip'); }
      };
      if (animate && !still) setTimeout(apply, delay); else apply();
    });
  };
  show('before', false);
  switches.forEach((s) => s.addEventListener('click', () => {
    const next = s.dataset.rankShow as State;
    if (next !== state) show(next, true);
  }));
  map.classList.add('is-ready');

  if (still) return;
  const auto = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    auto.disconnect();
    setTimeout(() => { if (state === 'before') show('after', true); }, 700);
  }, { threshold: 0.55 });
  auto.observe(map);
}
