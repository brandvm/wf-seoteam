import * as esbuild from 'esbuild';
import { rm } from 'node:fs/promises';

const dev = process.argv.includes('--dev');

const config = {
  // maplibre.js (+ maplibre.css) and maplibre-worker.js are loaded only on
  // pages with a rank map (src/modules/rank-map.ts). esbuild can't split an
  // IIFE bundle, so MapLibre is its own entry instead of a dynamic import.
  entryPoints: [
    { in: 'src/index.ts', out: 'index' },
    { in: 'src/fs-bundle.ts', out: 'fs-bundle' },
    { in: 'src/styles.css', out: 'styles' },
    { in: 'src/maplibre.ts', out: 'maplibre' },
    { in: 'src/maplibre.css', out: 'maplibre' },
    // MapLibre's tile worker: a self-contained script (no imports or
    // exports), so the IIFE wrapper doesn't change it.
    { in: 'node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs', out: 'maplibre-worker' },
  ],
  bundle: true,
  outdir: 'dist',
  minify: !dev,
  sourcemap: dev,
  // dist/ is committed and CI fails if it drifts from src/. Dev builds stay
  // in memory (esbuild serves them from there) so `pnpm dev` never leaves
  // unminified files or sourcemaps in dist/ to be committed by accident.
  write: !dev,
  target: 'es2019',
  logLevel: 'info',
  banner: dev
    ? { js: "(() => { try { var u = document.currentScript && document.currentScript.src ? new URL('/esbuild', document.currentScript.src).href : 'http://localhost:3000/esbuild'; new EventSource(u).addEventListener('change', () => location.reload()); } catch (e) {} })();" }
    : {},
};

if (dev) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  // 127.0.0.1 only: the Webflow pages load http://localhost, and nothing on
  // the LAN should reach the dev server.
  await ctx.serve({ servedir: 'dist', host: '127.0.0.1', port: 3000, cors: { origin: '*' } });
  for (const e of config.entryPoints) {
    console.log('dev → http://localhost:3000/' + e.out + (e.in.endsWith('.css') ? '.css' : '.js'));
  }
} else {
  // Start clean so a renamed or removed entry never leaves a stale file in
  // the committed dist/.
  await rm('dist', { recursive: true, force: true });
  await esbuild.build(config);
}