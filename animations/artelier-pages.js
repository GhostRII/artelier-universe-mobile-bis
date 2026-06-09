/* ══════════════════════════════════════
   artelier-pages.js — Boutique Artelier 3D
   Version multipage (1 fichier HTML par section)
   ══════════════════════════════════════ */

/* ── MENU LATÉRAL (navigation) ── */
const hamburger   = document.getElementById('hamburgerBtn');
const sidePanel   = document.getElementById('sidePanel');
const siteOverlay = document.getElementById('overlay');
const closeBtn    = document.getElementById('closePanel');

function openPanel() {
  if (!sidePanel) return;
  sidePanel.classList.add('open');
  siteOverlay.classList.add('visible');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePanel() {
  if (!sidePanel) return;
  sidePanel.classList.remove('open');
  siteOverlay.classList.remove('visible');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', () => {
  sidePanel.classList.contains('open') ? closePanel() : openPanel();
});
if (siteOverlay) siteOverlay.addEventListener('click', closePanel);
if (closeBtn) closeBtn.addEventListener('click', closePanel);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

/* ── TOGGLE CONTACT (page Contact uniquement) ── */
const partBtn = document.getElementById('panelPartBtn');
const proBtn  = document.getElementById('panelProBtn');
if (partBtn && proBtn) {
  partBtn.addEventListener('click', function () {
    this.classList.add('active');
    proBtn.classList.remove('active');
    document.getElementById('panelFormPart').classList.add('active');
    document.getElementById('panelFormPro').classList.remove('active');
  });
  proBtn.addEventListener('click', function () {
    this.classList.add('active');
    partBtn.classList.remove('active');
    document.getElementById('panelFormPro').classList.add('active');
    document.getElementById('panelFormPart').classList.remove('active');
  });
}

/* ── SCROLL FADE-IN ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
