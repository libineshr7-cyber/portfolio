/* ═══════════════════════════════════════════════════════════
   LIBINESH R U — Cybersecurity Portfolio
   script.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════════
   1. LOADER
══════════════════════════════════════════════════════════ */
(function initLoader() {
  const loader      = document.getElementById('loader');
  const loaderBar   = document.getElementById('loader-bar');
  const loaderPct   = document.getElementById('loader-percent');
  const loaderText  = document.getElementById('loader-text');

  if (!loader) return;

  const messages = [
    'Initializing system...',
    'Loading security modules...',
    'Establishing encrypted connection...',
    'Bypassing firewall...',
    'Access granted.',
  ];

  let progress  = 0;
  let msgIndex  = 0;
  const totalMs = 2400;
  const step    = 100 / (totalMs / 50);

  const msgInterval = setInterval(() => {
    if (msgIndex < messages.length) {
      loaderText.textContent = messages[msgIndex++];
    }
  }, totalMs / messages.length);

  const barInterval = setInterval(() => {
    progress = Math.min(progress + step + Math.random() * 1.5, 100);
    loaderBar.style.width   = progress + '%';
    loaderPct.textContent   = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(barInterval);
      clearInterval(msgInterval);
      loaderText.textContent = 'Welcome, Visitor_';
      setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 700);
      }, 400);
    }
  }, 50);
})();


/* ══════════════════════════════════════════════════════════
   2. MATRIX CANVAS BACKGROUND
══════════════════════════════════════════════════════════ */
(function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;

  const ctx   = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ{}[]<>/\\';
  let W, H, cols, drops;
  const fontSize = 14;

  function resize() {
    W     = canvas.width  = window.innerWidth;
    H     = canvas.height = window.innerHeight;
    cols  = Math.floor(W / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5, 10, 14, 0.055)';
    ctx.fillRect(0, 0, W, H);
    ctx.font      = `${fontSize}px "Share Tech Mono", monospace`;

    drops.forEach((y, i) => {
      const c  = chars[Math.floor(Math.random() * chars.length)];
      const hue = Math.random() > 0.85 ? '#00ff88' : '#00ffe7';
      ctx.fillStyle = hue;
      ctx.fillText(c, i * fontSize, y * fontSize);

      if (y * fontSize > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.8;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();


/* ══════════════════════════════════════════════════════════
   3. CUSTOM CURSOR
══════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring follows with lag
  let rx = 0, ry = 0;
  function animateRing() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects on interactive elements
  const hoverSelectors = 'a, button, .skill-card, .project-card, .cert-card, .contact-link-item, .filter-btn, .detail-card';
  document.querySelectorAll(hoverSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.45';
  });
})();


/* ══════════════════════════════════════════════════════════
   4. SCROLL PROGRESS BAR
══════════════════════════════════════════════════════════ */
(function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  function updateBar() {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateBar, { passive: true });
})();


/* ══════════════════════════════════════════════════════════
   5. NAVBAR — scroll state & active link highlight
══════════════════════════════════════════════════════════ */
(function initNavbar() {
  const nav     = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  if (!nav) return;

  function onScroll() {
    // Scrolled class
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Active section highlight
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    // Back to top
    btt.classList.toggle('show', window.scrollY > 400);
  }

  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ══════════════════════════════════════════════════════════
   6. MOBILE HAMBURGER MENU
══════════════════════════════════════════════════════════ */
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    }
  });
})();


/* ══════════════════════════════════════════════════════════
   7. TYPED TEXT ANIMATION
══════════════════════════════════════════════════════════ */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Cybersecurity Student',
    'Ethical Hacker in Training',
    'Network Security Enthusiast',
    'CTF Player & Problem Solver',
    'Defender of the Digital World',
    'Penetration Tester (Learning)',
  ];
  window._typedPhrases = phrases;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  const typeSpeed   = 90;
  const deleteSpeed = 50;
  const pauseMs     = 2200;

  function tick() {
    if (paused) return;

    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; tick(); }, pauseMs);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  }

  setTimeout(tick, 1600);
})();


