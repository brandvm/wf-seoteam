// Third entry, dist/maplibre.js: MapLibre GL, loaded only by
// src/modules/rank-map.ts on a page with a rank map (from the same base and
// query as index.js), so every other page skips ~290 KB gz. Its stylesheet
// is the entry src/maplibre.css (dist/maplibre.css) and its tile worker the
// entry dist/maplibre-worker.js (build.mjs), which rank-map passes to
// setWorkerUrl. Exposed on window because index.js and this file are
// separate IIFE bundles.
import * as maplibregl from 'maplibre-gl';

window.wfcMapLibre = maplibregl;
