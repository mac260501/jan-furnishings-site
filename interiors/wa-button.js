/**
 * Jan Interiors — Reusable WhatsApp Button
 * Floating bottom-right button + .btn-wa green class for inline buttons.
 * Usage: <script src="/interiors/wa-button.js" defer></script>
 */
(function () {
  'use strict';

  var WA_URL = 'https://wa.me/971508806292';

  var WA_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
      '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
      '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
      '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
      '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
      '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2' +
      ' 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118' +
      '.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413' +
      '-.074-.124-.272-.198-.57-.347' +
      'm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982' +
      '.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884' +
      ' 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994' +
      'c-.003 5.45-4.437 9.884-9.885 9.884' +
      'm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892' +
      'c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654' +
      'a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893' +
      'a11.821 11.821 0 00-3.48-8.413z"/>' +
    '</svg>';

  var CSS =
    /* ── Floating sticky button ──────────────────── */
    '#interiors-wa-float{' +
      'position:fixed;bottom:28px;right:28px;z-index:9000;' +
      'display:inline-flex;align-items:center;gap:10px;' +
      'background:#25D366;color:#fff;' +
      'padding:14px 22px;' +
      'box-shadow:0 4px 20px rgba(37,211,102,0.40);' +
      'font-family:\'Jost\',sans-serif;font-size:12px;font-weight:500;letter-spacing:.1em;' +
      'text-transform:uppercase;text-decoration:none;' +
      'transition:transform .2s ease,box-shadow .2s ease;' +
    '}' +
    '#interiors-wa-float:hover{' +
      'transform:translateY(-3px);box-shadow:0 10px 32px rgba(37,211,102,0.50);' +
    '}' +
    '#interiors-wa-float .wa-float-label{display:inline;}' +

    /* ── Inline green WhatsApp button ────────────── */
    '.btn-wa{' +
      'background:#25D366;color:#fff;border:1px solid #25D366;' +
      'padding:15px 36px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;' +
      'font-family:\'Jost\',sans-serif;font-weight:500;' +
      'display:inline-flex;align-items:center;gap:10px;' +
      'transition:opacity .2s,transform .2s;' +
    '}' +
    '.btn-wa:hover{opacity:.88;transform:translateY(-1px);}' +

    /* ── Green form WhatsApp link ─────────────────── */
    '.form-wa-btn{color:#25D366 !important;}' +

    /* ── Mobile: icon-only float ─────────────────── */
    '@media(max-width:600px){' +
      '#interiors-wa-float{bottom:20px;right:20px;padding:14px;}' +
      '#interiors-wa-float .wa-float-label{display:none;}' +
    '}';

  function mount() {
    if (document.getElementById('interiors-wa-styles')) return;

    /* Inject styles */
    var style = document.createElement('style');
    style.id = 'interiors-wa-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    /* Create floating button */
    var btn = document.createElement('a');
    btn.id = 'interiors-wa-float';
    btn.href = WA_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.innerHTML = WA_ICON + '<span class="wa-float-label">WhatsApp Us</span>';
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
