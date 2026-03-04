const HERO_GLASS_SELECTORS = [
  '.hero-text-glass',
  '.hero-glass',
  '.left-glass'
];

const HERO_GLASS_PAGES = new Set(['interiors', 'packages']);

export function applyHeroGlass({ pageKey }) {
  if (!HERO_GLASS_PAGES.has(pageKey)) {
    return;
  }

  document.querySelectorAll(HERO_GLASS_SELECTORS.join(',')).forEach((node) => {
    node.classList.add('jf-hero-glass');
  });
}
