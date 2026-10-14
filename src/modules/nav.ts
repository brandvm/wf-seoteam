// Nav: [data-nav-toggle] opens and closes the menu below 992px by toggling
// .is-open on the nav (repo-css js-state). Escape and a link click close
// it; resizing past the breakpoint resets it. [data-nav-section="/research
// /authors"] (one or more paths, space-separated) on a nav item gets
// aria-current="true" on pages under any of them, so the section in view is
// marked (repo-css js-state).
export function initNav() {
  const path = location.pathname.replace(/\/$/, '');
  document.querySelectorAll<HTMLElement>('[data-nav-section]').forEach((item) => {
    const bases = (item.dataset.navSection || '').split(/\s+/).map((b) => b.replace(/\/$/, '')).filter(Boolean);
    if (bases.some((base) => path === base || path.startsWith(`${base}/`))) item.setAttribute('aria-current', 'true');
  });

  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const nav = toggle?.closest('nav');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
  if (!toggle || !nav || !menu) return;

  const set = (open: boolean) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) set(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      set(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 992px)').addEventListener('change', (event) => {
    if (event.matches) set(false);
  });
}
