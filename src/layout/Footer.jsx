import { CONTACT, FOOTER_COPY, SOCIAL_LINKS, WHATSAPP_BASE_URL } from './constants.js';

const INTERIORS_BRAND_PAGES = new Set(['interiors']);
const BRAND_FAMILY = [
  {
    key: 'furnishings',
    name: 'Jan Furnishings',
    href: 'index.html',
    description: 'Custom curtains, blinds and premium window treatments across Dubai only.'
  },
  {
    key: 'interiors',
    name: 'Jan Interiors',
    href: 'interiors.html',
    description: 'Wall panels, wallpaper, painting, renovation and curated interior package solutions.'
  },
  {
    key: 'construction',
    name: 'Jan Construction',
    href: 'https://alhadeeqacontracting.com',
    description: 'Premium construction and bespoke contracting for luxury residential and commercial projects.',
    external: true
  }
];

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

function resolveCurrentBrand(pageKey) {
  return INTERIORS_BRAND_PAGES.has(pageKey) ? 'interiors' : 'furnishings';
}

function BrandIcon({ brandKey }) {
  if (brandKey === 'furnishings') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    );
  }

  if (brandKey === 'interiors') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="3" width="20" height="18" rx="1"></rect>
        <path d="M2 9h20M9 9v12"></path>
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="12 2 2 7 2 17 12 22 22 17 22 7"></polygon>
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <line x1="2" y1="7" x2="22" y2="7"></line>
      <line x1="2" y1="17" x2="22" y2="17"></line>
    </svg>
  );
}

function FooterLink({ href, label }) {
  return (
    <li>
      <a href={href}>{label}</a>
    </li>
  );
}

function SocialLink({ href, label, className }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={className || 'social-btn'}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="social-btn-icon" aria-hidden="true">{className?.includes('whatsapp') ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ) : label === 'Instagram' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      )}</span>
      <span className="sr-only">{label}</span>
    </a>
  );
}

export function SiteFooter({ year }) {
  return (
    <div className="container footer-grid">
      <div>
        <a className="brand" href="index.html">
          Jan Furnishings
          <small>Custom Curtains and Blinds</small>
        </a>
        <p style={{ marginTop: '10px' }}>
          Book once, coordinate smoothly, and get expert support from measurement to installation.
        </p>
      </div>

      <div>
        <h3>Explore</h3>
        <div className="footer-links">
          <a href="our-products.html">Our Products</a>
          <a href="interiors.html">Interiors</a>
          <a href="packages.html">Packages</a>
          <a href="get-estimate.html">Get Estimate</a>
          <a href="about-us.html">About Us</a>
          <a href="help.html">Help</a>
          <a href="book-a-free-visit.html">Book a Free Visit</a>
        </div>
      </div>

      <div>
        <h3>Contact</h3>
        <div className="footer-links">
          <a href={CONTACT.phoneHref} target="_blank" rel="noopener noreferrer">WhatsApp: {CONTACT.phoneLabel}</a>
          <a href={CONTACT.emailHref}>{CONTACT.emailLabel}</a>
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-of-use.html">Terms of Use</a>
        </div>
        <p style={{ marginTop: '8px', fontSize: '13px' }}>© {year} Jan Furnishings. All rights reserved.</p>
      </div>
    </div>
  );
}

export function LuxuryFooter({ year, variant, pageKey }) {
  const productBase = variant === 'site' ? 'our-products.html' : 'products.html';
  const estimatePage = variant === 'site' ? 'get-estimate.html' : 'estimate.html';
  const aboutPage = variant === 'site' ? 'about-us.html' : 'about.html';
  const currentBrand = resolveCurrentBrand(pageKey);
  const hasGoldTrim = currentBrand === 'interiors';

  return (
    <>
      <div className={classNames('footer-brands-family', hasGoldTrim && 'footer-brands-family-gold')}>
        <div className="footer-brands-header">
          <div className="footer-brands-label">Part of the Jan Group</div>
          <div className="footer-brands-sub">Three specialised brands. One standard of excellence.</div>
        </div>
        <div className="footer-brands-grid">
          {BRAND_FAMILY.map((brand) => {
            const isCurrent = currentBrand === brand.key;
            return (
              <a
                key={brand.key}
                href={brand.href}
                className={classNames('footer-brand-card', isCurrent && 'current-brand')}
                {...(brand.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {isCurrent ? <div className="footer-brand-current-badge">You are here</div> : null}
                <div className="footer-brand-icon">
                  <BrandIcon brandKey={brand.key} />
                </div>
                <div className="footer-brand-name">{brand.name}</div>
                <div className="footer-brand-desc">{brand.description}</div>
                <div className="footer-brand-link">
                  Visit site
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="f-logo">{hasGoldTrim ? 'Jan Interiors' : 'Jan Furnishings'}</div>
            <p>{FOOTER_COPY}</p>

            <div className="footer-social">
              <SocialLink href={SOCIAL_LINKS.facebook} label="Facebook" />
              <SocialLink href={SOCIAL_LINKS.instagram} label="Instagram" />
              <SocialLink href={SOCIAL_LINKS.whatsapp} label="WhatsApp" className="social-btn social-btn-whatsapp" />
            </div>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <FooterLink href={`${productBase}#curtains`} label="Curtains & Drapes" />
              <FooterLink href={`${productBase}#blinds`} label="Blinds & Shades" />
              <FooterLink href={`${productBase}#motorized`} label="Motorized" />
              <FooterLink href={productBase} label="All Products" />
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <FooterLink href="index.html" label="Home" />
              <FooterLink href={productBase} label="Our Products" />
              <FooterLink href="interiors.html" label="Interiors" />
              <FooterLink href="packages.html" label="Packages" />
              <FooterLink href={estimatePage} label="Get Estimate" />
              <FooterLink href={aboutPage} label="About Us" />
              <FooterLink href="help.html" label="Help & FAQs" />
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact">
              <p><a href={CONTACT.phoneHref} target="_blank" rel="noopener noreferrer">{CONTACT.phoneLabel}</a></p>
              <p><a href={CONTACT.emailHref}>{CONTACT.emailLabel}</a></p>
              <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{CONTACT.address}</p>
              <p style={{ marginTop: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{CONTACT.companyNote}</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Jan Furnishings. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms-of-use.html">Terms of Use</a>
          </div>
        </div>
      </div>
    </>
  );
}

export function whatsappFallbackHref() {
  return WHATSAPP_BASE_URL;
}
