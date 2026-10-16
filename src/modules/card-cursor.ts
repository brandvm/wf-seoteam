// Card cursor label: a small "View case study" box that follows the pointer
// over a linked card and stays inside it. Markup: a [data-card-cursor]
// element inside the card (the card is the link). The label starts
// below-right of the pointer. It changes side only when it touches an edge:
// at the right edge it moves to the left of the pointer and stays there until
// it touches the left edge (same for bottom / top). It glides to each new
// position (eased each frame), so a change of side is a slide, not a jump.
// Fine pointers only: on touch the card's arrow is the cue, and the label
// stays hidden (aria-hidden; the link has its name).
// Reduced motion: the label follows without easing.
const OFFSET = 14;
const EDGE = 8;
const EASE = 0.2;

export function initCardCursor() {
  const labels = document.querySelectorAll<HTMLElement>('[data-card-cursor]');
  if (!labels.length || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  labels.forEach((label) => {
    const card = label.parentElement;
    if (!card) return;
    let tx = 0, ty = 0, x = 0, y = 0;
    let sideX = 1, sideY = 1; // 1: right of / below the pointer; -1: left / above
    let frame = 0;
    let inside = false;

    const target = (event: PointerEvent) => {
      const box = card.getBoundingClientRect();
      const w = label.offsetWidth;
      const h = label.offsetHeight;
      const px = event.clientX - box.left;
      const py = event.clientY - box.top;
      if (sideX === 1 && px + OFFSET + w > box.width - EDGE) sideX = -1;
      else if (sideX === -1 && px - OFFSET - w < EDGE) sideX = 1;
      if (sideY === 1 && py + OFFSET + h > box.height - EDGE) sideY = -1;
      else if (sideY === -1 && py - OFFSET - h < EDGE) sideY = 1;
      tx = sideX === 1 ? px + OFFSET : px - OFFSET - w;
      ty = sideY === 1 ? py + OFFSET : py - OFFSET - h;
      tx = Math.max(EDGE, Math.min(tx, box.width - w - EDGE));
      ty = Math.max(EDGE, Math.min(ty, box.height - h - EDGE));
    };

    const tick = () => {
      const k = still.matches ? 1 : EASE;
      x += (tx - x) * k;
      y += (ty - y) * k;
      label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      if (inside || Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    const run = () => { if (!frame) frame = requestAnimationFrame(tick); };

    card.addEventListener('pointerenter', (event) => {
      sideX = 1; sideY = 1;
      target(event);
      x = tx; y = ty; // appear where the pointer is, then follow
      inside = true;
      label.classList.add('is-visible');
      run();
    });
    card.addEventListener('pointermove', (event) => { target(event); run(); });
    card.addEventListener('pointerleave', () => {
      inside = false;
      label.classList.remove('is-visible');
    });
  });
}
