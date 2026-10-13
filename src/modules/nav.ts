// Nav: [data-nav-toggle] opens and closes the menu below 992px by toggling
// .is-open on the nav (repo-css js-state). Escape and a link click close
// it; resizing past the breakpoint resets it.
export function initNav() {
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
