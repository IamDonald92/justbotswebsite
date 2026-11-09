/* ==========================================================================
   JustBOTS — main.js
   No dependencies. Three jobs only:
     1. Mobile navigation
     2. Header border on scroll
     3. Scroll reveal (progressive enhancement, respects reduced motion)
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* ----------------------------------------------------------------------
     1. Mobile navigation
  ---------------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    // Close on link click
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    // Close on Escape, return focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        toggle.focus();
      }
    });

    // Close if the viewport grows past the mobile breakpoint
    var mq = window.matchMedia('(min-width: 861px)');
    var onChange = function (e) { if (e.matches) closeNav(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ----------------------------------------------------------------------
     2. Header border on scroll
  ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');

  if (header) {
    var ticking = false;
    var updateHeader = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
    updateHeader();
  }

  /* ----------------------------------------------------------------------
     3. Scroll reveal
  ---------------------------------------------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-visible');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(function (el, index) {
    // Stagger siblings inside the same group for a considered cascade
    var group = el.getAttribute('data-reveal');
    if (group === 'stagger') {
      var siblings = Array.prototype.slice.call(el.parentNode.children);
      el.style.setProperty('--reveal-delay', (siblings.indexOf(el) % 6) * 70 + 'ms');
    }
    observer.observe(el);
  });

})();

/* Footer year */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
