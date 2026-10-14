// "All" chip for Finsweet List filters: [data-filter-all="<class>"] on the
// clear control (fs-list-element="clear") gets that class while no radio or
// checkbox in its filters form is checked. Finsweet moves its active class
// between the chosen chips but leaves the clear control alone (repo-css:
// none; the class is a Designer combo, e.g. Filter Chip Is Active).
const CHECKED = 'input[type="radio"]:checked, input[type="checkbox"]:checked';

export function initFilterAll() {
  document.querySelectorAll<HTMLElement>('[data-filter-all]').forEach((all) => {
    const form = all.closest<HTMLElement>('[fs-list-element="filters"], form');
    if (!form) return;
    const cls = all.dataset.filterAll || 'is-active';
    const sync = () => all.classList.toggle(cls, !form.querySelector(CHECKED));
    form.addEventListener('change', sync);
    form.addEventListener('input', sync);
    // The clear control resets the inputs on its own click; read them after it.
    all.addEventListener('click', () => {
      setTimeout(sync, 0);
      setTimeout(sync, 150);
    });
    sync();
  });
}
