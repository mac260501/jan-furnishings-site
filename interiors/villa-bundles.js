/**
 * Jan Group — Full Villa Bundles Component
 *
 * Injects the "Full Villa Bundles" section (Villa Complete + Villa Prestige)
 * into any page that contains <div id="villa-bundles"></div>.
 *
 * Used on both:
 *   - packages.html            (Jan Furnishings)
 *   - interiors/packages/      (Jan Interiors)
 *
 * All CSS classes are prefixed with `jvb-` to avoid conflicts with host-page styles.
 * All colours are hardcoded — no reliance on host-page CSS variables.
 */
(function () {
  var isInteriors = window.location.pathname.indexOf('/interiors') === 0;
  var bookUrl     = isInteriors ? '/interiors/book/' : 'book.html';
  var waUrl       = 'https://wa.me/971508806292';

  /* ── CANONICAL CSS ────────────────────────────────────────────────── */
  var CSS =
    /* Wrapper & section title */
    '.jvb-wrap{font-family:"DM Sans",sans-serif;}' +
    '.jvb-section-title{padding:72px 64px 0;}' +
    '.jvb-eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;' +
      'color:#C9A96E;margin-bottom:18px;display:flex;align-items:center;gap:12px;}' +
    '.jvb-eyebrow::before{content:"";width:28px;height:1px;background:#C9A96E;}' +
    '.jvb-h2{font-family:"Cormorant Garamond",serif;font-size:clamp(40px,5vw,72px);' +
      'font-weight:400;color:#F0EDE8;line-height:1.05;margin-bottom:16px;}' +
    '.jvb-h2 em{font-style:italic;color:#E8D5B0;}' +
    '.jvb-divider{width:60px;height:1px;background:#C9A96E;margin:24px 0;opacity:.6;}' +
    '.jvb-sub{font-size:15px;line-height:1.8;color:rgba(240,237,232,0.6);' +
      'max-width:520px;margin-bottom:24px;}' +

    /* Bundle grid */
    '.jvb-bundle-section{padding:22px 64px 100px;}' +
    '.jvb-bundle-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}' +

    /* Cards */
    '.jvb-bundle-card{position:relative;overflow:hidden;min-height:520px;' +
      'display:flex;flex-direction:column;justify-content:flex-end;' +
      'border:1px solid rgba(201,169,110,.24);}' +
    '.jvb-bundle-card img{position:absolute;inset:0;width:100%;height:100%;' +
      'object-fit:cover;transition:transform .7s ease;}' +
    '.jvb-bundle-card:hover img{transform:scale(1.05);}' +
    '.jvb-overlay{position:absolute;inset:0;' +
      'background:linear-gradient(to top,rgba(8,8,8,.95) 0%,rgba(8,8,8,.5) 55%,rgba(8,8,8,.2) 100%);}' +
    '.jvb-content{position:relative;z-index:2;padding:48px 48px 52px;margin:24px;' +
      'background:rgba(14,14,14,.55);border:1px solid rgba(201,169,110,.28);' +
      'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);}' +

    /* Card internals */
    '.jvb-badge{display:inline-block;border:1px solid #C9A96E;color:#C9A96E;' +
      'font-size:9px;letter-spacing:.2em;text-transform:uppercase;' +
      'padding:6px 14px;margin-bottom:20px;}' +
    '.jvb-name{font-family:"Cormorant Garamond",serif;font-size:clamp(38px,4vw,58px);' +
      'font-weight:300;color:#F0EDE8;line-height:1.0;margin-bottom:8px;}' +
    '.jvb-name em{font-style:italic;color:#E8D5B0;}' +
    '.jvb-desc{font-size:14px;line-height:1.75;color:rgba(240,237,232,.65);' +
      'max-width:380px;margin-bottom:28px;}' +
    '.jvb-price-row{display:flex;align-items:baseline;gap:12px;margin-bottom:28px;' +
      'padding-bottom:28px;border-bottom:1px solid rgba(201,169,110,.2);}' +
    '.jvb-from{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9A9590;}' +
    '.jvb-price{font-family:"Cormorant Garamond",serif;font-size:44px;' +
      'font-weight:300;color:#C9A96E;line-height:1;}' +
    '.jvb-price span{font-size:16px;font-family:"DM Sans",sans-serif;color:#9A9590;}' +
    '.jvb-features{list-style:none;padding:0;margin:0 0 36px;' +
      'display:flex;flex-direction:column;gap:10px;}' +
    '.jvb-features li{display:flex;align-items:flex-start;gap:12px;' +
      'font-size:13px;color:rgba(240,237,232,.7);line-height:1.4;}' +
    '.jvb-features li::before{content:"";width:14px;height:1px;background:#C9A96E;' +
      'flex-shrink:0;margin-top:8px;}' +
    '.jvb-cta{display:flex;gap:12px;flex-wrap:wrap;}' +

    /* Buttons */
    '.jvb-btn-wa{background:#25D366;color:#fff;padding:16px 36px;font-size:12px;' +
      'letter-spacing:.14em;text-transform:uppercase;font-family:"DM Sans",sans-serif;' +
      'font-weight:500;display:inline-flex;align-items:center;gap:10px;' +
      'transition:background .2s;text-decoration:none;border:none;cursor:pointer;}' +
    '.jvb-btn-wa:hover{background:#1FBA58;color:#fff;}' +
    '.jvb-btn-ghost{border:1px solid rgba(201,169,110,.5);color:#C9A96E;' +
      'padding:15px 36px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;' +
      'font-family:"DM Sans",sans-serif;display:inline-flex;align-items:center;gap:10px;' +
      'transition:background .2s,color .2s;text-decoration:none;cursor:pointer;}' +
    '.jvb-btn-ghost:hover{background:#C9A96E;color:#1A1A1A;}' +

    /* Mobile */
    '@media(max-width:900px){' +
      '.jvb-section-title{padding:56px 24px 0;}' +
      '.jvb-bundle-section{padding:16px 24px 72px;}' +
      '.jvb-bundle-grid{grid-template-columns:1fr;}' +
      '.jvb-bundle-card{min-height:480px;}' +
      '.jvb-content{padding:32px 28px 36px;margin:16px;}' +
      '.jvb-cta{flex-direction:column;}' +
      '.jvb-btn-wa,.jvb-btn-ghost{justify-content:center;}' +
    '}';

  /* ── CANONICAL HTML ───────────────────────────────────────────────── */
  var arrowSvg =
    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none">' +
      '<path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.2" ' +
        'stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var HTML =
    '<div class="jvb-wrap">' +

      /* ── Section title ── */
      '<div class="jvb-section-title">' +
        '<div class="jvb-eyebrow">Complete Villa Solutions</div>' +
        '<h2 class="jvb-h2">Full Villa<br><em>Bundles</em></h2>' +
        '<div class="jvb-divider"></div>' +
        '<p class="jvb-sub">Combine curtains, blinds and interiors into one seamless project. ' +
          'One team, one timeline, one point of contact — and significant savings versus booking separately.</p>' +
      '</div>' +

      /* ── Bundle grid ── */
      '<div class="jvb-bundle-section"><div class="jvb-bundle-grid">' +

        /* VILLA COMPLETE */
        '<div class="jvb-bundle-card">' +
          '<img src="/assets/images/aalo-lens-LqGf5UvHCZ8-unsplash.jpg" ' +
            'alt="Villa Complete Package" loading="lazy">' +
          '<div class="jvb-overlay"></div>' +
          '<div class="jvb-content">' +
            '<div class="jvb-badge">Bundle &amp; Save</div>' +
            '<div class="jvb-name">Villa<br><em>Complete</em></div>' +
            '<p class="jvb-desc">Our most popular full-home bundle. Premium curtains or blinds for every ' +
              'window, plus a complete interior refresh — panels, paint and wallpaper. Everything done in ' +
              'one visit sequence.</p>' +
            '<div class="jvb-price-row">' +
              '<span class="jvb-from">From</span>' +
              '<div class="jvb-price"><span>AED </span>22,000</div>' +
            '</div>' +
            '<ul class="jvb-features">' +
              '<li>Estate curtains/blinds package (all rooms)</li>' +
              '<li>Transformation interiors package</li>' +
              '<li>One dedicated project coordinator</li>' +
              '<li>Priority scheduling — completed within 3 weeks</li>' +
              '<li>Save up to AED 4,000 vs. booking separately</li>' +
            '</ul>' +
            '<div class="jvb-cta">' +
              '<a href="' + waUrl + '" class="jvb-btn-wa" target="_blank" rel="noopener noreferrer">' +
                'WhatsApp to Enquire ' + arrowSvg +
              '</a>' +
              '<a href="' + bookUrl + '" class="jvb-btn-ghost">Book Consultation</a>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* VILLA PRESTIGE */
        '<div class="jvb-bundle-card">' +
          '<img src="/assets/images/mina-rad-WvYzage2ApA-unsplash.jpg" ' +
            'alt="Villa Prestige Package" loading="lazy">' +
          '<div class="jvb-overlay"></div>' +
          '<div class="jvb-content">' +
            '<div class="jvb-badge">White Glove</div>' +
            '<div class="jvb-name">Villa<br><em>Prestige</em></div>' +
            '<p class="jvb-desc">The ultimate villa transformation. Our Signature motorized window package ' +
              'combined with the Masterwork interiors renovation — designed for those who accept nothing ' +
              'less than extraordinary.</p>' +
            '<div class="jvb-price-row">' +
              '<span class="jvb-from">From</span>' +
              '<div class="jvb-price"><span>AED </span>45,000</div>' +
            '</div>' +
            '<ul class="jvb-features">' +
              '<li>Signature motorized curtains/blinds (full villa)</li>' +
              '<li>Masterwork complete interiors renovation</li>' +
              '<li>Lead designer + project manager throughout</li>' +
              '<li>3D renders &amp; mood board sign-off</li>' +
              '<li>White-glove handover with 5-year warranty</li>' +
            '</ul>' +
            '<div class="jvb-cta">' +
              '<a href="' + waUrl + '" class="jvb-btn-wa" target="_blank" rel="noopener noreferrer">' +
                'WhatsApp to Enquire ' + arrowSvg +
              '</a>' +
              '<a href="' + bookUrl + '" class="jvb-btn-ghost">Book Consultation</a>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div></div>' + /* /jvb-bundle-grid /jvb-bundle-section */
    '</div>'; /* /jvb-wrap */

  /* ── MOUNT ────────────────────────────────────────────────────────── */
  function mount() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var root = document.getElementById('villa-bundles');
    if (root) {
      root.innerHTML = HTML;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
