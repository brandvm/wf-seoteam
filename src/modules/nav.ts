// Nav: [data-nav-toggle] opens the mobile menu below 992px.
//
// With a [data-mobile-menu] panel (a full-screen dialog inside the nav
// component) the toggle shows it: the panel loses `hidden`, gets .is-open a
// frame later (so its CSS transition runs), the page stops scrolling
// (html.is-menu-open) and focus moves into it. [data-nav-close], Escape, a
// link click and resizing past the breakpoint close it; Tab stays inside it
// while it is open. Without that panel the older behaviour applies: .is-open
// on the nav shows the desktop menu as a dropdown (repo-css js-state).
//
// [data-nav-section="/research /authors"] (one or more paths, space-
// separated) on a nav item gets aria-current="true" on pages under any of
// them, so the section in view is marked (repo-css js-state).
const CLOSE_MS = 320;

export function initNav() {
  const path = location.pathname.replace(/\/$/, '');
  document.querySelectorAll<HTMLElement>('[data-nav-section]').forEach((item) => {
    const bases = (item.dataset.navSection || '').split(/\s+/).map((b) => b.replace(/\/$/, '')).filter(Boolean);
    if (bases.some((base) => path === base || path.startsWith(`${base}/`))) item.setAttribute('aria-current', 'true');
  });

  initDropdowns();

  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!toggle) return;
  const panel = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (panel) initMobileMenu(toggle, panel);
  else initDropdownMenu(toggle);
}

function initMobileMenu(toggle: HTMLButtonElement, panel: HTMLElement) {
  const root = document.documentElement;
  let closing: number | undefined;
  if (!panel.id) panel.id = 'mobile-menu';
  toggle.setAttribute('aria-controls', panel.id);
  toggle.setAttribute('aria-expanded', 'false');
  panel.hidden = true;

  const focusables = () =>
    [...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
      (el) => el.offsetParent !== null,
    );
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const open = () => {
    window.clearTimeout(closing);
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    root.classList.add('is-menu-open');
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-open')));
    (panel.querySelector<HTMLElement>('[data-nav-close]') ?? focusables()[0])?.focus({ preventScroll: true });
  };
  const close = (returnFocus = true) => {
    if (!isOpen()) return;
    toggle.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    root.classList.remove('is-menu-open');
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    closing = window.setTimeout(() => (panel.hidden = true), still ? 0 : CLOSE_MS);
    if (returnFocus) toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));
  panel.querySelectorAll('[data-nav-close]').forEach((el) => el.addEventListener('click', () => close()));
  panel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a[href]')) close(false);
  });
  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  matchMedia('(min-width: 992px)').addEventListener('change', (event) => {
    if (event.matches) close(false);
  });
}

// Desktop dropdowns: a [data-nav-dropdown] button with aria-controls opens
// the [data-nav-panel] of that id (.is-open shows it, .is-visible right
// after a reflow runs its fade). Click toggles; with a mouse, hovering the button or
// the panel opens it and leaving both closes it after a short delay. One
// panel at a time; Escape, a click outside, focus leaving the nav, a link
// click and resizing below 992px close it.
const HOVER_OPEN_MS = 80;
const HOVER_CLOSE_MS = 220;

function initDropdowns() {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-nav-dropdown][aria-controls]')];
  const pairs = buttons
    .map((button) => ({ button, panel: document.getElementById(button.getAttribute('aria-controls') || '') }))
    .filter((pair): pair is { button: HTMLButtonElement; panel: HTMLElement } => !!pair.panel);
  if (!pairs.length) return;
  const nav = pairs[0].button.closest<HTMLElement>('[data-nav]') ?? document.body;
  const desktop = matchMedia('(min-width: 992px)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  let current: (typeof pairs)[number] | null = null;
  let timer: number | undefined;

  const close = (returnFocus = false) => {
    window.clearTimeout(timer);
    if (!current) return;
    const { button, panel } = current;
    button.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-visible', 'is-open');
    if (returnFocus) button.focus({ preventScroll: true });
    current = null;
  };
  const open = (pair: (typeof pairs)[number]) => {
    window.clearTimeout(timer);
    if (current === pair) return;
    close();
    current = pair;
    pair.button.setAttribute('aria-expanded', 'true');
    pair.panel.classList.add('is-open');
    void pair.panel.offsetWidth; // apply display first, so the fade runs
    pair.panel.classList.add('is-visible');
  };

  pairs.forEach((pair) => {
    const { button, panel } = pair;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => (current === pair ? close() : open(pair)));
    const enter = () => {
      if (!hover.matches || !desktop.matches) return;
      window.clearTimeout(timer);
      if (current !== pair) timer = window.setTimeout(() => open(pair), current ? 0 : HOVER_OPEN_MS);
    };
    const leave = () => {
      if (!hover.matches) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => current === pair && close(), HOVER_CLOSE_MS);
    };
    [button, panel].forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    panel.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a[href]')) close();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && current) close(true);
  });
  document.addEventListener('click', (event) => {
    if (current && !nav.contains(event.target as Node)) close();
  });
  nav.addEventListener('focusout', (event) => {
    if (current && !nav.contains(event.relatedTarget as Node | null)) close();
  });
  desktop.addEventListener('change', (event) => {
    if (!event.matches) close();
  });
}

function initDropdownMenu(toggle: HTMLButtonElement) {
  const nav = toggle.closest('nav');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
  if (!nav || !menu) return;
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
