(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const boot = document.getElementById('boot');
  const progressBar = document.getElementById('boot-progress');
  const percent = document.getElementById('boot-percent');
  const message = document.getElementById('boot-message');
  let finished = false;
  const query = new URLSearchParams(location.search);
  const skipIntro = reduced || sessionStorage.getItem('observation-lab-intro') === 'seen' || query.has('skipIntro');
  let progressReady = false;
  let heroReady = false;

  const heroImages = [...document.querySelectorAll('.hero__stage img')];
  Promise.all(heroImages.map(img => {
    if (img.complete && img.naturalWidth) return Promise.resolve();
    return new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  })).then(() => {
    heroReady = true;
    if (progressReady) finishBoot();
  });
  setTimeout(() => {
    heroReady = true;
    if (progressReady) finishBoot();
  }, 6500);

  function finishBoot() {
    if (finished) return;
    finished = true;
    sessionStorage.setItem('observation-lab-intro', 'seen');
    progressBar.style.width = '100%';
    percent.textContent = '100';
    message.textContent = '未知信号を検出しました';
    setTimeout(() => {
      boot.classList.add('is-hidden');
      body.classList.remove('is-loading');
      body.classList.add('is-ready');
    }, reduced ? 0 : 420);
  }

  if (skipIntro) {
    boot.style.display = 'none';
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    finished = true;
  } else {
    let value = 0;
    const timer = setInterval(() => {
      value += Math.max(1, Math.round(Math.random() * 9));
      if (value > 96) value = 96;
      progressBar.style.width = `${value}%`;
      percent.textContent = value;
      if (value > 28) message.textContent = '観測端末を同期しています';
      if (value > 64) message.textContent = '受信周波数を走査しています';
      if (value >= 96) {
        clearInterval(timer);
        progressReady = true;
        message.textContent = heroReady ? '観測映像を展開します' : '観測映像を構築しています';
        if (heroReady) setTimeout(finishBoot, 260);
      }
    }, 90);
    document.getElementById('boot-skip').addEventListener('click', () => {
      clearInterval(timer);
      finishBoot();
    });
  }

  const menuButton = document.getElementById('menu-button');
  const nav = document.getElementById('global-nav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      if (entry.target.classList.contains('signal')) entry.target.classList.add('is-active');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal, .signal').forEach(el => revealObserver.observe(el));
  if (location.hash) {
    const scrollToHash = () => setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ block: 'start' }), 80);
    if (document.readyState === 'complete') scrollToHash();
    else window.addEventListener('load', scrollToHash, { once: true });
  }

  const header = document.getElementById('site-header');
  const hero = document.getElementById('top');
  const pageProgress = document.getElementById('scroll-progress');
  function onScroll() {
    const top = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const overHero = top < Math.max(120, hero.offsetHeight * .72);
    header.classList.toggle('is-over-hero', overHero);
    header.classList.toggle('is-beyond-hero', !overHero);
    header.classList.toggle('is-scrolled', top > 40);
    pageProgress.style.width = `${max > 0 ? (top / max) * 100 : 0}%`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    const layers = document.querySelectorAll('.parallax');
    window.addEventListener('pointermove', event => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      layers.forEach(layer => {
        const depth = Number(layer.dataset.depth || .1);
        layer.style.translate = `${x * depth * 45}px ${y * depth * 30}px`;
      });
    }, { passive: true });
  }

  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resizeStars() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.min(160, Math.floor(window.innerWidth / 6)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + .2,
      a: Math.random() * .7 + .18,
      s: Math.random() * .08 + .02
    }));
  }
  function drawStars() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach(star => {
      star.y += star.s;
      if (star.y > window.innerHeight + 2) star.y = -2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${star.r > .9 ? '145,229,255' : '255,255,255'},${star.a})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduced) requestAnimationFrame(drawStars);
  }
  resizeStars();
  drawStars();
  window.addEventListener('resize', resizeStars);
})();
