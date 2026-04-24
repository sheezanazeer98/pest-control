/**
 * EcoShield Pest Control — Single Page Application
 * Client-side router, page initialization, shared behaviors.
 */
(function () {
  'use strict';

  var C = window.SITE_CONFIG;
  var appEl = document.getElementById('app');
  var currentRoute = null;
  var currentParams = {};

  // ============================= CACHES =============================
  var postsCache = null;
  var postContentCache = {};

  // ============================= ROUTES =============================
  var ROUTES = [
    { id: 'home',          path: '/',              nav: 'home',          title: 'EcoShield Pest Control | Eco-Friendly Pest Control in NEPA',                                              desc: 'EcoShield Pest Control — Professional eco-friendly pest control company serving Northeastern Pennsylvania. Residential, commercial, termite, rodent, bed bug, mosquito, and wildlife services. Call (570) 604-4680.' },
    { id: 'about',         path: '/about',         nav: 'about',         title: 'About Us | EcoShield Pest Control',                                                                      desc: 'Learn about EcoShield Pest Control — a licensed and certified pest control company proudly serving Northeastern Pennsylvania with effective, eco-friendly solutions.' },
    { id: 'services',      path: '/services',      nav: 'services',      title: 'Pest Control Services | EcoShield Pest Control',                                                         desc: 'Professional eco-friendly pest control services in NEPA — general pest, termite, rodent, bed bug, mosquito & tick, and wildlife removal. Call (570) 604-4680.' },
    { id: 'service-areas', path: '/service-areas',  nav: 'service-areas', title: 'Service Areas | EcoShield Pest Control',                                                                 desc: 'EcoShield Pest Control proudly serves Scranton, Wilkes-Barre, Hazleton, Stroudsburg, Pocono Mountains, and all of Northeastern Pennsylvania. Call (570) 604-4680.' },
    { id: 'contact',       path: '/contact',       nav: 'contact',       title: 'Contact Us | EcoShield Pest Control',                                                                    desc: 'Contact EcoShield Pest Control for a free pest inspection. Call (570) 604-4680 or fill out our online form. Serving Scranton, Wilkes-Barre, and all of Northeastern PA.' },
    { id: 'blog',          path: '/blog',          nav: 'blog',          title: 'Blog | EcoShield Pest Control',                                                                          desc: 'Pest control tips, prevention guides, and industry news from EcoShield Pest Control. Stay informed about protecting your home from pests.' },
    { id: 'blog-post',     path: '/blog/:slug',    nav: 'blog',          title: 'Blog Post | EcoShield Pest Control',                                                                     desc: 'Read the latest pest control tips and news from EcoShield Pest Control.' },
  ];

  // ============================= UTILITIES =============================
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function normalizeImageSrc(src) {
    if (!src || typeof src !== 'string') return '';
    src = src.trim();
    if (!src || src === '""' || src === "''") return '';
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('data:')) return src;
    return '/' + src;
  }

  function normalizePath(path) {
    path = path.split('?')[0].split('#')[0];
    path = path.replace(/\.html$/, '');
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    if (path === '' || path === '/index') path = '/';
    return path;
  }

  function getHash(url) {
    var idx = url.indexOf('#');
    return idx !== -1 ? url.substring(idx) : '';
  }

  function matchRoute(path) {
    var normalized = normalizePath(path);

    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].path === normalized) return { route: ROUTES[i], params: {} };
    }

    var blogMatch = normalized.match(/^\/blog\/([a-z0-9][a-z0-9-]*)$/);
    if (blogMatch) {
      return { route: ROUTES[ROUTES.length - 1], params: { slug: blogMatch[1] } };
    }

    return null;
  }

  // ============================= SEO =============================
  function updateMeta(route, params) {
    document.title = route.title;

    var setMeta = function (sel, attr, val) {
      var el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };

    var canonical = C.seo.siteUrl + (route.id === 'blog-post' ? '/blog/' + params.slug : route.path);
    setMeta('meta[name="description"]', 'content', route.desc);
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', route.title);
    setMeta('meta[property="og:description"]', 'content', route.desc);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', C.seo.siteUrl + C.seo.ogImage);
    setMeta('meta[name="twitter:title"]', 'content', route.title);
    setMeta('meta[name="twitter:description"]', 'content', route.desc);
    setMeta('meta[name="twitter:image"]', 'content', C.seo.siteUrl + C.seo.ogImage);
  }

  // ============================= NAVIGATION =============================
  function navigate(url, push) {
    var hash = getHash(url);
    var path = url.split('#')[0];
    var match = matchRoute(path);

    if (!match) {
      match = { route: ROUTES[0], params: {} };
      path = '/';
    }

    var route = match.route;
    var params = match.params;
    var isSamePage = currentRoute && currentRoute.id === route.id &&
      JSON.stringify(currentParams) === JSON.stringify(params);

    if (!isSamePage) {
      var tmpl = document.getElementById('page-' + route.id);
      if (tmpl) {
        appEl.innerHTML = '';
        appEl.appendChild(tmpl.content.cloneNode(true));
        var firstChild = appEl.firstElementChild;
        if (firstChild) firstChild.classList.add('page-enter');
      }

      renderHeader(route.nav);
      updateMeta(route, params);

      currentRoute = route;
      currentParams = params;

      var initFn = PAGE_INITS[route.id];
      if (initFn) initFn(params);

      refreshAnimations();

      if (!hash) window.scrollTo(0, 0);
    }

    if (push !== false) {
      var cleanPath = route.id === 'blog-post' ? '/blog/' + params.slug : route.path;
      history.pushState({ path: cleanPath + hash }, '', cleanPath + hash);
    }

    if (hash) {
      setTimeout(function () {
        var target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  // ============================= LINK INTERCEPTION =============================
  function shouldIntercept(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.target === '_blank') return false;
    if (anchor.hasAttribute('download')) return false;

    var href = anchor.getAttribute('href');
    if (!href || href.startsWith('#')) return false;
    if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;
    if (href.startsWith('http') && !href.startsWith(location.origin)) return false;
    if (href.startsWith('/admin')) return false;

    return true;
  }

  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a');
    if (!anchor) return;

    var href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (!shouldIntercept(anchor)) return;

    e.preventDefault();
    var url = anchor.getAttribute('href');
    navigate(url, true);
  });

  window.addEventListener('popstate', function () {
    navigate(location.pathname + location.hash, false);
  });

  // ============================= PAGE INITIALIZERS =============================
  var PAGE_INITS = {};

  // ---------- HOME ----------
  PAGE_INITS.home = function () {
    var badgesGrid = document.getElementById('trust-badges');
    if (badgesGrid) {
      badgesGrid.innerHTML = C.trustBadges.map(function (b) {
        return '<div class="group flex items-center gap-4 py-7 px-6 hover:bg-gray-50/80 transition-colors cursor-default">' +
          '<div class="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">' + getIcon(b.icon) + '</div>' +
          '<div><h3 class="font-bold text-gray-900 text-sm">' + b.title + '</h3><p class="text-gray-500 text-xs mt-0.5 leading-relaxed">' + b.text + '</p></div></div>';
      }).join('');
    }

    var servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
      servicesGrid.innerHTML = C.services.map(function (s) {
        return '<div class="card p-6 group hover:border-primary-200 border border-transparent transition-all">' +
          '<div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors mb-4">' + getIcon(s.icon) + '</div>' +
          '<h3 class="text-lg font-bold text-gray-900 mb-2">' + s.title + '</h3>' +
          '<p class="text-gray-600 text-sm mb-4">' + s.description.slice(0, 120) + '...</p>' +
          '<a href="/services#' + s.id + '" class="text-primary-600 text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">Learn More ' + getIcon('chevronRight') + '</a></div>';
      }).join('');
    }

    var testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = C.testimonials.map(function (t) {
        return '<div class="bg-gray-50 rounded-xl p-6 border border-gray-100">' +
          '<div class="flex gap-1 mb-3">' + renderStars(t.rating) + '</div>' +
          '<p class="text-gray-700 mb-4">"' + t.text + '"</p>' +
          '<div class="flex items-center gap-3">' +
          '<div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">' + t.name.charAt(0) + '</div>' +
          '<div><p class="font-semibold text-gray-900 text-sm">' + t.name + '</p><p class="text-gray-500 text-xs">' + t.location + '</p></div></div></div>';
      }).join('');
    }

    var areasPreview = document.getElementById('areas-preview');
    if (areasPreview) {
      areasPreview.innerHTML = C.serviceAreas.slice(0, 16).map(function (area) {
        return '<span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-colors">' + area + '</span>';
      }).join('');
    }

    var recentPosts = document.getElementById('recent-posts');
    if (recentPosts) {
      fetchPosts().then(function (posts) {
        var recent = posts.slice(0, 3);
        if (recent.length === 0) {
          recentPosts.innerHTML = '<p class="text-gray-500 text-center col-span-3">Blog posts coming soon!</p>';
          return;
        }
        recentPosts.innerHTML = recent.map(function (p) {
          var date = new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          var imgSrc = normalizeImageSrc(p.image) || '/images/blog-thumbnail.jpg';
          var img = '<div class="bg-gray-50"><img src="' + imgSrc + '" alt="" class="w-full h-48 object-cover" loading="lazy" onerror="this.src=\'/images/blog-thumbnail.jpg\'"></div>';
          return '<article class="card group"><a href="/blog/' + p.slug + '">' + img +
            '<div class="p-5"><time class="text-xs text-primary-600 font-medium">' + date + '</time>' +
            '<h3 class="font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">' + p.title + '</h3>' +
            '<p class="text-gray-600 text-sm line-clamp-2">' + (p.excerpt || '') + '</p></div></a></article>';
        }).join('');
      }).catch(function () {
        recentPosts.innerHTML = '<p class="text-gray-500 text-center col-span-3">Blog posts coming soon!</p>';
      });
    }
  };

  // ---------- ABOUT ----------
  PAGE_INITS.about = function () {};

  // ---------- SERVICES ----------
  PAGE_INITS.services = function () {
    var container = document.getElementById('services-detail');
    if (!container) return;

    container.innerHTML = C.services.map(function (s, i) {
      var imageRight = i % 2 === 0;
      var features = s.features.map(function (f) {
        return '<li class="flex items-center gap-3">' +
          '<div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">' +
          '<svg class="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></div>' +
          '<span class="text-gray-700">' + f + '</span></li>';
      }).join('');

      var serviceImages = [
        'service-general-pest.jpg',
        'service-termite.jpg',
        'service-rodent.jpg',
        'service-bed-bug.jpg',
        'service-mosquito.jpg',
        'service-wildlife.jpg'
      ];
      var imgSrc = serviceImages[i] || 'service-general-pest.jpg';

      var textOrderLg = imageRight ? 'lg:order-1' : 'lg:order-2';
      var imgOrderLg = imageRight ? 'lg:order-2' : 'lg:order-1';

      var textBlock =
        '<div class="order-1 ' + textOrderLg + '">' +
        '<div class="inline-flex items-center gap-2 bg-primary-50 text-primary-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">' +
        '<span class="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">' + (i + 1) + '</span>' +
        s.title + '</div>' +
        '<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">' + s.title + '</h2>' +
        '<p class="text-gray-600 text-lg leading-relaxed mb-6">' + s.description + '</p>' +
        '<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">' + features + '</ul>' +
        '<div class="flex flex-col sm:flex-row gap-3">' +
        '<a href="/contact" class="btn-primary">Request This Service</a>' +
        '<a href="tel:' + C.phoneRaw + '" class="btn-outline">Call ' + C.phone + '</a>' +
        '</div></div>';

      var imageBlock =
        '<div class="order-2 ' + imgOrderLg + '">' +
        '<div class="rounded-2xl overflow-hidden shadow-lg relative group">' +
        '<img src="/images/' + imgSrc + '" alt="' + s.title + '" class="w-full h-64 sm:h-80 lg:h-[28rem] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent"></div>' +
        '<div class="absolute bottom-4 left-4 right-4">' +
        '<div class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">' +
        getIcon(s.icon).replace('w-8 h-8', 'w-5 h-5') + ' ' + s.title + '</div>' +
        '</div></div></div>';

      var bgClass = i % 2 === 0 ? 'bg-white' : 'bg-gray-50';

      return '<div id="' + s.id + '" class="scroll-mt-24 ' + bgClass + ' -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 lg:py-16 rounded-3xl" data-animate>' +
        '<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">' +
        textBlock + imageBlock +
        '</div></div>';
    }).join('');
  };

  // ---------- SERVICE AREAS ----------
  PAGE_INITS['service-areas'] = function () {
    var areasGrid = document.getElementById('areas-grid');
    if (areasGrid) {
      areasGrid.innerHTML = C.serviceAreas.map(function (area) {
        return '<div class="bg-gray-50 rounded-xl p-4 text-center hover:bg-primary-50 hover:border-primary-200 border border-gray-100 transition-colors group">' +
          '<div class="flex items-center justify-center gap-2">' +
          '<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' +
          '<span class="font-medium text-gray-700 group-hover:text-primary-700">' + area + '</span></div></div>';
      }).join('');
    }

    var mapContainer = document.getElementById('service-areas-map');
    if (mapContainer) {
      mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384828.65!2d-75.85!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c4d2f9f9fafcf3%3A0x93eb0c3c1e22b4dc!2sNortheastern%20Pennsylvania!5e0!3m2!1sen!2sus!4v1" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="EcoShield Pest Control service area map"></iframe>';
    }

    var servicesMini = document.getElementById('services-mini');
    if (servicesMini) {
      servicesMini.innerHTML = C.services.map(function (s) {
        return '<a href="/services#' + s.id + '" class="bg-gray-50 rounded-xl p-4 text-center hover:bg-primary-50 border border-gray-100 hover:border-primary-200 transition-colors group">' +
          '<div class="text-primary-600 flex justify-center mb-2">' + getIcon(s.icon) + '</div>' +
          '<span class="text-sm font-medium text-gray-700 group-hover:text-primary-700">' + s.title + '</span></a>';
      }).join('');
    }
  };

  // ---------- CONTACT ----------
  PAGE_INITS.contact = function () {
    var select = document.getElementById('service');
    if (select) {
      C.services.forEach(function (s) {
        var opt = document.createElement('option');
        opt.value = s.title;
        opt.textContent = s.title;
        select.appendChild(opt);
      });
    }

    var mapContainer = document.getElementById('contact-map');
    if (mapContainer) {
      mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384828.65!2d-75.85!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c4d2f9f9fafcf3%3A0x93eb0c3c1e22b4dc!2sNortheastern%20Pennsylvania!5e0!3m2!1sen!2sus!4v1" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="EcoShield Pest Control service area map"></iframe>';
    }

    initContactForm();
  };

  // ---------- BLOG LISTING ----------
  var blogCurrentPage = 1;
  var POSTS_PER_PAGE = 9;

  PAGE_INITS.blog = function () {
    blogCurrentPage = 1;
    var grid = document.getElementById('blog-grid');
    if (!grid) return;

    fetchPosts().then(function (posts) {
      var loading = document.getElementById('blog-loading');
      var empty = document.getElementById('blog-empty');
      if (loading) loading.classList.add('hidden');

      if (posts.length === 0) {
        if (empty) empty.classList.remove('hidden');
        return;
      }
      renderBlogPage(1);
    }).catch(function () {
      var loading = document.getElementById('blog-loading');
      var empty = document.getElementById('blog-empty');
      if (loading) loading.classList.add('hidden');
      if (empty) {
        empty.classList.remove('hidden');
        empty.innerHTML = '<p class="text-gray-500 text-lg">Blog posts coming soon. Check back later!</p>';
      }
    });
  };

  function renderBlogPage(page) {
    blogCurrentPage = page;
    var grid = document.getElementById('blog-grid');
    if (!grid || !postsCache) return;

    var start = (page - 1) * POSTS_PER_PAGE;
    var pagePosts = postsCache.slice(start, start + POSTS_PER_PAGE);

    grid.innerHTML = pagePosts.map(function (post) {
      var date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var postImgSrc = normalizeImageSrc(post.image) || '/images/blog-thumbnail.jpg';
      var image = '<div class="bg-gray-50"><img src="' + postImgSrc + '" alt="' + escapeHtml(post.title) + '" class="w-full h-48 object-cover" loading="lazy" onerror="this.src=\'/images/blog-thumbnail.jpg\'"></div>';

      return '<article class="card group" data-animate><a href="/blog/' + post.slug + '">' + image +
        '<div class="p-6"><time class="text-sm text-primary-600 font-medium">' + date + '</time>' +
        '<h3 class="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-primary-600 transition-colors">' + escapeHtml(post.title) + '</h3>' +
        '<p class="text-gray-600 text-sm line-clamp-3">' + escapeHtml(post.excerpt || '') + '</p>' +
        '<span class="inline-flex items-center text-primary-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">Read More ' + getIcon('chevronRight') + '</span></div></a></article>';
    }).join('');

    renderBlogPagination();
  }

  function renderBlogPagination() {
    var container = document.getElementById('blog-pagination');
    if (!container || !postsCache) return;

    var totalPages = Math.ceil(postsCache.length / POSTS_PER_PAGE);
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    var html = '<div class="flex items-center justify-center gap-2">';
    if (blogCurrentPage > 1) {
      html += '<button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors" data-blog-page="' + (blogCurrentPage - 1) + '">&larr; Previous</button>';
    }
    for (var i = 1; i <= totalPages; i++) {
      html += '<button class="w-10 h-10 rounded-lg font-medium transition-colors ' +
        (i === blogCurrentPage ? 'bg-primary-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50') +
        '" data-blog-page="' + i + '">' + i + '</button>';
    }
    if (blogCurrentPage < totalPages) {
      html += '<button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors" data-blog-page="' + (blogCurrentPage + 1) + '">Next &rarr;</button>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-blog-page]');
    if (!btn) return;
    var page = parseInt(btn.getAttribute('data-blog-page'), 10);
    renderBlogPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- BLOG POST ----------
  PAGE_INITS['blog-post'] = function (params) {
    var slug = params.slug;
    if (!slug) { showPostNotFound(); return; }

    Promise.all([
      loadMarked(),
      loadPostContent(slug),
      fetchPosts()
    ]).then(function (results) {
      var text = results[1];
      var posts = results[2];
      var parsed = parseFrontMatter(text);

      var postMeta = null;
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].slug === slug) { postMeta = posts[i]; break; }
      }

      if (postMeta && postMeta.image && !parsed.data.image) {
        parsed.data.image = postMeta.image;
      }

      renderBlogPost(parsed.data, parsed.content, slug);
    }).catch(function () {
      showPostNotFound();
    });
  };

  function loadPostContent(slug) {
    if (postContentCache[slug]) return Promise.resolve(postContentCache[slug]);

    return fetch('/content/blog/' + slug + '.md')
      .then(function (res) {
        if (!res.ok) throw new Error('Post not found');
        return res.text();
      })
      .then(function (text) {
        postContentCache[slug] = text;
        return text;
      });
  }

  function parseFrontMatter(text) {
    var match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: text };

    var data = {};
    match[1].split('\n').forEach(function (line) {
      if (line.match(/^\s*-\s/)) return;
      var colonIdx = line.indexOf(':');
      if (colonIdx === -1) return;
      var key = line.slice(0, colonIdx).trim();
      if (!key) return;
      var value = line.slice(colonIdx + 1).trim();
      value = value.replace(/^["'](.*)["']$/, '$1');
      if (key === 'image' || key === 'thumbnail') {
        if (!value || value === '""' || value === "''") value = '';
      }
      data[key] = value;
    });

    return { data: data, content: match[2] };
  }

  function renderBlogPost(meta, markdown, slug) {
    var title = meta.title || 'Blog Post';
    var date = meta.date
      ? new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    var image = normalizeImageSrc(meta.image || meta.thumbnail || '');

    document.title = title + ' | ' + C.companyName;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && meta.description) metaDesc.setAttribute('content', meta.description);

    var heroSrc = image || '/images/blog-thumbnail.jpg';
    var heroImage = '<img src="' + heroSrc + '" alt="' + escapeHtml(title) + '" class="w-full h-auto rounded-xl mb-8" onerror="this.src=\'/images/blog-thumbnail.jpg\'">';

    var html = marked.parse(markdown);

    var container = document.getElementById('blog-post-content');
    if (container) {
      container.innerHTML =
        '<article class="max-w-3xl mx-auto">' +
        '<a href="/blog" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 group">' +
        '<svg class="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>Back to Blog</a>' +
        heroImage +
        '<header class="mb-8">' +
        (date ? '<time class="text-primary-600 font-medium">' + date + '</time>' : '') +
        '<h1 class="heading-xl mt-2 text-balance">' + escapeHtml(title) + '</h1></header>' +
        '<div class="prose-blog">' + html + '</div>' +
        '<hr class="my-12 border-gray-200">' +
        '<div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 bg-primary-50 rounded-xl px-6">' +
        '<div><p class="font-bold text-gray-900">Got a pest problem?</p>' +
        '<p class="text-gray-600 text-sm">Contact us for a free inspection today.</p></div>' +
        '<a href="/contact" class="btn-primary whitespace-nowrap">Get a Free Inspection</a></div></article>';
    }

    var loading = document.getElementById('blog-post-loading');
    if (loading) loading.classList.add('hidden');
  }

  function showPostNotFound() {
    var loading = document.getElementById('blog-post-loading');
    if (loading) loading.classList.add('hidden');

    var container = document.getElementById('blog-post-content');
    if (container) {
      container.innerHTML =
        '<div class="text-center py-16">' +
        '<h2 class="heading-lg text-gray-900 mb-4">Post Not Found</h2>' +
        '<p class="text-gray-600 mb-8">The blog post you\'re looking for doesn\'t exist or has been moved.</p>' +
        '<a href="/blog" class="btn-primary">Browse All Posts</a></div>';
    }
  }

  // ============================= BLOG DATA FETCHING =============================
  function fetchPosts() {
    if (postsCache) return Promise.resolve(postsCache);
    return fetch('/data/posts.json')
      .then(function (r) {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then(function (posts) {
        postsCache = posts.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        return postsCache;
      });
  }

  function loadMarked() {
    if (window.marked) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // ============================= CONTACT FORM =============================
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = form.querySelector('[name="name"]');
      var emailInput = form.querySelector('[name="email"]');
      var phoneInput = form.querySelector('[name="phone"]');
      var messageInput = form.querySelector('[name="message"]');
      var valid = true;

      clearFormErrors(form);

      if (!nameInput.value.trim()) { showFieldError(nameInput, 'Please enter your name.'); valid = false; }
      if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        showFieldError(emailInput, 'Please enter a valid email address.'); valid = false;
      }
      if (!phoneInput.value.trim()) { showFieldError(phoneInput, 'Please enter your phone number.'); valid = false; }
      if (!messageInput.value.trim()) { showFieldError(messageInput, 'Please enter a message.'); valid = false; }

      if (!valid) return;

      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...';
      submitBtn.disabled = true;

      var formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then(function (response) {
          if (response.ok) {
            var container = form.parentElement;
            container.innerHTML =
              '<div class="text-center py-12">' +
              '<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">' +
              '<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div>' +
              '<h3 class="heading-md text-gray-900 mb-2">Thank You!</h3>' +
              '<p class="text-gray-600 mb-6">Your message has been sent successfully. We\'ll get back to you within 24 hours.</p>' +
              '<a href="/" class="btn-primary">Back to Home</a></div>';
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          var notice = document.getElementById('form-error-notice');
          if (notice) {
            notice.classList.remove('hidden');
            setTimeout(function () { notice.classList.add('hidden'); }, 5000);
          }
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  function showFieldError(input, message) {
    input.classList.add('!border-red-500', '!ring-red-500');
    var errorEl = document.createElement('p');
    errorEl.className = 'text-red-500 text-sm mt-1 form-error';
    errorEl.textContent = message;
    input.parentNode.appendChild(errorEl);
  }

  function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(function (el) { el.remove(); });
    form.querySelectorAll('.\\!border-red-500').forEach(function (el) {
      el.classList.remove('!border-red-500', '!ring-red-500');
    });
  }

  // ============================= SHARED BEHAVIORS =============================

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#mobile-menu-btn');
    if (!btn) return;

    var menu = document.getElementById('mobile-menu');
    var iconOpen = document.getElementById('menu-icon-open');
    var iconClose = document.getElementById('menu-icon-close');
    if (!menu) return;

    var isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    if (iconOpen) iconOpen.classList.toggle('hidden');
    if (iconClose) iconClose.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', !isOpen);
  });

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      var nav = document.querySelector('nav');
      if (nav) nav.classList.toggle('shadow-md', window.scrollY > 10);
      scrollTicking = false;
    });
  });

  var animObserver = null;
  if ('IntersectionObserver' in window) {
    animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.style.opacity = '1';
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  }

  function refreshAnimations() {
    if (!animObserver) return;
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.style.opacity = '0';
      animObserver.observe(el);
    });
  }

  // ============================= PREFETCH =============================
  function prefetchOnIdle() {
    if (postsCache) return;
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () { fetchPosts(); });
    } else {
      setTimeout(function () { fetchPosts(); }, 2000);
    }
  }

  // ============================= BOOTSTRAP =============================
  function init() {
    renderFooter();
    navigate(location.pathname + location.hash, false);
    prefetchOnIdle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
