/* ============================================================
   PreventionLink Health — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL EFFECT ─────────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── HAMBURGER MOBILE MENU ─────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });


  /* ── REVEAL ON SCROLL ──────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));


  /* ── COUNT-UP ANIMATION ────────────────────────────────── */
  const counters = document.querySelectorAll('.impact__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
  }


  /* ── CONTACT FORM ──────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async submission
      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.classList.add('show');
      }, 1200);
    });
  }


  /* ── SMOOTH ACTIVE NAV LINKS ───────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));


  /* ── SUBTLE PARALLAX ON HERO ORBS ─────────────────────── */
  const orb1 = document.querySelector('.hero__orb--1');
  const orb2 = document.querySelector('.hero__orb--2');

  if (orb1 && orb2) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    }, { passive: true });
  }


  /* ── TILE HOVER TILT ───────────────────────────────────── */
  const tiles = document.querySelectorAll('.tile, .audience__card, .pillar');

  tiles.forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      tile.style.transform = `translateY(-4px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
      tile.style.transition = 'transform 0.1s ease';
    });

    tile.addEventListener('mouseleave', () => {
      tile.style.transform = '';
      tile.style.transition = 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });

});
