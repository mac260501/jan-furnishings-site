const WHATSAPP_NUMBER = '971508806292';

const ESTIMATE_RATES = {
  sheer_curtains: 89,
  blackout_curtains: 138,
  sheer_blackout_curtains: 207,
  blackout_roller_blinds: 131,
  premium_roller_blinds: 187,
  zebra_blinds: 368,
  wooden_blinds: 272,
  motorized_curtains: 348,
  motorized_blinds: 464
};

function formatAed(amount) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0
  }).format(amount);
}

function openWhatsapp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function setupMenu() {
  const button = document.querySelector('.menu-toggle');
  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

function markActiveNav() {
  const page = document.body.getAttribute('data-page');
  if (!page) return;

  document.querySelectorAll(`.nav a[data-page="${page}"]`).forEach((node) => {
    node.classList.add('active');
  });
}

function setDateMinimums() {
  const today = new Date();
  const iso = today.toISOString().slice(0, 10);

  document.querySelectorAll('input[type="date"]').forEach((field) => {
    field.min = iso;
  });
}

function setupFaq() {
  document.querySelectorAll('.faq-button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const icon = button.querySelector('span');
      const isOpen = item.classList.contains('open');

      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = isOpen ? '0px' : `${answer.scrollHeight}px`;
      button.setAttribute('aria-expanded', String(!isOpen));
      if (icon) icon.textContent = isOpen ? '+' : '-';
    });
  });
}

function parseEstimatorInput(form) {
  const width = Number(form.querySelector('[name="width_cm"]').value || 0);
  const height = Number(form.querySelector('[name="height_cm"]').value || 0);
  const product = form.querySelector('[name="product"]').value;
  const roomCount = Number(form.querySelector('[name="rooms"]').value || 1);
  const motorized = form.querySelector('[name="motorized"]')?.checked;
  const express = form.querySelector('[name="express_delivery"]')?.checked;

  const area = (width / 100) * (height / 100);
  const safeArea = Number.isFinite(area) ? Math.max(area, 0) : 0;
  const rate = ESTIMATE_RATES[product] || 0;
  let subtotal = safeArea * rate * roomCount;

  if (motorized && !product.includes('motorized')) subtotal *= 1.35;
  if (express) subtotal *= 1.1;

  return {
    width,
    height,
    product,
    roomCount,
    area: safeArea,
    total: Math.round(subtotal)
  };
}

function setupEstimator() {
  const form = document.getElementById('estimateForm');
  if (!form) return;

  const totalEl = document.getElementById('estimateTotal');
  const detailsEl = document.getElementById('estimateDetails');
  const hiddenEl = form.querySelector('[name="estimated_total"]');
  const successEl = document.getElementById('estimateSuccess');

  function render() {
    const result = parseEstimatorInput(form);

    if (result.total > 0) {
      totalEl.textContent = formatAed(result.total);
      detailsEl.textContent = `Approx. ${result.area.toFixed(2)} sqm per room x ${result.roomCount} room(s). Final quote is confirmed after measurement.`;
      hiddenEl.value = String(result.total);
    } else {
      totalEl.textContent = 'AED 0';
      detailsEl.textContent = 'Enter dimensions and choose a product to see your estimate.';
      hiddenEl.value = '';
    }
  }

  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('input', render);
    field.addEventListener('change', render);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const result = parseEstimatorInput(form);

    const message = [
      'Hello Jan Furnishings, I would like an estimate.',
      '',
      `Name: ${data.get('full_name') || '-'}`,
      `Phone: ${data.get('phone') || '-'}`,
      `Location: ${data.get('location') || '-'}`,
      `Product: ${form.querySelector('[name="product"]').selectedOptions[0].text}`,
      `Width x Height (cm): ${data.get('width_cm')} x ${data.get('height_cm')}`,
      `Rooms: ${data.get('rooms') || '1'}`,
      `Estimated total: ${result.total > 0 ? formatAed(result.total) : 'N/A'}`,
      `Notes: ${data.get('notes') || 'None'}`,
      '',
      'Please confirm the final quote after a measurement visit.'
    ].join('\n');

    openWhatsapp(message);
    if (successEl) successEl.style.display = 'block';
  });

  render();
}

function bookingMessage(intent, form, data) {
  const labels = {
    full_name: 'Name',
    first_name: 'First name',
    last_name: 'Last name',
    phone: 'Phone',
    email: 'Email',
    city: 'City',
    area: 'Area',
    address: 'Address',
    windows: 'Windows',
    property_type: 'Property type',
    service_interest: 'Service',
    preferred_date: 'Preferred date',
    backup_date: 'Second date option',
    preferred_time: 'Preferred time',
    notes: 'Notes'
  };

  const header = {
    booking: 'Hello Jan Furnishings, I would like to request a free visit.',
    contact: 'Hello Jan Furnishings, I have a question.',
    default: 'Hello Jan Furnishings, I would like to get in touch.'
  };

  const lines = [header[intent] || header.default, ''];

  for (const [key, value] of data.entries()) {
    if (!value || key.startsWith('_')) continue;
    lines.push(`${labels[key] || key}: ${value}`);
  }

  lines.push('');
  lines.push('Please confirm the final appointment time on WhatsApp.');

  return lines.join('\n');
}

function setupLeadForms() {
  document.querySelectorAll('.js-whatsapp-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const intent = form.getAttribute('data-intent') || 'default';
      const message = bookingMessage(intent, form, data);
      openWhatsapp(message);

      const successId = form.getAttribute('data-success-id');
      if (successId) {
        const success = document.getElementById(successId);
        if (success) success.style.display = 'block';
      }
    });
  });
}

function setYear() {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  markActiveNav();
  setDateMinimums();
  setupFaq();
  setupEstimator();
  setupLeadForms();
  setYear();
});
