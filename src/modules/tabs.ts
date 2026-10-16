// Tabs: inside [data-tabs], each [data-tabs-tab] button shows the panel
// named in its aria-controls and hides the others. The active tab gets
// .is-active (a Designer combo class) and aria-selected; arrow keys, Home
// and End move between tabs, as the ARIA tabs pattern expects.
//
// data-tabs-auto="8" on the root moves to the next tab every 8 seconds, in
// a loop. The count is the active tab's progress bar ([data-tabs-progress],
// a CSS animation): the module sets data-tabs-running="true" on the root
// while the tabs are on screen and the page is visible, and moves on when
// the bar is full. Picking a tab by hand (click or keys) stops the loop
// (data-tabs-running="stopped", the bar stays full). Scrolling the tabs
// out of view clears the state, so the loop starts again, from the tab
// that is showing and an empty bar, the next time they come into view.
// With reduced motion there is no auto-advance. The other panels' images
// are fetched once the tabs first come into view, so a change doesn't
// show an empty panel.
//
// A change is animated unless reduced motion is on: for 700ms the new panel
// has .is-entering and the old one stays visible underneath with
// .is-leaving (repo CSS fades and zooms the new panel's background in over
// the old one), then the old panel is hidden. A [data-tabs-box] in each
// panel (the content card) grows or shrinks from the old box's height to
// its own.
const CHANGE_MS = 700;

export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tabs-tab]'));
    if (!tabs.length) return;
    // Panels are found through aria-controls; where that is missing (tabs and
    // panels from two CMS lists, which can't carry paired ids) the n-th tab
    // gets the n-th [data-tabs-panel], and the module writes the ids and the
    // ARIA links itself. [data-tabs-number] in a tab and [data-tabs-step] in
    // a panel are filled with the position (01, 02… and 1, 2…).
    // A CMS list publishes role="list" / "listitem" on its wrappers, which
    // hides the tabs from assistive tech as tabs: the list becomes the
    // tablist and its items presentation.
    const list = tabs[0].closest<HTMLElement>('[role="tablist"], [role="list"]');
    if (list && root.contains(list)) {
      list.setAttribute('role', 'tablist');
      tabs.forEach((tab) => {
        for (let el = tab.parentElement; el && el !== list; el = el.parentElement) if (el.getAttribute('role') === 'listitem') el.setAttribute('role', 'presentation');
      });
    }
    const loose = Array.from(root.querySelectorAll<HTMLElement>('[data-tabs-panel]'));
    const base = root.id || `tabs-${Array.from(document.querySelectorAll('[data-tabs]')).indexOf(root) + 1}`;
    const panels = tabs.map((tab, i) => {
      const panel = document.getElementById(tab.getAttribute('aria-controls') ?? '') ?? loose[i] ?? null;
      if (panel) {
        if (!tab.id) tab.id = `${base}-tab-${i + 1}`;
        if (!panel.id) panel.id = `${base}-panel-${i + 1}`;
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.id);
        // The panels' own CMS list: a role="list" around tabpanels is a list
        // with no list items (Lighthouse: ARIA roles missing required
        // children), so its wrappers become presentation too.
        for (let el = panel.parentElement; el && el !== root; el = el.parentElement) {
          const role = el.getAttribute('role');
          if (role === 'list' || role === 'listitem') el.setAttribute('role', 'presentation');
        }
      }
      tab.setAttribute('role', 'tab');
      tab.querySelectorAll('[data-tabs-number]').forEach((el) => { el.textContent = String(i + 1).padStart(2, '0'); });
      panel?.querySelectorAll('[data-tabs-step]').forEach((el) => { el.textContent = String(i + 1); });
      return panel;
    });
    let current = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));
    tabs.forEach((tab, i) => {
      const active = i === current;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (panels[i]) panels[i]!.hidden = !active;
    });

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let changing = 0;
    const settle = () => {
      window.clearTimeout(changing);
      changing = 0;
      panels.forEach((panel, i) => {
        if (!panel) return;
        panel.classList.remove('is-entering', 'is-leaving');
        panel.hidden = i !== current;
        const box = panel.querySelector<HTMLElement>('[data-tabs-box]');
        if (box) box.style.height = box.style.overflow = box.style.transition = '';
      });
    };

    const select = (index: number, focus = false) => {
      const from = panels[current];
      const to = panels[index];
      const animate = !still && index !== current && !!from && !!to;
      settle();
      const fromHeight = animate ? from.querySelector<HTMLElement>('[data-tabs-box]')?.offsetHeight : undefined;
      current = index;
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = panels[i];
        if (panel) panel.hidden = !active;
      });
      if (animate) {
        from.hidden = false;
        from.classList.add('is-leaving');
        to.classList.add('is-entering');
        const box = to.querySelector<HTMLElement>('[data-tabs-box]');
        if (box && fromHeight) {
          const toHeight = box.offsetHeight;
          box.style.overflow = 'hidden';
          box.style.height = `${fromHeight}px`;
          box.getBoundingClientRect(); // apply the start height before the transition
          box.style.transition = `height ${CHANGE_MS * 0.7}ms cubic-bezier(0.4, 0, 0.2, 1)`;
          box.style.height = `${toHeight}px`;
        }
        changing = window.setTimeout(settle, CHANGE_MS);
      }
      if (focus) tabs[index].focus();
    };

    // Auto-advance.
    const seconds = Number(root.dataset.tabsAuto);
    const auto = seconds > 0 && tabs.length > 1 && !!root.querySelector('[data-tabs-progress]') && !still;
    let stopLoop = () => {};
    if (auto) {
      let inView = false;
      let stopped = false;
      let fetched = false;
      const update = () => {
        if (stopped) root.dataset.tabsRunning = 'stopped';
        else if (inView && !document.hidden) root.dataset.tabsRunning = 'true';
        else delete root.dataset.tabsRunning;
      };
      stopLoop = () => { stopped = true; update(); };
      root.style.setProperty('--tabs-auto', `${seconds}s`);
      root.addEventListener('animationend', (event) => {
        if ((event.target as HTMLElement).matches('[data-tabs-progress]')) select((current + 1) % tabs.length);
      });
      new IntersectionObserver((entries) => {
        inView = entries[entries.length - 1].isIntersecting;
        if (!inView) stopped = false;
        if (inView && !fetched) {
          fetched = true;
          panels.forEach((panel) => panel?.querySelectorAll('img[loading="lazy"]').forEach((img) => { new Image().src = (img as HTMLImageElement).currentSrc || (img as HTMLImageElement).src; }));
        }
        update();
      }, { threshold: 0.25 }).observe(root);
      document.addEventListener('visibilitychange', update);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { stopLoop(); select(i); });
      tab.addEventListener('keydown', (event) => {
        const last = tabs.length - 1;
        const next =
          event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
          : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
          : event.key === 'Home' ? 0
          : event.key === 'End' ? last
          : -1;
        if (next < 0) return;
        event.preventDefault();
        stopLoop();
        select(next, true);
      });
    });
  });
}
