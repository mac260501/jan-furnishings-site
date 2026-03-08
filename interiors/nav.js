/**
 * Jan Interiors — Reusable Navigation Component
 *
 * Injects the canonical nav, mobile menu, and offset spacer into any
 * Jan Interiors page that contains <div id="interiors-nav-root"></div>.
 *
 * Features:
 *  - Auto-detects active nav link from window.location.pathname
 *  - Consistent "The Jan Group" brands section in mobile menu
 *  - Mobile menu scroll fix (overflow-y: auto)
 *  - Hamburger toggle with close-on-link-click
 *
 * Usage: <script src="/interiors/nav.js" defer></script>
 *        <div id="interiors-nav-root"></div>  (at top of <body>)
 */
(function () {
  /* ── ACTIVE PAGE DETECTION ─────────────────────────────────────── */
  var path = window.location.pathname;
  var activeHref = '';
  if (path === '/interiors/' || path === '/interiors/index.html') {
    activeHref = '/interiors/';
  } else if (path.indexOf('/interiors/services') === 0) {
    activeHref = '/interiors/services/';
  } else if (path.indexOf('/interiors/portfolio') === 0) {
    activeHref = '/interiors/portfolio/';
  } else if (path.indexOf('/interiors/packages') === 0) {
    activeHref = '/interiors/packages/';
  } else if (path.indexOf('/interiors/about') === 0) {
    activeHref = '/interiors/about/';
  }
  /* /interiors/book/ — no nav link gets active */

  /* ── CANONICAL CSS ─────────────────────────────────────────────── */
  var CSS =
    /* Nav bar */
    '.site-nav{position:fixed;top:34px;left:0;right:0;z-index:100;' +
      'height:68px;display:flex;align-items:center;justify-content:space-between;' +
      'padding:0 40px;background:rgba(20,20,18,0.92);backdrop-filter:blur(16px);' +
      '-webkit-backdrop-filter:blur(16px);' +
      'border-bottom:1px solid rgba(201,169,110,0.12);transition:background 0.3s;}' +

    /* Brand logo */
    '.nav-brand{display:flex;flex-direction:column;text-decoration:none;}' +
    '.nav-brand-name{font-family:"Cormorant Garamond",serif;font-size:20px;' +
      'font-weight:400;letter-spacing:0.04em;color:#C9A96E;line-height:1;}' +
    '.nav-brand-sub{font-size:8px;letter-spacing:0.22em;text-transform:uppercase;' +
      'color:rgba(201,169,110,0.45);margin-top:3px;}' +

    /* Desktop nav links */
    '.nav-links{list-style:none;display:flex;align-items:center;gap:36px;}' +
    '.nav-links a{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;' +
      'color:rgba(237,233,227,0.65);transition:color 0.2s;text-decoration:none;}' +
    '.nav-links a:hover,.nav-links a.active{color:#C9A96E;}' +

    /* CTA button */
    '.nav-cta{background:transparent;border:1px solid rgba(201,169,110,0.22);' +
      'color:#C9A96E;padding:10px 24px;font-size:10px;letter-spacing:0.16em;' +
      'text-transform:uppercase;font-family:"Jost",sans-serif;cursor:pointer;' +
      'transition:background 0.2s,color 0.2s;text-decoration:none;display:inline-block;}' +
    '.nav-cta:hover{background:#C9A96E;color:#141412;}' +

    /* Hamburger */
    '.nav-hamburger{display:none;flex-direction:column;gap:5px;' +
      'background:none;border:none;cursor:pointer;padding:4px;}' +
    '.nav-hamburger span{width:22px;height:1px;background:#EDE9E3;display:block;}' +

    /* Mobile menu — overflow-y:auto fixes scroll on tall screens */
    '.mobile-menu{display:none;position:fixed;inset:0;z-index:99;' +
      'background:#1e1e1b;padding:120px 40px 56px;' +
      'flex-direction:column;gap:0;overflow-y:auto;}' +
    '.mobile-menu.open{display:flex;}' +
    '.mobile-menu>a{font-family:"Cormorant Garamond",serif;font-size:38px;' +
      'font-weight:300;color:#EDE9E3;border-bottom:1px solid rgba(201,169,110,0.08);' +
      'padding:18px 0;transition:color 0.2s;text-decoration:none;}' +
    '.mobile-menu>a:hover{color:#C9A96E;}' +

    /* Mobile CTA link */
    '.mob-cta-link{margin-top:24px;display:inline-flex !important;width:fit-content;' +
      'border:1px solid rgba(201,169,110,0.22) !important;color:#C9A96E !important;' +
      'padding:14px 32px !important;font-family:"Jost",sans-serif !important;' +
      'font-size:11px !important;letter-spacing:0.16em;text-transform:uppercase;' +
      'border-bottom:1px solid rgba(201,169,110,0.22) !important;}' +

    /* Mobile brand section */
    '.mob-brands{margin-top:24px;padding-top:20px;' +
      'border-top:1px solid rgba(201,169,110,0.12);}' +
    '.mob-brands-label{font-size:8px;letter-spacing:0.22em;text-transform:uppercase;' +
      'color:#8A857D;margin-bottom:12px;}' +
    '.mob-brand-row{display:flex;align-items:center;gap:12px;' +
      'padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.04);' +
      'text-decoration:none;}' +
    '.mob-brand-icon{width:30px;height:30px;border:1px solid rgba(201,169,110,0.22);' +
      'display:flex;align-items:center;justify-content:center;' +
      'color:#C9A96E;flex-shrink:0;}' +
    '.mob-brand-text{font-family:"Cormorant Garamond",serif;' +
      'font-size:20px;color:#EDE9E3;flex:1;}' +
    '.mob-brand-badge{font-size:7px;letter-spacing:0.14em;text-transform:uppercase;' +
      'color:#C9A96E;border:1px solid rgba(201,169,110,0.22);padding:2px 7px;}' +

    /* Page offset spacer */
    '.offset{height:calc(34px + 68px);}' +

    /* Responsive */
    '@media(max-width:768px){' +
      '.nav-links,.nav-cta{display:none;}' +
      '.nav-hamburger{display:flex;}' +
      '.site-nav{padding:0 24px;}' +
    '}';

  /* ── SVG ICONS ─────────────────────────────────────────────────── */
  var iconFurnishings =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>' +
      '<polyline points="9 22 9 12 15 12 15 22"/>' +
    '</svg>';

  var iconInteriors =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<rect x="2" y="3" width="20" height="18" rx="1"/>' +
      '<path d="M2 9h20M9 9v12"/>' +
    '</svg>';

  var iconConstruction =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<polygon points="12 2 2 7 2 17 12 22 22 17 22 7"/>' +
      '<line x1="12" y1="2" x2="12" y2="22"/>' +
      '<line x1="2" y1="7" x2="22" y2="7"/>' +
      '<line x1="2" y1="17" x2="22" y2="17"/>' +
    '</svg>';

  /* ── HELPERS ───────────────────────────────────────────────────── */
  function navLink(href, label) {
    var isActive = activeHref === href;
    return '<li><a href="' + href + '"' + (isActive ? ' class="active"' : '') + '>' + label + '</a></li>';
  }

  function mobLink(href, label) {
    return '<a href="' + href + '" onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')">' + label + '</a>';
  }

  /* ── CANONICAL HTML ────────────────────────────────────────────── */
  var HTML =
    /* Desktop nav */
    '<nav class="site-nav" id="siteNav">' +
      '<a href="/interiors/" class="nav-brand">' +
        '<div class="nav-brand-name">Jan Interiors</div>' +
        '<div class="nav-brand-sub">by Jan Furnishings</div>' +
      '</a>' +
      '<ul class="nav-links">' +
        navLink('/interiors/', 'Home') +
        navLink('/interiors/services/', 'Services') +
        navLink('/interiors/portfolio/', 'Portfolio') +
        navLink('/interiors/packages/', 'Packages') +
        navLink('/interiors/about/', 'About') +
      '</ul>' +
      '<a href="/interiors/book/" class="nav-cta">Book a Consultation</a>' +
      '<button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>' +

    /* Mobile menu */
    '<div class="mobile-menu" id="mobileMenu">' +
      mobLink('/interiors/', 'Home') +
      mobLink('/interiors/services/', 'Services') +
      mobLink('/interiors/portfolio/', 'Portfolio') +
      mobLink('/interiors/packages/', 'Packages') +
      mobLink('/interiors/about/', 'About') +
      '<a href="/interiors/book/" class="mob-cta-link"' +
        ' onclick="document.getElementById(\'mobileMenu\').classList.remove(\'open\')">Book a Consultation</a>' +

      /* Brand switcher */
      '<div class="mob-brands">' +
        '<div class="mob-brands-label">The Jan Group</div>' +

        '<a href="https://thejanfurniture.com" class="mob-brand-row">' +
          '<div class="mob-brand-icon">' + iconFurnishings + '</div>' +
          '<div class="mob-brand-text">Jan Furnishings</div>' +
        '</a>' +

        '<div class="mob-brand-row">' +
          '<div class="mob-brand-icon" style="background:rgba(201,169,110,0.1)">' + iconInteriors + '</div>' +
          '<div class="mob-brand-text" style="color:#C9A96E">Jan Interiors</div>' +
          '<span class="mob-brand-badge">Current</span>' +
        '</div>' +

        '<a href="https://alhadeeqacontracting.com" class="mob-brand-row"' +
          ' target="_blank" rel="noopener noreferrer">' +
          '<div class="mob-brand-icon">' + iconConstruction + '</div>' +
          '<div class="mob-brand-text">Al Hadeeqa Construction</div>' +
        '</a>' +
      '</div>' +
    '</div>' +

    /* Page offset spacer */
    '<div class="offset"></div>';

  /* ── MOUNT ─────────────────────────────────────────────────────── */
  function mount() {
    /* Inject CSS */
    var style = document.createElement('style');
    style.id = 'interiors-nav-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    /* Inject HTML into mount root */
    var root = document.getElementById('interiors-nav-root');
    if (!root) return;
    root.innerHTML = HTML;

    /* Hamburger toggle */
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
