// Entry point. Keep this file a manifest: one run() call per module.
// Feature code lives in src/modules/<name>.ts and exports an init
// function that no-ops when its selector is absent from the page.
import { initCharts } from './modules/charts';
import { initCountUp } from './modules/count-up';
import { initEnvironmentSwitcher } from './modules/environment-switcher';
import { initFaq } from './modules/faq';
import { initFilterAll } from './modules/filter-all';
import { initFinsweetLoader } from './modules/finsweet-loader';
import { initHeroShader } from './modules/hero-shader';
import { initNav } from './modules/nav';
import { initPanelShader } from './modules/panel-shader';
import { initCaseVisuals } from './modules/case-visuals';
import { initCardCursor } from './modules/card-cursor';
import { initHubspotForm } from './modules/hubspot-form';
import { initMarquee } from './modules/marquee';
import { initParallax } from './modules/parallax';
import { initRankMap } from './modules/rank-map';
import { initShare } from './modules/share';
import { initSlider } from './modules/slider';
import { initTabs } from './modules/tabs';

// Each module runs in isolation: one that throws is logged and skipped,
// and every module after it still initializes.
function run(name: string, init: () => void) {
  try {
    init();
  } catch (error) {
    console.error(`[wfc] ${name} failed to initialize`, error);
  }
}

function boot() {
  // Release the pre-paint scroll lock set by loader.html first, before any
  // module measures the page — smooth-scroll libraries such as Lenis read
  // the scroll height at init and get ~0 while body is still locked. The
  // head snippet also has a fallback timeout.
  document.documentElement.classList.remove('is-loading');

  run('environment-switcher', initEnvironmentSwitcher);
  run('nav', initNav);
  run('faq', initFaq);
  run('hero-shader', initHeroShader);
  run('tabs', initTabs);
  run('slider', initSlider);
  run('panel-shader', initPanelShader);
  run('charts', initCharts);
  run('count-up', initCountUp);
  run('share', initShare);
  run('filter-all', initFilterAll);
  run('case-visuals', initCaseVisuals);
  run('card-cursor', initCardCursor);
  run('parallax', initParallax);
  run('rank-map', initRankMap);
  run('marquee', initMarquee);
  run('hubspot-form', initHubspotForm);
  // Last: Finsweet starts after the other modules have set their attributes.
  run('finsweet-loader', initFinsweetLoader);
  // Add project feature initializers here: run('<name>', init<Name>);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
