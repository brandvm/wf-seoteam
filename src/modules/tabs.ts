// Tabs: inside [data-tabs], each [data-tabs-tab] button shows the panel
// named in its aria-controls and hides the others. The active tab gets
// .is-active (a Designer combo class) and aria-selected; arrow keys, Home
// and End move between tabs, as the ARIA tabs pattern expects.
export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tabs-tab]'));
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls') ?? ''));
    if (!tabs.length) return;

    const select = (index: number, focus = false) => {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = panels[i];
        if (panel) panel.hidden = !active;
      });
      if (focus) tabs[index].focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
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
        select(next, true);
      });
    });
  });
}
