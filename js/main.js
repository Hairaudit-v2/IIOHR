(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var navPrimary = document.querySelector('.nav-primary');

  if (navToggle && navPrimary) {
    navToggle.addEventListener('click', function () {
      var isOpen = navPrimary.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
  }

  // Smooth scroll for anchor links (enhancement; HTML already has scroll-behavior: smooth)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navPrimary.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
