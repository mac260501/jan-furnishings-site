import {
  BOOK_LINK,
  LUXURY_NAV_LINKS,
  SITE_NAV_LINKS,
  WHATSAPP_BASE_URL
} from './constants.js';

const GOLD_TRIM_PAGES = new Set(['interiors']);
const INTERIORS_BRAND_PAGES = new Set(['interiors']);
const GROUP_BRANDS = [
  {
    key: 'furnishings',
    name: 'Jan Furnishings',
    href: 'index.html',
    description: 'Custom curtains, blinds and window treatments across Dubai only.'
  },
  {
    key: 'interiors',
    name: 'Jan Interiors',
    href: '/interiors/',
    description: 'Wall panels, wallpapers, painting, renovation and curated package solutions.'
  },
  {
    key: 'construction',
    name: 'Al Hadeeqa Construction',
    href: 'https://alhadeeqacontracting.com',
    description: 'Premium construction and bespoke contracting for high-end residential projects.',
    external: true
  }
];

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

function isInteriorsBrandPage(pageKey) {
  return INTERIORS_BRAND_PAGES.has(pageKey);
}

function resolveCurrentBrand(pageKey) {
  return isInteriorsBrandPage(pageKey) ? 'interiors' : 'furnishings';
}

function resolveBrandLogo(pageKey) {
  if (isInteriorsBrandPage(pageKey)) {
    return { label: 'Jan Interiors', href: '/interiors/' };
  }

  return { label: 'Jan Furnishings', href: 'index.html' };
}

function BrandIcon({ brandKey, size = 18 }) {
  if (brandKey === 'furnishings') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    );
  }

  if (brandKey === 'interiors') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="3" width="20" height="18" rx="1"></rect>
        <path d="M2 9h20M9 9v12"></path>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="12 2 2 7 2 17 12 22 22 17 22 7"></polygon>
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <line x1="2" y1="7" x2="22" y2="7"></line>
      <line x1="2" y1="17" x2="22" y2="17"></line>
    </svg>
  );
}

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
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
  const currentBrand = resolveCurrentBrand(pageKey);
  const logo = resolveBrandLogo(pageKey);

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
      <div id="brandBar" className={classNames('brand-bar', hasGoldTrim && 'brand-bar-gold')}>
        <span className="brand-bar-left">Part of the Jan Group</span>
        <div className="brand-bar-links">
          {GROUP_BRANDS.map((brand) => (
            <a
              key={brand.key}
              href={brand.href}
              className={classNames('brand-pill', currentBrand === brand.key && 'brand-pill-active')}
              {...(brand.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {currentBrand === brand.key ? <span className="brand-pill-dot"></span> : null}
              {brand.name}
            </a>
          ))}
        </div>
      </div>

      <nav id="nav" className={classNames(hasGoldTrim && 'nav-gold-trim')}>
        <a href={logo.href} className="nav-logo">{logo.label}</a>

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

        <div className="mobile-brands-section">
          <div className="mobile-brands-label">Part of the Jan Group</div>
          {GROUP_BRANDS.map((brand) => {
            const isCurrent = currentBrand === brand.key;
            return (
              <a
                key={brand.key}
                href={brand.href}
                className="mobile-brand-link"
                {...(brand.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => triggerToggleMenu(false)}
              >
                <span className="mob-brand-icon">
                  <BrandIcon brandKey={brand.key} size={16} />
                </span>
                {brand.name}
                {isCurrent ? <span className="mobile-brand-badge">Current</span> : null}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
