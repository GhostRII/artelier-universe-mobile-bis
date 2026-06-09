/* ══════════════════════════════════
   figz-pages.js — Figz Collectible
   Version multipage (1 fichier HTML par page)
   ══════════════════════════════════ */

/* ── HAMBURGER MENU ── */
function toggleMenu(force) {
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('menuOverlay');
  const hamburger = document.getElementById('hamburger');
  if (!sideMenu || !overlay || !hamburger) return;
  const willOpen = typeof force === 'boolean' ? force : !sideMenu.classList.contains('open');
  sideMenu.classList.toggle('open', willOpen);
  overlay.classList.toggle('open', willOpen);
  hamburger.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
  hamburger.setAttribute('aria-expanded', String(willOpen));
  sideMenu.setAttribute('aria-hidden', String(!willOpen));
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('menuOverlay');
  if (hamburger) hamburger.addEventListener('click', () => toggleMenu());
  if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
  renderGallery();
  initContactToggle();
});

/* ── TOGGLE CONTACT (page Contact) ── */
function initContactToggle() {
  const partBtn = document.getElementById('panelPartBtn');
  const proBtn  = document.getElementById('panelProBtn');
  if (!partBtn || !proBtn) return;
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

/* ── CONFIGURATOR (page Create) ── */
const selections = { type: null, universe: null, accessories: [] };

function selectChip(chip) {
  const group = chip.dataset.group;
  document.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');
  selections[group] = chip.textContent.trim().replace(/^[^\s]+\s/, '');
  updatePrompt();
}

function toggleChip(chip) {
  chip.classList.toggle('selected');
  const label = chip.textContent.trim().replace(/^[^\s]+\s/, '');
  if (chip.classList.contains('selected')) {
    if (!selections.accessories.includes(label)) selections.accessories.push(label);
  } else {
    selections.accessories = selections.accessories.filter(a => a !== label);
  }
  updatePrompt();
}

function updatePrompt() {
  const descEl = document.getElementById('config-desc');
  if (!descEl) return;
  const desc = descEl.value.trim();
  const tags = [];
  if (selections.type) tags.push(selections.type);
  if (selections.universe) tags.push(selections.universe);
  selections.accessories.forEach(a => tags.push(a));

  const tagsEl = document.getElementById('preview-tags');
  tagsEl.innerHTML = tags.map(t => `<span class="preview-tag">${t}</span>`).join('');

  const emojiMap = {
    'Human':'🧍','Animal':'🦊','Mascot':'😺','Robot':'🤖','Monster':'👹',
    'Racing':'🏎️','Luxury':'💎','Influencer':'📱','Fantasy':'🧙','Superhero':'🦸'
  };
  if (selections.type) {
    document.getElementById('preview-placeholder').style.display = 'none';
    const art = document.getElementById('preview-art');
    art.style.display = 'block';
    art.textContent = emojiMap[selections.type] || '🎨';
  }

  let parts = [];
  if (selections.type) parts.push(`Art Toy figurine type ${selections.type}`);
  if (selections.universe) parts.push(`style ${selections.universe}`);
  if (selections.accessories.length) parts.push(`avec ${selections.accessories.join(', ')}`);
  if (desc) parts.push(desc);
  parts.push('haute qualité, rendu 3D, studio lighting, collector edition');

  const prompt = parts.length > 1 ? parts.join(', ') : 'Configure tes options pour générer le prompt...';
  document.getElementById('preview-prompt').textContent = prompt;

  const ready = selections.type && selections.universe;
  document.getElementById('gen-btn').disabled = !ready;
}

const conceptEmojis = ['🤖','🦾','⚙️','🌟','🏆','💫','✨','🎯'];

function generateConcept() {
  const btn = document.getElementById('gen-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Génération en cours...';
  setTimeout(() => {
    btn.textContent = '✦ Régénérer';
    btn.disabled = false;
    const grid = document.getElementById('concepts-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const emoji = conceptEmojis[Math.floor(Math.random() * conceptEmojis.length)];
      const div = document.createElement('div');
      div.style.cssText = `aspect-ratio:1; background: var(--bg3); border-radius: 10px; display:flex; align-items:center; justify-content:center; font-size:48px; cursor:pointer; border:2px solid transparent; transition: all 0.2s;`;
      div.textContent = emoji;
      div.onclick = function() {
        grid.querySelectorAll('div').forEach(d => d.style.borderColor = 'transparent');
        this.style.borderColor = 'var(--gold)';
      };
      grid.appendChild(div);
    }
    document.getElementById('gen-result').style.display = 'block';
  }, 2000);
}

/* ── GALLERY (page Gallery) ── */
const galleryItems = [
  { name: 'Gold Robo X', type: 'Robot', universe: 'luxury', emoji: '🤖', accessories: ['Montre', 'Lunettes'] },
  { name: 'Street Mascot', type: 'Mascot', universe: 'streetwear', emoji: '😺', accessories: ['Sneakers', 'Casque'] },
  { name: 'Cyber Human', type: 'Human', universe: 'cyberpunk', emoji: '🧍', accessories: ['Lunettes', 'Ailes'] },
  { name: 'Racing Legend', type: 'Racing', universe: 'motorsport', emoji: '🏎️', accessories: ['Casque', 'Trophée'] },
  { name: 'Dubai King', type: 'Luxury', universe: 'luxury', emoji: '💎', accessories: ['Couronne', 'Montre'] },
  { name: 'Game Master', type: 'Human', universe: 'gaming', emoji: '🎮', accessories: ['Casque', 'Trophée'] },
  { name: 'Fashion Bot', type: 'Robot', universe: 'fashion', emoji: '👗', accessories: ['Lunettes', 'Bijoux'] },
  { name: 'Street Monster', type: 'Monster', universe: 'streetwear', emoji: '👹', accessories: ['Sneakers'] },
  { name: 'Cyber Animal', type: 'Animal', universe: 'cyberpunk', emoji: '🦊', accessories: ['Lunettes', 'Ailes'] },
  { name: 'Luxury Mascot', type: 'Mascot', universe: 'luxury', emoji: '🐻', accessories: ['Couronne', 'Montre'] },
  { name: 'Racing Robot', type: 'Robot', universe: 'motorsport', emoji: '🏁', accessories: ['Casque'] },
  { name: 'Fashion Human', type: 'Human', universe: 'fashion', emoji: '👤', accessories: ['Bijoux', 'Sac'] },
];

function renderGallery(filter = 'all') {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const items = filter === 'all' ? galleryItems : galleryItems.filter(i => i.universe === filter);
  grid.innerHTML = items.map(item => `
    <div class="gallery-card">
      <div class="gallery-img">
        <span style="font-size:56px; z-index:1; position:relative;">${item.emoji}</span>
        <div class="gallery-overlay"><div class="gallery-overlay-btn">Commander</div></div>
      </div>
      <div class="gallery-info">
        <div class="gallery-name">${item.name}</div>
        <div class="gallery-meta"><span>${item.type}</span><span style="text-transform:capitalize">${item.universe}</span></div>
        <div class="gallery-tags">${item.accessories.map(a => `<span class="gallery-tag">${a}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

function filterGallery(chip, filter) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  renderGallery(filter);
}
