// Second entry (dist/fs-bundle.js): Finsweet Attributes, loaded only on pages
// that use them (src/modules/finsweet-loader.ts), so index.js stays small.
// webflow-build › lessons/js.md: "Finsweet in index.js costs every page".
import { initFinsweet } from './modules/finsweet';

initFinsweet();
