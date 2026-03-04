import {
  BOOK_LINK,
  LUXURY_NAV_LINKS,
  SITE_NAV_LINKS,
  WHATSAPP_BASE_URL
} from './constants.js';

const GOLD_TRIM_PAGES = new Set(['interiors', 'packages']);

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

function fallbackToggleMenu(forceOpen) {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;

  if (typeof forceOpen === 'boolean') {
    menu.classList.toggle('open', forceOpen);
  } else {
    menu.classList.toggle('open');
  }

  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', String(menu.classList.contains('open')));
  }
}

function triggerToggleMenu(forceOpen) {
  if (typeof window.toggleMenu === 'function') {
    if (typeof forceOpen === 'boolean') {
      const isOpen = document.getElementById('mobileMenu')?.classList.contains('open');
      if (Boolean(isOpen) !== forceOpen) {
        window.toggleMenu();
      }
      return;
    }

    window.toggleMenu();
    return;
  }

  fallbackToggleMenu(forceOpen);
}

function resolveLuxuryCta(pageKey) {
  if (pageKey !== 'kevlar') {
    return BOOK_LINK.luxury;
  }

  const message = encodeURIComponent("Hi, I'd like to enquire about your Kevlar curtains.");
  return {
    href: `${WHATSAPP_BASE_URL}?text=${message}`,
    label: 'Request Consultation'
  };
}

export function SiteHeader({ pageKey }) {
  return (
    <div className="container nav-wrap">
      <a className="brand" href="index.html">
        Jan Furnishings
        <small>Custom Curtains and Blinds</small>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-label="Toggle menu"
      >
        Menu
      </button>

      <nav className="nav" aria-label="Main navigation">
        {SITE_NAV_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            data-page={link.key}
            className={classNames(pageKey === link.key && 'active')}
          >
            {link.label}
          </a>
        ))}

        <a
          className={classNames('btn', 'btn-primary', pageKey === 'booking' && 'active')}
          href={BOOK_LINK.site.href}
        >
          {BOOK_LINK.site.label}
        </a>
      </nav>
    </div>
  );
}

export function LuxuryHeader({ pageKey }) {
  const cta = resolveLuxuryCta(pageKey);
  const hasGoldTrim = GOLD_TRIM_PAGES.has(pageKey);

  const onHamburgerClick = (event) => {
    event.preventDefault();
    triggerToggleMenu();
  };

  const onHamburgerKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    triggerToggleMenu();
  };

  return (
    <>
      <nav id="nav" className={classNames(hasGoldTrim && 'nav-gold-trim')}>
        <a href="index.html" className="nav-logo">Jan Furnishings</a>

        <ul className="nav-links">
          {LUXURY_NAV_LINKS.map((link) => (
            <li key={link.key}>
              <a href={link.href} className={classNames(pageKey === link.key && 'active')}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={cta.href} className={classNames('nav-cta', pageKey === 'booking' && 'active')}>
          {cta.label}
        </a>

        <div
          className="nav-hamburger"
          id="hamburger"
          role="button"
          tabIndex={0}
          aria-label="Open menu"
          aria-expanded="false"
          onClick={onHamburgerClick}
          onKeyDown={onHamburgerKeyDown}
        >
          <span></span><span></span><span></span>
        </div>
      </nav>

      <div className={classNames('mobile-menu', hasGoldTrim && 'mobile-menu-gold')} id="mobileMenu">
        {LUXURY_NAV_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className={classNames(pageKey === link.key && 'active')}
            onClick={() => triggerToggleMenu(false)}
          >
            {link.label}
          </a>
        ))}

        <a href={cta.href} className="mob-cta" onClick={() => triggerToggleMenu(false)}>
          {cta.label}
        </a>
      </div>
    </>
  );
}
