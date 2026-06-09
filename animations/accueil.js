/* ══════════════════════════════════════
   accueil.js — Landing page multi-portes
   Artelier 3D · test 7
   ══════════════════════════════════════ */

(function () {
  const doors = document.querySelectorAll('.door-card');

  function playChime(variant) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      function note(freq, start, dur, vol) {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine'; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(vol, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.start(start); osc.stop(start + dur);
      }
      const t = ctx.currentTime;
      if (variant === 'artelier') {
        // Chaud, rouge-doré
        note(523.25, t,        1.8, 0.25);
        note(659.25, t + 0.12, 1.6, 0.18);
        note(783.99, t + 0.24, 1.4, 0.14);
        note(1046.5, t + 0.38, 1.2, 0.10);
        note(1318.5, t + 0.52, 0.9, 0.07);
      } else {
        // Figz : plus haut, doré luxe
        note(659.25, t,        1.6, 0.22);
        note(830.61, t + 0.10, 1.4, 0.16);
        note(987.77, t + 0.22, 1.2, 0.12);
        note(1318.5, t + 0.34, 1.0, 0.09);
        note(1567.98, t + 0.46, 0.8, 0.06);
      }
    } catch (e) {}
  }

  doors.forEach(function (card) {
    let triggered = false;
    const panel   = card.querySelector('.door-panel');
    const target  = card.dataset.href;
    const variant = card.dataset.variant;

    card.addEventListener('click', function () {
      if (triggered) return;
      triggered = true;
      playChime(variant);
      panel.classList.add('open');
      setTimeout(function () {
        window.location.href = target;
      }, 1100);
    });
  });
})();
