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
// [data-nav-scroll-class="<class …>"] on the nav wrapper: those classes are
// added while the page is scrolled more than 8px, so the bar turns light over
// the content. In Webflow it holds the Light variant's class (w-variant-…),
// in the prototype `is-light`; a nav already carrying them is left alone.
// Webflow puts a variant's class on every element it styles, so with
// [data-nav-scroll-deep] the classes also go on everything in the bar (the
// <nav>); elements the variant doesn't style ignore them.
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
  initScrollTheme();
  initNavHeight();

  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  if (!toggle) return;
  const panel = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (panel) initMobileMenu(toggle, panel);
  else initDropdownMenu(toggle);
}

// --nav-h on <html> follows the fixed bar's measured height, so anchored
// sections stop with their top edge on the bar's bottom edge
// (html { scroll-padding-top: var(--nav-h) }, repo-css). Measured, not read
// from the Webflow variable: that one is in em of the scaled body size,
// which <html> doesn't have.
function initNavHeight() {
  const bar = document.querySelector<HTMLElement>('[data-nav]');
  if (!bar) return;
  const set = () => document.documentElement.style.setProperty('--nav-h', `${Math.round(bar.offsetHeight)}px`);
  new ResizeObserver(set).observe(bar);
  set();
}

function initScrollTheme() {
  const nav = document.querySelector<HTMLElement>('[data-nav-scroll-class]');
  const classes = (nav?.dataset.navScrollClass || '').split(/\s+/).filter(Boolean);
  if (!nav || !classes.length || classes.every((c) => nav.classList.contains(c))) return;
  const bar = nav.hasAttribute('data-nav-scroll-deep') ? nav.querySelector('nav') : null;
  const targets = [nav, ...(bar ? [bar, ...bar.querySelectorAll<HTMLElement>('*')] : [])];
  let scrolled = false;
  const update = () => {
    const next = window.scrollY > 8;
    if (next === scrolled) return;
    scrolled = next;
    targets.forEach((el) => classes.forEach((c) => el.classList.toggle(c, scrolled)));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
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
// the [data-nav-panel] of that id inside the flyout. One panel at a time; Escape, a click
// outside, focus leaving the nav, a link click and resizing below 992px
// close it. Click toggles; with a mouse, hovering opens.
//
// Apple-style (after apple.com): the panels sit in
// one [data-nav-flyout-card] whose height is set from the open panel and
// animates, so moving from Services to Industries swaps the content inside
// the same card instead of closing and reopening. The first hover opens
// after a short pause (crossing the bar doesn't open anything), later ones
// switch at once; hovering a link without a panel, the curtain, or leaving
// the nav closes it. [data-nav-curtain] blurs and dims the page and the bar
// behind the nav items meanwhile.
// .is-open shows the flyout and curtain, .is-visible fades the curtain,
// .is-active shows a panel; each label, link and card gets --nav-i for the
// staggered fade (repo-css js-state).
const FLYOUT_OPEN_MS = 140;
const FLYOUT_SWITCH_MS = 40;
const FLYOUT_CLOSE_MS = 160;
const FLYOUT_COLLAPSE_MS = 380;
const STAGGER = '.nav-panel-label, .nav-panel-list > *, .nav-panel-more, .nav-panel-card';

type Pair = { button: HTMLButtonElement; panel: HTMLElement };

function initDropdowns() {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-nav-dropdown][aria-controls]')];
  const pairs = buttons
    .map((button) => ({ button, panel: document.getElementById(button.getAttribute('aria-controls') || '') }))
    .filter((pair): pair is Pair => !!pair.panel);
  if (!pairs.length) return;
  const nav = pairs[0].button.closest<HTMLElement>('[data-nav]') ?? document.body;
  const flyout = nav.querySelector<HTMLElement>('[data-nav-flyout]');
  const card = flyout?.querySelector<HTMLElement>('[data-nav-flyout-card]');
  if (flyout && card) initFlyout(nav, pairs, flyout, card);
}

function initFlyout(nav: HTMLElement, pairs: Pair[], flyout: HTMLElement, card: HTMLElement) {
  const desktop = matchMedia('(min-width: 992px)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const curtain = nav.querySelector<HTMLElement>('[data-nav-curtain]');
  let current: Pair | null = null;
  let timer: number | undefined;
  let collapsing: number | undefined;

  pairs.forEach(({ panel }) =>
    panel.querySelectorAll<HTMLElement>(STAGGER).forEach((el, i) => el.style.setProperty('--nav-i', String(Math.min(i, 14)))),
  );

  const fit = () => {
    if (!current) return;
    const border = card.offsetHeight - card.clientHeight;
    // The panel stretches to the card and its top part may be squeezed while
    // the card animates (the footer bar stays on the bottom edge), so the
    // target is the children's full content height, not the panel's box.
    const content = [...current.panel.children].reduce((h, el) => h + el.scrollHeight, 0);
    card.style.height = `${content + border}px`;
  };
  const resize = new ResizeObserver(fit);

  const close = (returnFocus = false) => {
    window.clearTimeout(timer);
    closeQueued = false;
    if (!current) return;
    const { button, panel } = current;
    button.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-active');
    resize.disconnect();
    card.style.height = '0px';
    curtain?.classList.remove('is-visible');
    if (returnFocus) button.focus({ preventScroll: true });
    current = null;
    collapsing = window.setTimeout(
      () => {
        if (current) return;
        flyout.classList.remove('is-open');
        curtain?.classList.remove('is-open');
      },
      still.matches ? 0 : FLYOUT_COLLAPSE_MS,
    );
  };
  const open = (pair: Pair) => {
    window.clearTimeout(timer);
    closeQueued = false;
    window.clearTimeout(collapsing);
    if (current === pair) return;
    if (current) {
      current.button.setAttribute('aria-expanded', 'false');
      current.panel.classList.remove('is-active');
      resize.disconnect();
    } else {
      flyout.classList.add('is-open');
      curtain?.classList.add('is-open');
      void card.offsetWidth; // apply display first, so height and fade run
      curtain?.classList.add('is-visible');
    }
    current = pair;
    pair.button.setAttribute('aria-expanded', 'true');
    pair.panel.classList.add('is-active');
    [...pair.panel.children].forEach((el) => resize.observe(el));
    fit();
  };
  let closeQueued = false;
  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(timer);
    closeQueued = false;
    timer = window.setTimeout(fn, ms);
  };
  const queueClose = () => {
    if (!usesHover() || !current || closeQueued) return;
    later(() => close(), FLYOUT_CLOSE_MS);
    closeQueued = true;
  };
  const usesHover = () => hover.matches && desktop.matches;

  pairs.forEach((pair) => {
    const { button, panel } = pair;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => (current === pair ? close() : open(pair)));
    button.addEventListener('mouseenter', () => {
      if (!usesHover() || current === pair) {
        window.clearTimeout(timer);
        closeQueued = false;
        return;
      }
      later(() => open(pair), current ? FLYOUT_SWITCH_MS : FLYOUT_OPEN_MS);
    });
    button.addEventListener('mouseleave', () => {
      if (usesHover() && !current) window.clearTimeout(timer); // left before the pause ended
    });
    panel.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a[href]')) close();
    });
  });
  flyout.addEventListener('mouseenter', () => {
    if (!usesHover() || !current) return;
    window.clearTimeout(timer);
    closeQueued = false;
  });
  // Other items in the bar (links without a panel, logo, buttons) close it.
  nav.querySelectorAll<HTMLElement>('a[href], button').forEach((el) => {
    if (pairs.some((p) => p.button === el) || flyout.contains(el) || el.closest('[data-mobile-menu]')) return;
    el.addEventListener('mouseenter', queueClose);
  });
  // mousemove, not mouseenter: the curtain appearing under a resting pointer
  // (opened from the keyboard) counts as entering it.
  curtain?.addEventListener('mousemove', queueClose);
  curtain?.addEventListener('click', () => close());
  nav.addEventListener('mouseleave', queueClose);

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
