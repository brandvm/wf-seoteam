// CMS order: [data-sort-by-order] on a Collection List's list element puts
// its items in the order of their [data-order] number (bound to a CMS number
// field, e.g. Tile Order). For lists whose own Sort setting Webflow refuses
// to save ("component map" conflict, see GOTCHAS). Items without a number
// keep their place at the end; without the script the CMS order shows.
export function initCmsOrder() {
  document.querySelectorAll<HTMLElement>('[data-sort-by-order]').forEach((list) => {
    const items = Array.from(list.children) as HTMLElement[];
    const key = (el: HTMLElement) => {
      const n = Number(el.dataset.order);
      return Number.isFinite(n) && el.dataset.order !== '' ? n : Infinity;
    };
    items
      .map((el, i) => ({ el, i, k: key(el) }))
      .sort((a, b) => a.k - b.k || a.i - b.i)
      .forEach(({ el }) => list.appendChild(el));
  });
}
