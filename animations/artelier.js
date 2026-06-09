/* ══════════════════════════════════════
   artelier.js — Boutique Artelier 3D
   test 7
   ══════════════════════════════════════ */

/* ── NAVIGATION PANNEAU LATÉRAL ── */
const hamburger   = document.getElementById('hamburgerBtn');
const sidePanel   = document.getElementById('sidePanel');
const siteOverlay = document.getElementById('overlay');
const closeBtn    = document.getElementById('closePanel');

function openPanel(sectionId) {
  sidePanel.classList.add('open');
  siteOverlay.classList.add('visible');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (sectionId) switchPanelSection(sectionId);
}
function closePanel() {
  sidePanel.classList.remove('open');
  siteOverlay.classList.remove('visible');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  sidePanel.classList.contains('open') ? closePanel() : openPanel();
});
siteOverlay.addEventListener('click', closePanel);
closeBtn.addEventListener('click', closePanel);

function switchPanelSection(targetId) {
  document.querySelectorAll('.panel-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.target === targetId);
  });
  document.querySelectorAll('.panel-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === targetId);
  });
}
document.querySelectorAll('.panel-nav-item').forEach(item => {
  item.addEventListener('click', () => switchPanelSection(item.dataset.target));
});

/* ── CONTACT TOGGLE ── */
document.getElementById('panelPartBtn').addEventListener('click', function () {
  this.classList.add('active');
  document.getElementById('panelProBtn').classList.remove('active');
  document.getElementById('panelFormPart').classList.add('active');
  document.getElementById('panelFormPro').classList.remove('active');
});
document.getElementById('panelProBtn').addEventListener('click', function () {
  this.classList.add('active');
  document.getElementById('panelPartBtn').classList.remove('active');
  document.getElementById('panelFormPro').classList.add('active');
  document.getElementById('panelFormPart').classList.remove('active');
});

/* ── SCROLL FADE-IN ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
