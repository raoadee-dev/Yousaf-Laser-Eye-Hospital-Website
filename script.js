/* ===========================
   YOUSAF LASER EYE HOSPITAL
   script.js
   =========================== */

// ---------- NAVBAR SCROLL ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger icon
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ---------- SCROLL FADE-IN ANIMATIONS ----------
const fadeEls = document.querySelectorAll(
  '.service-card, .gallery-item, .review-card, ' +
  '.about-grid, .testimonial-featured, .contact-grid, ' +
  '.rating-bar, .section-title, .section-eyebrow'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add stagger delays to grid children
document.querySelectorAll(
  '.services-grid .service-card, ' +
  '.reviews-grid .review-card, ' +
  '.gallery-grid .gallery-item'
).forEach((el, i) => {
  el.dataset.delay = i;
});

fadeEls.forEach(el => observer.observe(el));

// ---------- ACTIVE NAV LINK HIGHLIGHT ----------
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id   = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
      link.style.color = '#3B9EE8';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ---------- SMOOTH SCROLL OFFSET FOR FIXED NAV ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---------- GALLERY LIGHTBOX (simple) ----------
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const caption = item.querySelector('.gallery-caption')?.textContent || '';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:9998;
      background:rgba(0,0,0,0.92); display:flex;
      flex-direction:column; align-items:center; justify-content:center;
      cursor:pointer; padding:24px;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
      max-width:90vw; max-height:80vh;
      object-fit:contain; border-radius:12px;
      box-shadow:0 8px 60px rgba(0,0,0,0.6);
    `;

    const cap = document.createElement('p');
    cap.textContent = caption;
    cap.style.cssText = `
      color:rgba(255,255,255,0.7); margin-top:16px;
      font-size:0.9rem; letter-spacing:0.04em;
    `;

    overlay.appendChild(img);
    overlay.appendChild(cap);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.remove());
  });
});

// ---------- WHATSAPP FLOAT TOOLTIP ----------
const waBtn = document.querySelector('.whatsapp-float');
if (waBtn) {
  const tip = document.createElement('span');
  tip.textContent = 'Chat with us!';
  tip.style.cssText = `
    position:absolute; right:68px; top:50%;
    transform:translateY(-50%);
    background:#fff; color:#0A1628;
    font-size:0.78rem; font-weight:600;
    padding:6px 12px; border-radius:20px;
    white-space:nowrap; opacity:0;
    box-shadow:0 2px 12px rgba(0,0,0,0.15);
    transition:opacity 0.2s; pointer-events:none;
  `;
  waBtn.style.position = 'fixed';
  waBtn.appendChild(tip);

  waBtn.addEventListener('mouseenter', () => tip.style.opacity = '1');
  waBtn.addEventListener('mouseleave', () => tip.style.opacity = '0');
}
