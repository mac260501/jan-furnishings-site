/**
 * Jan Interiors — Shared Brand Bar Component
 *
 * Injects the canonical "Jan Group" brand bar (top strip) into every
 * Jan Interiors page.  A single source of truth so all 5 pages are
 * pixel-identical.  Just drop this in <head> with defer:
 *
 *   <script src="/interiors/brand-bar.js" defer></script>
 */
(function () {
  /* ── CANONICAL CSS ────────────────────────────────────────────────── */
  var CSS =
    /* Bar shell */
    '.brand-bar{position:fixed;top:0;left:0;right:0;z-index:200;height:34px;' +
    'background:#0d0d0b;border-bottom:1px solid rgba(201,169,110,0.1);' +
    'display:flex;align-items:center;justify-content:space-between;padding:0 40px;}' +

    /* Left label */
    '.brand-bar-label{font-size:9px;letter-spacing:.24em;text-transform:uppercase;' +
    'color:rgba(237,233,227,0.3);}' +

    /* Links wrapper */
    '.brand-bar-links{display:flex;align-items:stretch;height:34px;}' +

    /* Individual pill links */
    '.bb-link{display:flex;align-items:center;gap:7px;padding:0 16px;font-size:9px;' +
    'letter-spacing:.15em;text-transform:uppercase;color:rgba(237,233,227,0.4);' +
    'border-left:1px solid rgba(255,255,255,0.06);' +
    'transition:color .2s,background .2s;white-space:nowrap;}' +
    '.bb-link:hover{color:rgba(237,233,227,0.85);}' +
    '.bb-link.active{color:#C9A96E;background:rgba(201,169,110,0.06);}' +

    /* Active gold dot */
    '.bb-dot{width:4px;height:4px;border-radius:50%;background:#C9A96E;}' +

    /* Mobile overrides */
    '@media(max-width:768px){' +
    '.brand-bar{padding:0 20px;}' +
    '.brand-bar-label{display:none;}' +
    '.bb-link{padding:0 10px;font-size:8px;}' +
    '}';

  /* ── CANONICAL HTML ───────────────────────────────────────────────── */
  var HTML =
    '<div class="brand-bar">' +
      '<span class="brand-bar-label">The Jan Group</span>' +
      '<div class="brand-bar-links">' +
        '<a class="bb-link" href="https://thejanfurniture.com">Jan Furnishings</a>' +
        '<a class="bb-link active" href="/interiors/"><span class="bb-dot"></span>Jan Interiors</a>' +
        '<a class="bb-link" href="https://alhadeeqacontracting.com" target="_blank" rel="noopener noreferrer">Jan Construction</a>' +
      '</div>' +
    '</div>';

  /* ── MOUNT ────────────────────────────────────────────────────────── */
  function mount() {
    /* Inject styles */
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    /* Inject HTML as the very first child of <body> */
    document.body.insertAdjacentHTML('afterbegin', HTML);
  }

  /* Support both deferred and inline script loading */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
