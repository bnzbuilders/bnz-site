/* BuildWithBNZ — site script. No framework, no build step.
   Motion follows the MOTION board: entrances once at 20% in view, typed strip
   (M1), counters (M3/M5), conveyor (M7), stacked cards (M6). Everything is
   skipped under prefers-reduced-motion. */
(function () {
  'use strict';
  var d = document, w = window;
  var RM = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (RM) { d.documentElement.classList.add('no-motion'); d.querySelectorAll('use[data-static]').forEach(function (u) { u.setAttribute('href', u.getAttribute('data-static')); }); }

  /* ---------- Lead form endpoint — the one constant the plumbing changes ----------
     Today: FormSubmit relay to the inquiries inbox (no key in the browser).
     Later: the Cloudflare Worker that writes the Notion row and sends the email. */
  var LEAD_ENDPOINT = 'https://formsubmit.co/ajax/saracooper@bnzbuildersinc.com';

  /* ---------- nav: mega-menu (M9) + drawer ---------- */
  var menu = d.querySelector('.has-menu');
  if (menu) {
    var btn = menu.querySelector('button'), closeT;
    function open() { clearTimeout(closeT); menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { closeT = setTimeout(function () { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }, 120); }
    menu.addEventListener('mouseenter', open);
    menu.addEventListener('mouseleave', close);
    btn.addEventListener('click', function () { menu.classList.contains('open') ? (clearTimeout(closeT), menu.classList.remove('open'), btn.setAttribute('aria-expanded', 'false')) : open(); });
    menu.addEventListener('focusin', open);
    menu.addEventListener('focusout', function (e) { if (!menu.contains(e.relatedTarget)) close(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  }
  var burger = d.querySelector('.burger'), drawer = d.querySelector('.drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var o = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', o ? 'true' : 'false');
      d.body.classList.toggle('no-scroll', o);
    });
    drawer.addEventListener('click', function (e) { if (e.target.tagName === 'A') { drawer.classList.remove('open'); d.body.classList.remove('no-scroll'); } });
  }

  /* ---------- entrances ---------- */
  var io = ('IntersectionObserver' in w) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('in');
      if (el.hasAttribute('data-count')) countUp(el);
      el.querySelectorAll('[data-count]').forEach(countUp);
      if (el.classList.contains('scard')) playMoment(el);
      io.unobserve(el);
    });
  }, { threshold: 0.2 }) : null;

  d.querySelectorAll('.fx, .stagger, .mock.rows, .scard, [data-count]').forEach(function (el) {
    if (RM || !io) { el.classList.add('in'); if (el.hasAttribute('data-count')) el.textContent = el.getAttribute('data-count'); el.querySelectorAll('[data-count]').forEach(function (c) { c.textContent = c.getAttribute('data-count'); }); }
    else io.observe(el);
  });

  /* ---------- counters (M3 numerals 240 ms, M5 report 600 ms) ---------- */
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = parseInt(el.getAttribute('data-dur'), 10) || 600;
    var pad = el.getAttribute('data-pad') || '';
    var t0 = null;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      var v = Math.round(target * e);
      el.textContent = pad && v < 10 ? pad + v : String(v);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- M1 typed strip ---------- */
  var strips = d.querySelectorAll('.strip[data-lines]');
  strips.forEach(function (strip) {
    var lines; try { lines = JSON.parse(strip.getAttribute('data-lines')); } catch (e) { return; }
    var txt = strip.querySelector('.txt'), chip = strip.querySelector('.chip');
    if (RM || !lines.length) { txt.textContent = lines[lines.length - 1][0]; setChip(lines[lines.length - 1][1]); strip.classList.add('done'); return; }
    var i = 0, active = true;
    if (io) { var vis = new IntersectionObserver(function (en) { active = en[0].isIntersecting; }, { threshold: 0.1 }); vis.observe(strip); }
    function setChip(c) { chip.className = 'chip ' + c[0]; chip.textContent = c[1]; chip.style.opacity = 1; }
    function type(line, cb) {
      var s = line[0], n = 0; txt.textContent = ''; chip.style.opacity = 0; strip.classList.remove('done');
      (function tick() {
        if (!active) { setTimeout(tick, 400); return; }
        n++; txt.textContent = s.slice(0, n);
        if (n < s.length) setTimeout(tick, 36); else { setChip(line[1]); strip.classList.add('done'); setTimeout(cb, 2400); }
      })();
    }
    (function loop() { type(lines[i], function () { i = (i + 1) % lines.length; loop(); }); })();
  });

  /* ---------- M7 conveyor ---------- */
  d.querySelectorAll('.conveyor').forEach(function (c) {
    var track = c.querySelector('.track'); if (!track) return;
    if (RM) return;
    var clone = track.cloneNode(true); clone.classList.add('dupe'); clone.setAttribute('aria-hidden', 'true');
    // the track holds the original rows; a duplicate follows so the loop is seamless
    var kids = Array.prototype.slice.call(clone.children);
    kids.forEach(function (k) { k.classList.add('dupe'); track.appendChild(k); });
    function size() {
      var half = track.scrollHeight / 2;
      track.style.setProperty('--half', half + 'px');
      var rows = c.querySelectorAll('.brick:not(.dupe)').length;
      track.style.setProperty('--dur', (rows * 6 * 2) + 's');
      // window height = the first N visible rows, measured, not guessed
      var vis = c.classList.contains('two') ? 2 : 3, h = 0, kids = track.children, gap = 16;
      for (var i = 0; i < Math.min(kids.length, vis); i++) h += kids[i].getBoundingClientRect().height + gap;
      c.style.height = Math.round(h) + 'px';
    }
    size(); w.addEventListener('resize', size);
  });

  /* ---------- M6 stacked cards: dim the one beneath ---------- */
  var cards = d.querySelectorAll('.stack .scard');
  if (cards.length && !RM) {
    function stack() {
      var top = 88;
      cards.forEach(function (card, i) {
        var next = cards[i + 1]; if (!next) { card.classList.remove('behind'); return; }
        var r = next.getBoundingClientRect();
        card.classList.toggle('behind', r.top <= top + 24);
      });
    }
    w.addEventListener('scroll', stack, { passive: true }); stack();
  }

  /* ---------- UI moments inside solution cards (play once) ---------- */
  function playMoment(card) {
    if (RM || card.dataset.played) return; card.dataset.played = '1';
    var typed = card.querySelector('[data-type]');
    if (typed) { var s = typed.getAttribute('data-type'), n = 0; typed.textContent = ''; (function t() { n++; typed.textContent = s.slice(0, n); if (n < s.length) setTimeout(t, 28); })(); }
    card.querySelectorAll('[data-swap]').forEach(function (el, k) {
      setTimeout(function () {
        var parts = el.getAttribute('data-swap').split('|');
        el.style.transition = 'opacity 240ms'; el.style.opacity = 0;
        setTimeout(function () { el.textContent = parts[0]; if (parts[1]) el.className = parts[1]; el.style.opacity = 1; }, 240);
      }, 1400 + k * 400);
    });
    var slide = card.querySelector('[data-slide]');
    if (slide) { slide.style.opacity = 0; slide.style.transform = 'translateY(-14px)'; setTimeout(function () { slide.style.transition = 'opacity 480ms cubic-bezier(.2,.7,.2,1),transform 480ms cubic-bezier(.2,.7,.2,1)'; slide.style.opacity = 1; slide.style.transform = 'none'; }, 900); }
  }

  /* ---------- lead form ---------- */
  var form = d.querySelector('form.lead');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = form.querySelector('[name="_honey"]'); if (hp && hp.value) return;
      form.classList.remove('invalid');
      var req = ['name', 'email', 'company', 'project'];
      var bad = req.some(function (n) { var f = form.querySelector('[name="' + n + '"]'); return !f || !f.value.trim(); });
      var em = form.querySelector('[name="email"]');
      if (bad || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) { form.classList.add('invalid'); return; }
      var sub = form.querySelector('button[type="submit"]'); sub.disabled = true; sub.textContent = 'Sending…';
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== '_honey') data[k] = v; });
      data._subject = 'New inquiry — Project Review: ' + (data.company || data.name);
      data._template = 'table';
      data.source = location.pathname;
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () { location.href = '/thanks/'; })
        .catch(function () {
          // relay unreachable: fall back to the visitor's own mail client so no request is lost
          var body = Object.keys(data).filter(function (k) { return k[0] !== '_'; }).map(function (k) { return k + ': ' + data[k]; }).join('\n');
          location.href = 'mailto:saracooper@bnzbuildersinc.com?subject=' + encodeURIComponent(data._subject) + '&body=' + encodeURIComponent(body);
          sub.disabled = false; sub.textContent = 'Book a project review ↗';
        });
    });
  }
})();
