import { createRoot } from 'react-dom/client';
import { SiteHeader, LuxuryHeader } from './layout/Header.jsx';
import { SiteFooter, LuxuryFooter, whatsappFallbackHref } from './layout/Footer.jsx';
import { WhatsAppFloat } from './layout/WhatsAppFloat.jsx';
import { PAGE_KEY_BY_FILE } from './layout/constants.js';
import './layout/styles.css';

function getCurrentFile() {
  const file = window.location.pathname.split('/').pop();
  return file || 'index.html';
}

function resolvePageKey(file) {
  const byFile = PAGE_KEY_BY_FILE[file];
  if (byFile) return byFile;

  const fromBody = document.body?.getAttribute('data-page');
  if (fromBody) return fromBody;

  return 'home';
}

function detectLayoutVariant(file) {
  if (document.querySelector('header.site-header')) {
    return 'site';
  }

  if (document.getElementById('nav') || document.querySelector('.nav-links')) {
    return 'luxury';
  }

  if (file === 'kevlar-post.html') {
    return 'none';
  }

  return 'site';
}

function renderInto(container, element) {
  if (!container) return;

  container.innerHTML = '';
  createRoot(container).render(element);
}

function renderHeader(variant, pageKey) {
  if (variant === 'site') {
    const header = document.querySelector('header.site-header');
    if (!header) return;

    renderInto(header, <SiteHeader pageKey={pageKey} />);
    return;
  }

  if (variant !== 'luxury') return;

  const nav = document.getElementById('nav');
  if (!nav || !nav.parentNode) return;

  const mobileMenu = document.getElementById('mobileMenu');
  const mount = document.createElement('div');
  mount.id = 'layout-react-header-root';

  nav.parentNode.insertBefore(mount, nav);
  nav.remove();

  if (mobileMenu) {
    mobileMenu.remove();
  }

  renderInto(mount, <LuxuryHeader pageKey={pageKey} />);
}

function installGlobalToggleMenu() {
  window.toggleMenu = function toggleMenu(forceOpen) {
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
  };
}

function installLuxuryBrandMenu() {
  const trigger = document.getElementById('brandsTrigger');
  const toggle = document.getElementById('brandsToggle');
  const panel = document.getElementById('brandsMega');
  if (!trigger || !toggle || !panel) return;

  const closeMenu = () => {
    trigger.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    trigger.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (trigger.classList.contains('open')) {
      closeMenu();
      return;
    }

    openMenu();
  });

  panel.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', () => {
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
  });
}

function installLuxuryNavScroll() {
  const syncScrolledState = () => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  syncScrolledState();
  window.addEventListener('scroll', syncScrolledState, { passive: true });
}

function syncLuxuryNavOffset() {
  const applyOffset = () => {
    const nav = document.getElementById('nav');
    if (!nav) return;

    if (window.scrollY > 60) return;

    const navHeight = Math.ceil(nav.getBoundingClientRect().height);
    if (!Number.isFinite(navHeight) || navHeight <= 0) return;

    const brandBar = document.getElementById('brandBar');
    const brandBarHeight = brandBar ? Math.ceil(brandBar.getBoundingClientRect().height) : 0;

    document.documentElement.style.setProperty('--brand-bar-offset', `${brandBarHeight}px`);
    document.documentElement.style.setProperty('--nav-offset', `${navHeight + brandBarHeight}px`);
  };

  applyOffset();
  window.addEventListener('resize', applyOffset, { passive: true });
  window.addEventListener('orientationchange', applyOffset, { passive: true });
  window.addEventListener('load', applyOffset, { once: true });
}

function renderFooter(variant, pageKey) {
  const year = new Date().getFullYear();

  if (variant === 'site') {
    const footer = document.querySelector('footer.site-footer');
    if (!footer) return;

    footer.classList.remove('layout-react-luxury-footer');
    renderInto(footer, <SiteFooter year={year} />);
    return;
  }

  if (variant !== 'luxury') return;

  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.classList.add('layout-react-luxury-footer');
  renderInto(footer, <LuxuryFooter year={year} variant={variant} pageKey={pageKey} />);
}

function getExistingWhatsappHref() {
  const current = document.querySelector('a.wa-float[href*="wa.me"]');
  if (current) {
    return current.getAttribute('href') || current.href;
  }

  const anyWhatsapp = document.querySelector('a[href*="wa.me/"]');
  if (anyWhatsapp) {
    return anyWhatsapp.getAttribute('href') || anyWhatsapp.href;
  }

  return whatsappFallbackHref();
}

function renderWhatsappFloat() {
  const href = getExistingWhatsappHref();

  document.querySelectorAll('a.wa-float').forEach((node) => node.remove());

  let mount = document.getElementById('layout-react-wa-root');
  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'layout-react-wa-root';
    document.body.appendChild(mount);
  }

  renderInto(mount, <WhatsAppFloat href={href} />);
}

function init() {
  const file = getCurrentFile();
  const pageKey = resolvePageKey(file);
  const variant = detectLayoutVariant(file);

  if (document.body && !document.body.getAttribute('data-page')) {
    document.body.setAttribute('data-page', pageKey);
  }

  if (document.body) {
    document.body.setAttribute('data-layout-variant', variant);
  }

  if (variant !== 'none') {
    renderHeader(variant, pageKey);

    if (variant === 'luxury') {
      installGlobalToggleMenu();
      installLuxuryNavScroll();
      installLuxuryBrandMenu();
      syncLuxuryNavOffset();
    }

    renderFooter(variant, pageKey);
  }

  renderWhatsappFloat();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
