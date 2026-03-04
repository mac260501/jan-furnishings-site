export const WHATSAPP_NUMBER = '971508806292';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const PAGE_KEY_BY_FILE = {
  'index.html': 'home',
  'home.html': 'home',
  'products.html': 'products',
  'our-products.html': 'products',
  'interiors.html': 'interiors',
  'packages.html': 'packages',
  'estimate.html': 'estimate',
  'get-estimate.html': 'estimate',
  'about.html': 'about',
  'about-us.html': 'about',
  'help.html': 'help',
  'book.html': 'booking',
  'book-a-free-visit.html': 'booking',
  'privacy-policy.html': 'legal',
  'terms-of-use.html': 'legal',
  'kevlar.html': 'kevlar',
  'kevlar-post.html': 'kevlar'
};

export const SITE_NAV_LINKS = [
  { key: 'home', href: 'index.html', label: 'Home' },
  { key: 'products', href: 'our-products.html', label: 'Our Products' },
  { key: 'interiors', href: 'interiors.html', label: 'Interiors' },
  { key: 'packages', href: 'packages.html', label: 'Packages' },
  { key: 'estimate', href: 'get-estimate.html', label: 'Get Estimate' },
  { key: 'about', href: 'about-us.html', label: 'About Us' },
  { key: 'help', href: 'help.html', label: 'Help' }
];

export const LUXURY_NAV_LINKS = [
  { key: 'home', href: 'index.html', label: 'Home' },
  { key: 'products', href: 'products.html', label: 'Our Products' },
  { key: 'interiors', href: 'interiors.html', label: 'Interiors' },
  { key: 'packages', href: 'packages.html', label: 'Packages' },
  { key: 'estimate', href: 'estimate.html', label: 'Get Estimate' },
  { key: 'about', href: 'about.html', label: 'About Us' },
  { key: 'help', href: 'help.html', label: 'Help' }
];

export const BOOK_LINK = {
  site: { href: 'book-a-free-visit.html', label: 'Book a Free Visit' },
  luxury: { href: 'book.html', label: 'Book a Free Visit' }
};

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/17wgL3YqqS/',
  instagram: 'https://www.instagram.com/janfurnishings',
  whatsapp: WHATSAPP_BASE_URL
};

export const CONTACT = {
  phoneLabel: '+971 50 880 6292',
  phoneHref: WHATSAPP_BASE_URL,
  emailLabel: 'janfurniture.ae@gmail.com',
  emailHref: 'mailto:janfurniture.ae@gmail.com',
  address: 'In5 Tech, King Salman Bin Abdulaziz Al Saud St, Dubai',
  companyNote: 'A product of Al Hadeeqa Contracting Co LLC'
};

export const FOOTER_COPY = 'Custom curtains, blinds, and luxury interior services across Dubai only. Free home visit, transparent pricing, same-week turnaround.';
