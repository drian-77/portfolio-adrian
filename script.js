// ===== Portfolio - Adrian Elang Perdana =====

// Toast helper (global for inline onclick)
function toast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}
window.toast = toast;

// Navbar scroll effect + active link + back to top
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  backToTop.classList.toggle('visible', y > 600);

  // Active nav link
  let current = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});
navLinks.forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
}));

// Smooth scrolling (native via CSS, but handle offset for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Back to top
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal using IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    toast('⚠️ Harap isi semua field terlebih dahulu.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast('⚠️ Format email tidak valid.');
    return;
  }

  toast('✅ Message sent successfully! Terima kasih, ' + name + '!', 'success');
  form.reset();
});

// No console errors check
console.log('%c👋 Portfolio Adrian Elang Perdana — XI PPLG B', 'color:#38bdf8;font-weight:bold;font-size:13px');