/* ══════════════════════════════════════════════════════════
   8. SCROLL REVEAL
══════════════════════════════════════════════════════════ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════
   9. COUNTER ANIMATION (hero stats)
══════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  let animated = false;

  function animateCounter(el, target) {
    let current  = 0;
    const dur    = 1200;
    const step   = Math.ceil(target / (dur / 30));
    const intv   = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + '+';
      if (current >= target) clearInterval(intv);
    }, 30);
  }

  const hero = document.getElementById('hero');

  function checkTrigger() {
    if (animated || !hero) return;
    if (window.scrollY < hero.offsetHeight * 0.5) {
      counters.forEach(el => animateCounter(el, parseInt(el.dataset.target)));
      animated = true;
    }
  }

  // Start on load after a delay
  setTimeout(() => {
    if (!animated) {
      counters.forEach(el => animateCounter(el, parseInt(el.dataset.target)));
      animated = true;
    }
  }, 1500);

  window.addEventListener('scroll', checkTrigger, { passive: true });
})();


/* ══════════════════════════════════════════════════════════
   10. SKILL FILTER
══════════════════════════════════════════════════════════ */
(function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.skill-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards with animation
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.style.display = '';
          // Re-trigger reveal
          setTimeout(() => card.classList.add('visible'), 10);
        } else {
          card.classList.remove('visible');
          setTimeout(() => { card.style.display = 'none'; }, 350);
        }
      });
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   11. CONTACT FORM VALIDATION & SUBMIT
══════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn= document.getElementById('form-submit');
  const submitTxt= document.getElementById('submit-text');

  if (!form) return;

  // Real-time validation helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errorId);
    if (!input || !err) return false;
    if (msg) {
      input.classList.add('invalid');
      err.textContent = msg;
      return false;
    }
    input.classList.remove('invalid');
    err.textContent = '';
    return true;
  }

  // Live validation on blur
  const fName    = document.getElementById('f-name');
  const fEmail   = document.getElementById('f-email');
  const fMessage = document.getElementById('f-message');

  if (fName) {
    fName.addEventListener('blur', () => {
      setError('f-name', 'err-name', fName.value.trim() ? '' : '// Name is required');
    });
  }

  if (fEmail) {
    fEmail.addEventListener('blur', () => {
      const v = fEmail.value.trim();
      setError('f-email', 'err-email',
        !v ? '// Email is required' :
        !validateEmail(v) ? '// Enter a valid email address' : ''
      );
    });
  }

  if (fMessage) {
    fMessage.addEventListener('blur', () => {
      setError('f-message', 'err-message', fMessage.value.trim() ? '' : '// Message cannot be empty');
    });
  }

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('f-name').value.trim();
    const email   = document.getElementById('f-email').value.trim();
    const subject = document.getElementById('f-subject')?.value.trim() || '';
    const message = document.getElementById('f-message').value.trim();

    // Validate all
    const nameOk    = setError('f-name',    'err-name',    name    ? '' : '// Name is required');
    const emailOk   = setError('f-email',   'err-email',   !email  ? '// Email is required' : !validateEmail(email) ? '// Valid email required' : '');
    const messageOk = setError('f-message', 'err-message', message ? '' : '// Message cannot be empty');

    if (!nameOk || !emailOk || !messageOk) {
      showFeedback('// Please fix the errors above.', 'error');
      return;
    }

    // Simulate sending (mailto fallback)
    submitBtn.disabled  = true;
    submitTxt.textContent = 'Sending...';

    setTimeout(() => {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const href = `mailto:libineshraja1@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact from ' + name)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;

      submitBtn.disabled  = false;
      submitTxt.textContent = 'SEND MESSAGE →';
      showFeedback('// Message drafted — your email client should open.', 'success');
      form.reset();
    }, 800);
  });

  function showFeedback(msg, type) {
    feedback.textContent  = msg;
    feedback.className    = 'form-feedback ' + type;
    setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 6000);
  }
})();


/* ══════════════════════════════════════════════════════════
   12. SMOOTH SCROLL (for older browsers / anchor links)
══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   13. PROFILE FRAME GLITCH EFFECT (hover)
══════════════════════════════════════════════════════════ */
(function initGlitch() {
  const frame = document.getElementById('profile-frame');
  if (!frame) return;

  frame.addEventListener('mouseenter', () => {
    let flicker = 0;
    const iv = setInterval(() => {
      frame.style.filter = flicker % 2 === 0
        ? 'brightness(1.15) hue-rotate(5deg)'
        : 'brightness(0.95) hue-rotate(-5deg)';
      flicker++;
      if (flicker > 6) {
        clearInterval(iv);
        frame.style.filter = '';
      }
    }, 60);
  });
})();


/* ══════════════════════════════════════════════════════════
   14. SKILL TAG RIPPLE EFFECT (click)
══════════════════════════════════════════════════════════ */
(function initTagRipple() {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.style.cssText = `
        position:absolute; border-radius:50%;
        width:6px; height:6px;
        background: rgba(0,255,231,0.6);
        transform: translate(-50%,-50%) scale(0);
        animation: rippleAnim 0.5s ease-out forwards;
        pointer-events:none; left:${e.offsetX}px; top:${e.offsetY}px;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  // Inject ripple keyframes
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `
      @keyframes rippleAnim {
        to { transform: translate(-50%,-50%) scale(20); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
})();


/* ══════════════════════════════════════════════════════════
   15. ACTIVE SECTION TRACKING FOR TITLE
══════════════════════════════════════════════════════════ */
(function initTitleTracker() {
  const sectionTitles = {
    hero:           'LIBINESH R U | Cybersecurity Portfolio',
    about:          'About | LIBINESH R U',
    skills:         'Skills | LIBINESH R U',
    projects:       'Projects | LIBINESH R U',
    certifications: 'Certifications | LIBINESH R U',
    contact:        'Contact | LIBINESH R U',
  };

  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = 'hero';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    if (sectionTitles[current]) {
      document.title = sectionTitles[current];
    }
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════
   16. KEYBOARD NAVIGATION EASTER EGG
   Type "hack" anywhere to trigger a fun console message
   Ctrl+Shift+A → secret admin panel
══════════════════════════════════════════════════════════ */
(function initEasterEgg() {
  let buffer = '';
  const secret = 'hack';

  document.addEventListener('keydown', e => {
    // Secret admin shortcut: Ctrl + Shift + A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      window.location.href = 'admin.html';
      return;
    }

    buffer = (buffer + e.key).slice(-secret.length);
    if (buffer === secret) {
      console.log(
        '%c[LIBINESH_SYSTEM] > Access granted. Nice try, hacker 👾',
        'color: #00ffe7; font-family: monospace; font-size: 14px; background: #050a0e; padding: 8px 12px;'
      );
      console.log(
        '%cIf you found this, you might be the right person to hire!\nlibineshraja1@gmail.com',
        'color: #00ff88; font-family: monospace; font-size: 12px;'
      );
    }
  });

  // Mobile: Tap nav logo 5 times quickly to open admin
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    let tapCount = 0;
    let tapTimer = null;
    logo.addEventListener('click', e => {
      tapCount++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => { tapCount = 0; }, 1500);
      if (tapCount >= 5) {
        tapCount = 0;
        e.preventDefault();
        window.location.href = 'admin.html';
      }
    });
  }
})();


/* ══════════════════════════════════════════════════════════
   17. PERFORMANCE — pause matrix when tab is hidden
══════════════════════════════════════════════════════════ */
(function initVisibilityOptimize() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  document.addEventListener('visibilitychange', () => {
    canvas.style.opacity = document.hidden ? '0' : '0.07';
  });
})();


/* ══════════════════════════════════════════════════════════
   18. ADMIN DATA OVERRIDE — reads from localStorage
   (Set via hidden admin.html panel)
══════════════════════════════════════════════════════════ */
(function applyAdminData() {
  const raw = localStorage.getItem('portfolio_data');
  if (!raw) return;

  try {
    const d = JSON.parse(raw);

    // ── Hero ──
    if (d.hero) {
      const nameEl = document.querySelector('.hero-name');
      if (nameEl && d.hero.firstname) {
        nameEl.innerHTML = `${d.hero.firstname} <span class="hero-name-accent">${d.hero.lastname || ''}</span>`;
      }
      const descEl = document.querySelector('.hero-desc');
      if (descEl && d.hero.desc) descEl.innerHTML = d.hero.desc;

      // Update typed phrases
      if (d.hero.roles) {
        const phrases = d.hero.roles.split(',').map(s => s.trim()).filter(Boolean);
        if (phrases.length && window._typedPhrases) {
          window._typedPhrases.length = 0;
          phrases.forEach(p => window._typedPhrases.push(p));
        }
      }

      // Stats
      const statNums = document.querySelectorAll('.stat-num[data-target]');
      const statLabels = document.querySelectorAll('.stat-label');
      if (d.hero.stat1 && statNums[0]) statNums[0].setAttribute('data-target', d.hero.stat1);
      if (d.hero.stat1Label && statLabels[0]) statLabels[0].textContent = d.hero.stat1Label;
      if (d.hero.stat2 && statNums[1]) statNums[1].setAttribute('data-target', d.hero.stat2);
      if (d.hero.stat2Label && statLabels[1]) statLabels[1].textContent = d.hero.stat2Label;
    }

    // ── About ──
    if (d.about) {
      const aboutPs = document.querySelectorAll('.about-text p');
      if (aboutPs[0] && d.about.p1) aboutPs[0].innerHTML = d.about.p1;
      if (aboutPs[1] && d.about.p2) aboutPs[1].innerHTML = d.about.p2;
      if (aboutPs[2] && d.about.p3) aboutPs[2].innerHTML = d.about.p3;

      const detailValues = document.querySelectorAll('.detail-value');
      if (detailValues[0] && d.about.degree)   detailValues[0].textContent = d.about.degree;
      if (detailValues[1] && d.about.location)  detailValues[1].textContent = d.about.location;
      if (detailValues[2] && d.about.status)    detailValues[2].textContent = d.about.status;
      if (detailValues[3] && d.about.focus)     detailValues[3].textContent = d.about.focus;
      if (detailValues[4] && d.about.email)     detailValues[4].textContent = d.about.email;
      if (detailValues[5] && d.about.hobbies)   detailValues[5].textContent = d.about.hobbies;
    }

    // ── Contact ──
    if (d.contact) {
      const heading = document.querySelector('.contact-heading');
      if (heading && d.contact.heading) heading.textContent = d.contact.heading;
      const sub = document.querySelector('.contact-sub');
      if (sub && d.contact.desc) sub.textContent = d.contact.desc;

      const cliValues = document.querySelectorAll('.cli-value');
      if (cliValues[0] && d.contact.email) cliValues[0].textContent = d.contact.email;
      if (cliValues[1] && d.contact.github) cliValues[1].textContent = d.contact.github.replace('https://','');
      if (cliValues[2] && d.contact.linkedin) cliValues[2].textContent = d.contact.linkedin.replace('https://','');
      if (cliValues[3] && d.contact.thm) cliValues[3].textContent = d.contact.thm;
    }

  } catch (e) {
    console.warn('[Admin Override] Failed to apply data:', e);
  }
})();


/* ══════════════════════════════════════════════════════════
   19. CONSOLE SIGNATURE
══════════════════════════════════════════════════════════ */
console.log(
  '%c\n██╗     ██╗██████╗ ██╗███╗   ██╗███████╗███████╗██╗  ██╗\n██║     ██║██╔══██╗██║████╗  ██║██╔════╝██╔════╝██║  ██║\n██║     ██║██████╔╝██║██╔██╗ ██║█████╗  ███████╗███████║\n██║     ██║██╔══██╗██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║\n███████╗██║██████╔╝██║██║ ╚████║███████╗███████║██║  ██║\n╚══════╝╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝\n',
  'color: #00ffe7; font-family: monospace;'
);
console.log(
  '%c Cybersecurity Portfolio | libineshraja1@gmail.com ',
  'background: #00ffe7; color: #050a0e; font-family: monospace; font-weight: bold; padding: 4px 8px;'
);
