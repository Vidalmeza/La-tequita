/* ============================================================
   La Tequita – scripts.js
   Interactividad: navbar, menú móvil, modal, reseñas, reveal
   Sin dependencias externas · Compatible con HostGator estático
   ============================================================ */

'use strict';

/* ── Navbar: fondo sólido al bajar ──────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── Enlace activo según sección visible ─────────────────────── */
(function initActiveLinks() {
  const navLinks = document.querySelectorAll('nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l => {
        l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id);
      });
    }),
    { threshold: .35 }
  );
  sections.forEach(s => obs.observe(s));
})();

/* ── Menú móvil ──────────────────────────────────────────────── */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  function open()  { menu.classList.add('open'); btn.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { menu.classList.remove('open'); btn.classList.remove('open'); document.body.style.overflow = ''; }

  btn.addEventListener('click', () => menu.classList.contains('open') ? close() : open());

  /* Cierra al hacer clic en cualquier enlace interno */
  menu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', close));
})();

/* ── Modal carta completa ────────────────────────────────────── */
(function initMenuModal() {
  const modal   = document.getElementById('menu-modal');
  const openBtn = document.getElementById('open-menu-modal');
  if (!modal) return;

  function openModal()  { modal.classList.remove('hidden'); modal.classList.add('flex'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.style.overflow = ''; }

  if (openBtn) openBtn.addEventListener('click', openModal);

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
})();

/* ── Reveal on scroll (Intersection Observer) ────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      });
    },
    { threshold: .12 }
  );
  els.forEach(el => obs.observe(el));
})();

/* ── Filtro de categorías del Menú ───────────────────────────── */
(function initMenuFilter() {
  const tabs  = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.filter;

      /* Estilo activo en tab */
      tabs.forEach(t => t.classList.remove('filter-active'));
      tab.classList.add('filter-active');

      /* Mostrar/ocultar cards */
      cards.forEach(card => {
        const visible = cat === 'todos' || card.dataset.category === cat;
        card.style.display = visible ? '' : 'none';
        /* Re-aplica animación para las que aparecen */
        if (visible) {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 80);
        }
      });
    });
  });
})();
