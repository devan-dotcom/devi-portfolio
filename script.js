(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = qs('#siteHeader');
  const progress = qs('#scrollProgress');
  const menuButton = qs('#menuButton');
  const mobileNav = qs('#mobileNav');
  const sections = qsa('.snap-section');
  const sectionCurrent = qs('#sectionCurrent');
  const sectionProgress = qs('#sectionProgress');

  const updateScroll = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    header.classList.toggle('scrolled', y > 24);
    const marker = y + innerHeight * .45;
    let activeIndex = 0;
    sections.forEach((section, i) => { if (section.offsetTop <= marker) activeIndex = i; });
    if (sectionCurrent) sectionCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
    if (sectionProgress) sectionProgress.style.height = `${((activeIndex + 1) / sections.length) * 100}%`;
    qsa('.desktop-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${sections[activeIndex]?.id}`));
  };
  addEventListener('scroll', updateScroll, { passive: true }); updateScroll();

  menuButton?.addEventListener('click', () => {
    const open = !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', open); menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open);
  });
  qsa('#mobileNav a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open'); menuButton.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
  qsa('.reveal').forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = Number(el.dataset.count || 0), suffix = el.dataset.suffix || '';
      if (reduceMotion) el.textContent = `${target}${suffix}`;
      else {
        const start = performance.now(), duration = 1000;
        const tick = now => { const t = Math.min(1, (now - start) / duration), ease = 1 - Math.pow(1 - t, 3); el.textContent = `${Math.round(target * ease)}${suffix}`; if (t < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
      counterObserver.unobserve(el);
    });
  }, { threshold: .75 });
  qsa('[data-count]').forEach(el => counterObserver.observe(el));

  if (matchMedia('(pointer:fine)').matches && !reduceMotion) {
    qsa('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-2px)`; });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
    const portrait = qs('#portraitShell');
    portrait?.addEventListener('pointermove', e => { const r = portrait.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; portrait.style.transform = `perspective(1200px) rotateX(${y * -2.2}deg) rotateY(${x * 3}deg)`; });
    portrait?.addEventListener('pointerleave', () => portrait.style.transform = '');
    qsa('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); const x = e.clientX - (r.left + r.width / 2); const y = e.clientY - (r.top + r.height / 2); el.style.transform = `translate(${x * .06}px,${y * .08}px) translateY(-2px)`; });
      el.addEventListener('pointerleave', () => el.style.transform = '');
    });
  }

  // HARMONY interactive demo — deliberately uses demo data, never real employee data.
  const demoNav = qsa('[data-demo-tab]'), demoPanels = qsa('[data-demo-panel]');
  demoNav.forEach(btn => btn.addEventListener('click', () => {
    demoNav.forEach(b => b.classList.remove('active')); demoPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active'); qs(`[data-demo-panel="${btn.dataset.demoTab}"]`)?.classList.add('active');
  }));

  const bars = qs('#attendanceBars');
  const days = ['M','T','W','T','F','S','S','M','T','W','T','F'];
  const renderBars = () => {
    if (!bars) return;
    bars.innerHTML = '';
    const vals = [72,84,78,91,87,43,30,89,93,85,95,90].map(v => Math.max(22, Math.min(98, v + Math.round(Math.random()*8-4))));
    vals.forEach((v,i) => { const bar = document.createElement('i'); bar.style.height = `${v}%`; bar.dataset.day = days[i]; bars.appendChild(bar); });
  };
  renderBars(); setInterval(renderBars, 5500);

  const activity = [
    'Supervisor approved an attendance correction.',
    'Employee submitted a PHL request with one attachment.',
    'HR locked the current attendance period.',
    'Leave request moved to supervisor review.',
    'Final attendance recap was exported to XLSX.'
  ];
  let activityIndex = 0;
  setInterval(() => { const el = qs('#activityFeed'); if (!el) return; activityIndex = (activityIndex + 1) % activity.length; el.animate([{opacity:.2,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:350}); el.textContent = activity[activityIndex]; }, 4200);

  const clock = qs('#demoClock'), date = qs('#demoDate'), sync = qs('#demoSync'); let syncAge = 0;
  const tickClock = () => {
    const now = new Date();
    if (clock) clock.textContent = now.toLocaleTimeString('id-ID',{hour12:false});
    if (date) date.textContent = now.toLocaleDateString('id-ID',{weekday:'long',day:'2-digit',month:'short',year:'numeric'});
    if (sync) sync.textContent = syncAge < 2 ? 'synced now' : `synced ${syncAge}s ago`;
    syncAge = (syncAge + 1) % 8;
  };
  tickClock(); setInterval(tickClock, 1000);

  // Subtle stat changes make the demo feel alive while clearly remaining demo data.
  setInterval(() => {
    const ids = [['attendancePresent',24,29],['attendancePending',2,5],['attendanceLeave',2,4],['attendancePhl',1,3]];
    ids.forEach(([id,min,max]) => { const el = qs(`#${id}`); if (el) el.textContent = String(Math.floor(Math.random()*(max-min+1))+min); });
  }, 7000);

  // Credential lightbox.
  const lightbox = qs('#lightbox'), lightboxImage = qs('#lightboxImage'), lightboxTitle = qs('#lightboxTitle'), lightboxClose = qs('#lightboxClose');
  const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; };
  qsa('[data-lightbox]').forEach(card => card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = card.dataset.lightbox; lightboxTitle.textContent = card.dataset.lightboxTitle || 'Document preview';
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden';
  }));
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();
