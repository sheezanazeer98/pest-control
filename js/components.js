/**
 * Shared UI Components — Generates header, footer, and reusable sections.
 * Driven by SITE_CONFIG for full reusability.
 */
(function () {
  const C = window.SITE_CONFIG;

  const ICONS = {
    phone: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
    email: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    menu: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
    bug: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0M12 9V6m0 0C10.343 6 9 4.657 9 3m3 3c1.657 0 3-1.657 3-3M5.636 9.636L3.515 7.515M18.364 9.636l2.121-2.121M5.636 14.364L3.515 16.485M18.364 14.364l2.121 2.121M9 9l-1.5-1.5M15 9l1.5-1.5M9 15l-1.5 1.5M15 15l1.5 1.5"/></svg>',
    termite: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
    rodent: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
    bedbug: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>',
    mosquito: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0022 5.5V3.935"/></svg>',
    wildlife: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
    shield: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    clock: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    star: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
    dollar: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    mapPin: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    chevronRight: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>',
    facebook: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    google: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>',
    starFilled: '<svg class="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>',
    leaf: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
  };

  window.getIcon = function (name) {
    return ICONS[name] || '';
  };

  /* ---- Top Bar ---- */
  function renderTopBar() {
    return `
      <div class="bg-primary-950 text-primary-100 text-sm hidden sm:block">
        <div class="container-site flex items-center justify-between py-2">
          <div class="flex items-center gap-6">
            <a href="tel:${C.phoneRaw}" class="flex items-center gap-1.5 hover:text-white transition-colors">
              ${ICONS.phone} ${C.phone}
            </a>
            <a href="mailto:${C.email}" class="flex items-center gap-1.5 hover:text-white transition-colors">
              ${ICONS.email} ${C.email}
            </a>
          </div>
          <div class="flex items-center gap-1.5">
            ${ICONS.mapPin}
            <span>Serving ${C.address}</span>
          </div>
        </div>
      </div>`;
  }

  /* ---- Header / Nav ---- */
  window.renderHeader = function (activePage) {
    const el = document.getElementById('site-header');
    if (!el) return;

    const navLinks = C.navigation.map(item => `
      <a href="${item.url}"
         class="px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${activePage === item.id
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}">
        ${item.label}
      </a>`).join('');

    const mobileLinks = C.navigation.map(item => `
      <a href="${item.url}"
         class="block px-4 py-3 text-base font-medium border-b border-gray-100 transition-colors
                ${activePage === item.id
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}">
        ${item.label}
      </a>`).join('');

    el.innerHTML = `
      ${renderTopBar()}
      <nav class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div class="container-site">
          <div class="flex items-center justify-between h-16 lg:h-20">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-2.5 group" aria-label="${C.companyName} — Home">
              <svg class="w-10 h-10 lg:w-11 lg:h-11 transition-transform group-hover:scale-105 shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 3L7 9v12c0 10.5 7.5 20.5 17 23 9.5-2.5 17-12.5 17-23V9L24 3z" fill="url(#navShieldGrad)" stroke="#b91c1c" stroke-width="1.5"/>
                <path d="M24 14c-3 3-6 5-6 10 0 4 3 7 6 7s6-3 6-7c0-5-3-7-6-10z" fill="#ffffff" opacity="0.95"/>
                <path d="M24 16v13" stroke="#991b1b" stroke-width="1.2" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="navShieldGrad" x1="7" y1="3" x2="41" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#ef4444"/>
                    <stop offset="1" stop-color="#7f1d1d"/>
                  </linearGradient>
                </defs>
              </svg>
              <span class="flex flex-col leading-none">
                <span class="text-xl lg:text-2xl font-extrabold tracking-tight text-gray-900">Eco<span class="text-primary-600">Shield</span></span>
                <span class="text-[9px] lg:text-[10px] font-semibold text-gray-500 tracking-[0.22em] uppercase mt-1">Pest Control</span>
              </span>
            </a>

            <!-- Desktop Nav -->
            <div class="hidden lg:flex items-center gap-1">
              ${navLinks}
            </div>

            <!-- CTA + Mobile Toggle -->
            <div class="flex items-center gap-3">
              <a href="tel:${C.phoneRaw}" class="btn-accent hidden sm:inline-flex text-sm !px-4 !py-2">
                ${ICONS.phone} <span class="ml-1.5">Call Now</span>
              </a>
              <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
                <span id="menu-icon-open">${ICONS.menu}</span>
                <span id="menu-icon-close" class="hidden">${ICONS.close}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Nav -->
        <div id="mobile-menu" class="hidden lg:hidden border-t border-gray-100 bg-white">
          ${mobileLinks}
          <div class="p-4">
            <a href="tel:${C.phoneRaw}" class="btn-accent w-full text-center">
              ${ICONS.phone} <span class="ml-1.5">Call ${C.phone}</span>
            </a>
          </div>
        </div>
      </nav>`;
  };

  /* ---- Footer ---- */
  window.renderFooter = function () {
    const el = document.getElementById('site-footer');
    if (!el) return;

    const quickLinks = C.navigation.map(item =>
      `<li><a href="${item.url}" class="text-gray-400 hover:text-white transition-colors">${item.label}</a></li>`
    ).join('');

    const serviceLinks = C.services.slice(0, 6).map(s =>
      `<li><a href="/services#${s.id}" class="text-gray-400 hover:text-white transition-colors">${s.title}</a></li>`
    ).join('');

    const topAreas = C.serviceAreas.slice(0, 8).map(area =>
      `<li class="text-gray-400">${area}</li>`
    ).join('');

    el.innerHTML = `
      <!-- CTA Banner -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800">
        <div class="container-site py-12 sm:py-16 text-center">
          <h2 class="heading-lg text-white mb-4">Ready to Reclaim Your Home?</h2>
          <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Contact us today for a free inspection. Our certified pest control experts are ready to help with any pest problem, big or small.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:${C.phoneRaw}" class="btn-accent text-lg !px-8 !py-4">
              ${ICONS.phone} <span class="ml-2">Call ${C.phone}</span>
            </a>
            <a href="/contact" class="btn-outline !border-white !text-white hover:!bg-white hover:!text-primary-700 text-lg !px-8 !py-4">
              Request a Free Inspection
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white">
        <div class="container-site py-12 lg:py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <!-- Company Info -->
            <div>
              <a href="/" class="inline-flex items-center gap-2.5 mb-4 group">
                <svg class="w-10 h-10 transition-transform group-hover:scale-105" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 3L7 9v12c0 10.5 7.5 20.5 17 23 9.5-2.5 17-12.5 17-23V9L24 3z" fill="url(#footerShieldGrad)" stroke="#ef4444" stroke-width="1.5"/>
                  <path d="M24 14c-3 3-6 5-6 10 0 4 3 7 6 7s6-3 6-7c0-5-3-7-6-10z" fill="#ffffff" opacity="0.95"/>
                  <path d="M24 16v13" stroke="#991b1b" stroke-width="1.2" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="footerShieldGrad" x1="7" y1="3" x2="41" y2="44" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stop-color="#dc2626"/>
                      <stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span class="text-xl font-extrabold text-white tracking-tight leading-none">Eco<span class="text-primary-400">Shield</span><span class="block text-[10px] font-semibold text-gray-400 tracking-[0.25em] uppercase mt-0.5">Pest Control</span></span>
              </a>
              <p class="text-gray-400 text-sm mb-4">${C.description}</p>
              <div class="flex gap-3">
                <a href="${C.social.facebook}" class="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">${ICONS.facebook}</a>
                <a href="${C.social.instagram}" class="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">${ICONS.instagram}</a>
                <a href="${C.social.google}" class="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Google">${ICONS.google}</a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h3>
              <ul class="space-y-2.5 text-sm">${quickLinks}</ul>
            </div>

            <!-- Services -->
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Our Services</h3>
              <ul class="space-y-2.5 text-sm">${serviceLinks}</ul>
            </div>

            <!-- Contact Info -->
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact Us</h3>
              <ul class="space-y-3 text-sm">
                <li>
                  <a href="tel:${C.phoneRaw}" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    ${ICONS.phone} ${C.phone}
                  </a>
                </li>
                <li>
                  <a href="mailto:${C.email}" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    ${ICONS.email} ${C.email}
                  </a>
                </li>
                <li class="flex items-start gap-2 text-gray-400">
                  ${ICONS.mapPin} <span>${C.address}</span>
                </li>
              </ul>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mt-6 mb-3">Service Areas</h3>
              <ul class="grid grid-cols-2 gap-1 text-sm">${topAreas}</ul>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800">
          <div class="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; ${new Date().getFullYear()} ${C.companyName}. All rights reserved.</p>
            <p>Protecting homes across Northeastern Pennsylvania.</p>
          </div>
        </div>
      </footer>`;
  };

  /* ---- Star Rating Helper ---- */
  window.renderStars = function (count) {
    return Array(count).fill(ICONS.starFilled).join('');
  };
})();
