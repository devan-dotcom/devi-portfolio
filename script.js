(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track = qs('#slides');
  const slides = qsa('.slide');
  const railLinks = qsa('[data-go]');
  const rail = qs('#rail');
  const railToggle = qs('#railToggle');
  const prev = qs('#prevSlide');
  const next = qs('#nextSlide');
  const currentEl = qs('#slideCurrent');
  const totalEl = qs('#slideTotal');
  const pagerLabel = qs('#pagerLabel');
  const pagerBar = qs('#pagerProgress i');
  const lightbox = qs('#lightbox');
  let current = 0;
  let locked = false;
  let wheelScore = 0;
  let wheelReset;
  let touchX = 0;
  let touchY = 0;
  let touchTime = 0;

  const byId = id => slides.findIndex(s => s.id === id);
  const format = n => String(n).padStart(2, '0');

  function openRail(){
    if (!rail || !railToggle) return;
    rail.classList.add('open');
    railToggle.setAttribute('aria-expanded', 'true');
  }

  function closeRail(){
    if (!rail || !railToggle) return;
    rail.classList.remove('open');
    railToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleRail(){
    if (!rail) return;
    rail.classList.contains('open') ? closeRail() : openRail();
  }

  function setActive(index, updateHash = true) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    if (nextIndex === current && slides[current]?.classList.contains('active')) return;
    current = nextIndex;
    track.style.transform = `translate3d(-${current * 100}%,0,0)`;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    const activeSlide = slides[current];
    railLinks.forEach(link => {
      const target = byId(link.dataset.go);
      let navActive = target === current;
      if (link.dataset.go === 'harmony' && current === byId('projects')) navActive = true;
      if (link.dataset.go === 'education' && current === byId('certifications')) navActive = true;
      link.classList.toggle('active', navActive);
    });

    if (currentEl) currentEl.textContent = format(current + 1);
    if (totalEl) totalEl.textContent = format(slides.length);
    if (pagerLabel) pagerLabel.textContent = activeSlide?.dataset.label || '';
    if (pagerBar) pagerBar.style.width = `${((current + 1) / slides.length) * 100}%`;
    if (prev) prev.disabled = current === 0;
    if (next) next.disabled = current === slides.length - 1;

    if (updateHash && activeSlide?.id) history.replaceState(null, '', `#${activeSlide.id}`);
  }

  function move(step) {
    if (locked || lightbox?.classList.contains('open')) return;
    const target = current + step;
    if (target < 0 || target >= slides.length) return;
    locked = true;
    setActive(target);
    setTimeout(() => locked = false, reduceMotion ? 50 : 620);
  }

  railLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = byId(link.dataset.go);
      if (target < 0) return;
      e.preventDefault();
      setActive(target);
      closeRail();
    });
  });

  railToggle?.addEventListener('click', e => {
    e.preventDefault();
    toggleRail();
  });

  document.addEventListener('click', e => {
    if (!rail) return;
    if (!rail.contains(e.target)) closeRail();
  });
  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));

  addEventListener('wheel', e => {
    if (lightbox?.classList.contains('open')) return;
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelScore += delta;
    clearTimeout(wheelReset);
    wheelReset = setTimeout(() => wheelScore = 0, 160);
    if (Math.abs(wheelScore) >= 55 && !locked) {
      move(wheelScore > 0 ? 1 : -1);
      wheelScore = 0;
    }
  }, { passive: false });

  addEventListener('touchstart', e => {
    if (lightbox?.classList.contains('open')) return;
    const t = e.changedTouches[0];
    touchX = t.clientX;
    touchY = t.clientY;
    touchTime = Date.now();
  }, { passive: true });

  addEventListener('touchend', e => {
    if (lightbox?.classList.contains('open')) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchX;
    const dy = t.clientY - touchY;
    const elapsed = Date.now() - touchTime;
    if (elapsed > 1100) return;
    const horizontal = Math.abs(dx) >= Math.abs(dy);
    const distance = horizontal ? dx : dy;
    if (Math.abs(distance) < 52) return;
    move(distance < 0 ? 1 : -1);
  }, { passive: true });

  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeRail();
      if (lightbox?.classList.contains('open')) {
        closeLightbox();
      }
      return;
    }
    if (lightbox?.classList.contains('open')) return;
    if (['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)) { e.preventDefault(); move(1); }
    if (['ArrowLeft','ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); move(-1); }
    if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    if (e.key === 'End') { e.preventDefault(); setActive(slides.length - 1); }
  });

  // HARMONY interactive demo: simulation only, never real employee data.
  const demoNav = qsa('[data-demo-tab]');
  const demoPanels = qsa('[data-demo-panel]');
  demoNav.forEach(btn => btn.addEventListener('click', () => {
    demoNav.forEach(b => b.classList.remove('active'));
    demoPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    qs(`[data-demo-panel="${btn.dataset.demoTab}"]`)?.classList.add('active');
  }));

  const bars = qs('#attendanceBars');
  const days = ['M','T','W','T','F','S','S','M','T','W','T','F'];
  function renderBars() {
    if (!bars) return;
    bars.innerHTML = '';
    const vals = [72,84,78,91,87,43,30,89,93,85,95,90].map(v => Math.max(22, Math.min(98, v + Math.round(Math.random() * 8 - 4))));
    vals.forEach((v, i) => {
      const bar = document.createElement('i');
      bar.style.height = `${v}%`;
      bar.dataset.day = days[i];
      bars.appendChild(bar);
    });
  }
  renderBars();
  setInterval(renderBars, 5500);

  const activity = [
    'Supervisor approved an attendance correction.',
    'Employee submitted a PHL request with one attachment.',
    'HR locked the current attendance period.',
    'Leave request moved to supervisor review.',
    'Final attendance recap was exported to XLSX.'
  ];
  let activityIndex = 0;
  setInterval(() => {
    const el = qs('#activityFeed');
    if (!el) return;
    activityIndex = (activityIndex + 1) % activity.length;
    if (!reduceMotion) el.animate([{opacity:.25, transform:'translateY(3px)'},{opacity:1, transform:'none'}], {duration:300});
    el.textContent = activity[activityIndex];
  }, 4200);

  const clock = qs('#demoClock');
  const date = qs('#demoDate');
  const sync = qs('#demoSync');
  let syncAge = 0;
  function tickClock() {
    const now = new Date();
    if (clock) clock.textContent = now.toLocaleTimeString('id-ID', {hour12:false});
    if (date) date.textContent = now.toLocaleDateString('id-ID', {weekday:'short', day:'2-digit', month:'short', year:'numeric'});
    if (sync) sync.textContent = syncAge < 2 ? 'synced now' : `synced ${syncAge}s ago`;
    syncAge = (syncAge + 1) % 8;
  }
  tickClock();
  setInterval(tickClock, 1000);

  setInterval(() => {
    [['attendancePresent',24,29],['attendancePending',2,5],['attendanceLeave',2,4],['attendancePhl',1,3]].forEach(([id,min,max]) => {
      const el = qs(`#${id}`);
      if (el) el.textContent = String(Math.floor(Math.random() * (max - min + 1)) + min);
    });
  }, 7000);

  // Credential lightbox.
  const lightboxImage = qs('#lightboxImage');
  const lightboxTitle = qs('#lightboxTitle');
  const lightboxClose = qs('#lightboxClose');
  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    lightbox?.setAttribute('aria-hidden', 'true');
  };
  qsa('[data-lightbox]').forEach(card => card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = card.dataset.lightbox;
    lightboxTitle.textContent = card.dataset.lightboxTitle || 'Document preview';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }));
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox(); });

  const hashIndex = byId(location.hash.replace('#',''));
  setActive(hashIndex >= 0 ? hashIndex : 0, false);
})();
