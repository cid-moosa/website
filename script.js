/* ========================================
   GIAL — Core Interactivity & Advanced Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');
  const overlay = document.getElementById('menu-overlay');
  
  function toggleMenu() {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  }

  if (toggle && menu && overlay) {
    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.navbar__menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('open')) toggleMenu();
      });
    });
  }

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Sticky Scroll Storytelling Animation (2-Second Continuous Cinematic Translation with LERP Physics) ---
  const heroScrollContainer = document.getElementById('hero-scroll-container');
  const heroCampusPhoto = document.getElementById('hero-campus-photo');
  const heroRevealContent = document.getElementById('hero-reveal-content');
  const heroVignette = document.getElementById('hero-cinematic-vignette');

  if (heroScrollContainer && heroCampusPhoto && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;

    // Smooth cubic ease out
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    const renderHeroFrame = () => {
      // Lerp physics: smoothly glide currentProgress toward targetProgress over time
      currentProgress += (targetProgress - currentProgress) * 0.09;
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      const progress = currentProgress;

      // Phase 1: 0.00 -> 0.06 (Initial Unobstructed Campus Panorama)
      if (progress <= 0.06) {
        if (heroRevealContent) {
          heroRevealContent.style.opacity = 0;
          heroRevealContent.style.transform = 'translateY(60px)';
          heroRevealContent.style.pointerEvents = 'none';
        }
        heroCampusPhoto.style.opacity = 1;
        heroCampusPhoto.style.transform = 'scale(1)';
        if (heroVignette) {
          heroVignette.style.opacity = 0.15;
        }
      }
      // Phase 2: 0.06 -> 0.52 (The Grand 2-Second Cinematic Scroll Translation)
      else if (progress > 0.06 && progress <= 0.52) {
        const rawP = (progress - 0.06) / 0.46; // 0 to 1 over ~600px of scroll space
        const eased = easeOutCubic(rawP);

        if (heroRevealContent) {
          heroRevealContent.style.opacity = eased;
          const translateY = (1 - eased) * 60;
          heroRevealContent.style.transform = `translateY(${translateY}px)`;
          heroRevealContent.style.pointerEvents = eased > 0.7 ? 'auto' : 'none';
        }

        // Camera slow cinematic push-in
        heroCampusPhoto.style.opacity = 1;
        heroCampusPhoto.style.transform = `scale(${1 + eased * 0.045})`;

        if (heroVignette) {
          heroVignette.style.opacity = 0.15 + eased * 0.60;
        }
      }
      // Phase 3: 0.52 -> 0.78 (The Stable Reading & Interaction Zone)
      else if (progress > 0.52 && progress <= 0.78) {
        const holdProgress = (progress - 0.52) / 0.26;
        if (heroRevealContent) {
          heroRevealContent.style.opacity = 1;
          heroRevealContent.style.transform = 'translateY(0px)';
          heroRevealContent.style.pointerEvents = 'auto';
        }

        heroCampusPhoto.style.opacity = 1;
        heroCampusPhoto.style.transform = `scale(${1.045 + holdProgress * 0.015})`;

        if (heroVignette) {
          heroVignette.style.opacity = 0.75;
        }
      }
      // Phase 4: 0.78 -> 1.00 (Seamless Docking into About Us)
      else {
        const p4 = (progress - 0.78) / 0.22;
        const fadeOut = Math.max(0, 1 - Math.pow(p4, 1.2) * 1.35);

        heroCampusPhoto.style.opacity = fadeOut;
        heroCampusPhoto.style.transform = `scale(${1.06 + p4 * 0.03}) translateY(${p4 * -20}px)`;

        if (heroRevealContent) {
          heroRevealContent.style.opacity = Math.max(0, 1 - p4 * 1.4);
          heroRevealContent.style.transform = `translateY(${p4 * -30}px)`;
          heroRevealContent.style.pointerEvents = p4 < 0.3 ? 'auto' : 'none';
        }

        if (heroVignette) {
          heroVignette.style.opacity = Math.max(0, 0.75 - p4 * 0.75);
        }
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0001) {
        requestAnimationFrame(renderHeroFrame);
      } else {
        isRunning = false;
      }
    };

    const updateHeroScrollTarget = () => {
      const rect = heroScrollContainer.getBoundingClientRect();
      const containerHeight = heroScrollContainer.clientHeight;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;
      
      const scrollOffset = -rect.top;
      const rawProgress = scrollOffset / (totalScrollable > 0 ? totalScrollable : windowHeight);
      targetProgress = Math.max(0, Math.min(1, rawProgress));

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(renderHeroFrame);
      }
    };

    window.addEventListener('scroll', updateHeroScrollTarget, { passive: true });
    updateHeroScrollTarget();
  }

  // --- Clean Card Elevation & Spotlight Hover Effect (No 3D Tilt Distortion) ---
  const initCardHoverEffects = () => {
    const cards = document.querySelectorAll('.tilt-card, .vm-card, .stats__item');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const shine = card.querySelector('.tilt-card__shine');
        if (shine) {
          shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(52, 211, 153, 0.18) 0%, transparent 65%)`;
        }
      });
      card.addEventListener('mouseleave', () => {
        const shine = card.querySelector('.tilt-card__shine');
        if (shine) shine.style.background = 'transparent';
      });
    });
  };
  initCardHoverEffects();

  // --- Scroll Reveal via Intersection Observer ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '50px 0px 50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // Smooth in-page navigation with instant reveal of target section
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          targetEl.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => el.classList.add('visible'));
        }
      }
    });
  });

  // Handle URL hash on initial page load
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        targetEl.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => el.classList.add('visible'));
      }, 120);
    }
  }

  // --- Active Section Navbar Scroll Spy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__menu a[href^="#"]');
  if (sections.length > 0 && navLinks.length > 0) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}` || (id === 'hero-scroll-container' && href === '#')) {
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach(sec => spyObserver.observe(sec));
  }



  // --- Dynamic Faculty Grid with Official College Photos & Designations ---
  const facultyGrid = document.getElementById('faculty-grid');
  if (facultyGrid && window.GIAL_PROGRAMS) {
    const programs = window.GIAL_PROGRAMS;
    const allFaculties = [];
    const seenNames = new Set();

    Object.values(programs).forEach(prog => {
      let deptKey = 'management';
      if (prog.dept.includes('Commerce')) deptKey = 'commerce';
      else if (prog.dept.includes('Computer')) deptKey = 'computer';
      else if (prog.dept.includes('Psychology')) deptKey = 'science';
      else if (prog.dept.includes('Social Work')) deptKey = 'social';

      (prog.faculties || []).forEach(f => {
        const uniqueKey = f.name.trim().toLowerCase();
        if (!seenNames.has(uniqueKey)) {
          seenNames.add(uniqueKey);
          allFaculties.push({
            ...f,
            dept: deptKey,
            deptName: prog.dept,
            programName: prog.shortTitle
          });
        }
      });
    });

    facultyGrid.innerHTML = allFaculties.map((f, idx) => {
      const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=10b981&color=fff&size=200`;
      const imgSrc = f.image && f.image.trim() !== '' ? f.image : fallbackImg;
      const designationText = f.designation || 'Assistant Professor';
      return `
        <div class="flip-card reveal" data-dept="${f.dept}" data-fac-index="${idx}" style="cursor: pointer;" title="Click to view full faculty profile">
          <div class="flip-card__inner">
            <div class="flip-card__front">
              <div style="height: 190px; overflow: hidden; background: var(--clr-primary-900);">
                <img 
                  src="${imgSrc}" 
                  alt="${f.name}" 
                  style="width: 100%; height: 100%; object-fit: cover;"
                  onerror="this.onerror=null;this.src='${fallbackImg}';"
                  loading="lazy"
                >
              </div>
              <div class="flip-card__front-info">
                <h4>${f.name}</h4>
                <p style="color: var(--clr-accent-400); font-weight: 700;">${designationText}</p>
              </div>
            </div>
            <div class="flip-card__back">
              <h4>${f.name}</h4>
              <p style="color: var(--clr-accent-400); font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">${designationText}</p>
              <p style="font-size: 0.8rem; margin-bottom: 0.75rem;">Department of ${f.deptName}</p>
              ${f.contact ? `<p style="font-size: 0.75rem; color: #fff; background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; margin-bottom: 0.75rem;">📞 ${f.contact}</p>` : ''}
              <button class="btn btn-sm btn-primary" style="font-size: 0.75rem; padding: 4px 10px;">View Full Profile ↗</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Click Handlers to Open Faculty Profile Modal
    const facModalOverlay = document.getElementById('faculty-profile-modal');
    const facModalClose = document.getElementById('faculty-modal-close');

    function openFacultyModal(f) {
      if (!facModalOverlay) return;

      const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=10b981&color=fff&size=200`;
      const imgSrc = f.image && f.image.trim() !== '' ? f.image : fallbackImg;

      document.getElementById('modal-fac-img').src = imgSrc;
      document.getElementById('modal-fac-img').onerror = () => {
        document.getElementById('modal-fac-img').src = fallbackImg;
      };
      document.getElementById('modal-fac-name').textContent = f.name;
      document.getElementById('modal-fac-designation').textContent = f.designation || 'Assistant Professor';
      document.getElementById('modal-fac-dept').textContent = `Department of ${f.deptName || 'Academics'}`;
      document.getElementById('modal-fac-edu').textContent = f.education || 'Master Degree / UGC-NET';
      document.getElementById('modal-fac-area').textContent = f.area || 'Academic Teaching & Research';
      document.getElementById('modal-fac-phone').textContent = f.contact || '+91 7592802949 / 0481 2574255';
      
      const emailEl = document.getElementById('modal-fac-email');
      if (emailEl) emailEl.textContent = f.email || 'girideepamcollege@gmail.com';
      const emailBtn = document.getElementById('modal-fac-email-btn');
      if (emailBtn) emailBtn.href = `mailto:${f.email || 'girideepamcollege@gmail.com'}`;
      
      const bioSec = document.getElementById('modal-fac-bio-sec');
      const bioText = document.getElementById('modal-fac-bio');
      if (f.bio && f.bio.trim() !== '') {
        bioSec.style.display = 'block';
        bioText.textContent = f.bio;
      } else {
        bioSec.style.display = 'block';
        bioText.textContent = `${f.name} is a faculty member in the Department of ${f.deptName} at Girideepam Institute of Advanced Learning.`;
      }

      if (f.contact) {
        document.getElementById('modal-fac-call-btn').href = `tel:${f.contact.replace(/\s+/g, '')}`;
      } else {
        document.getElementById('modal-fac-call-btn').href = 'tel:+917592802949';
      }

      facModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeFacultyModal() {
      if (!facModalOverlay) return;
      facModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    facultyGrid.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-fac-index'));
        const f = allFaculties[idx];
        if (f) openFacultyModal(f);
      });
    });

    if (facModalClose) facModalClose.addEventListener('click', closeFacultyModal);
    if (facModalOverlay) {
      facModalOverlay.addEventListener('click', (e) => {
        if (e.target === facModalOverlay) closeFacultyModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeFacultyModal();
    });

    // Faculty Department Filter Tabs
    const facultyFilters = document.querySelectorAll('.faculty__filter');
    facultyFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        facultyFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const dept = btn.getAttribute('data-dept');
        facultyGrid.querySelectorAll('.flip-card').forEach(card => {
          if (dept === 'all' || card.getAttribute('data-dept') === dept) {
            card.style.display = 'block';
            card.classList.add('visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Re-observe newly added faculty cards
    facultyGrid.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
      el.classList.add('visible');
    });
  }

  // --- Site-wide Interactive Constellation Particle Mesh (Everywhere) ---
  const canvas = document.getElementById('global-particle-canvas') || document.getElementById('particle-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const mouse = { x: null, y: null, radius: 170 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#22c55e', '#a855f7', '#38bdf8', '#fb923c'];
    const emojis = ['💼', '💻', '🛡️', '🧠', '📊', '✈️', '🤝'];

    const count = Math.min(125, Math.max(70, Math.floor((width * height) / 11000)));
    for (let i = 0; i < count; i++) {
      const isEmoji = Math.random() > 0.85; // 15% chance to be an emoji
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        size: isEmoji ? Math.random() * 10 + 14 : Math.random() * 2.4 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: isEmoji ? 'emoji' : 'dot',
        emoji: isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : null
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Mouse Repulsion & Dynamic Linking
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            p.x -= (dx / distance) * force * 3.5;
            p.y -= (dy / distance) * force * 3.5;
            
            // Draw interactive connector to cursor
            ctx.beginPath();
            ctx.strokeStyle = `hsla(155, 75%, 65%, ${(1 - distance/mouse.radius) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        
        if (p.type === 'emoji') {
          ctx.font = `${p.size}px Arial`;
          ctx.fillText(p.emoji, p.x - p.size/2, p.y + p.size/2);
        } else {
          // Draw Glowing Particle Node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        // Inter-particle Connecting Constellation Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 135) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(155, 60%, 60%, ${(1 - dist/135) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // --- Number Counter Animation ---
  const stats = document.querySelectorAll('.about__stat-number, .stats__number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            el.innerHTML = Math.ceil(current) + (el.querySelector('.stats__suffix')?.outerHTML || '');
            requestAnimationFrame(updateCounter);
          } else {
            el.innerHTML = target + (el.querySelector('.stats__suffix')?.outerHTML || '');
          }
        };
        updateCounter();
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach(stat => statsObserver.observe(stat));

  // --- Magnetic Buttons ---
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // --- Program Cards: Direct Click to Dedicated Portal ---
  const programCards = document.querySelectorAll('.program-card');
  programCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      const key = card.getAttribute('data-program-key');
      if (key) {
        window.location.href = `program.html?id=${key}`;
      }
    });
  });

  // --- Photo Gallery Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const galleryItems = document.querySelectorAll('.gallery__item');
  let currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    const item = galleryItems[index];
    lightboxImg.src = item.querySelector('img').src;
    lightboxCaption.textContent = item.getAttribute('data-caption');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => {
    openLightbox((currentImageIndex - 1 + galleryItems.length) % galleryItems.length);
  });
  document.getElementById('lightbox-next')?.addEventListener('click', () => {
    openLightbox((currentImageIndex + 1) % galleryItems.length);
  });

  // --- Filters (Programs & Faculty) ---
  function setupFilter(tabClass, gridSelector, itemClass, dataAttr) {
    const tabs = document.querySelectorAll(tabClass);
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.getAttribute(dataAttr);
        const items = document.querySelectorAll(itemClass);
        
        items.forEach(item => {
          const match = filter === 'all' || item.getAttribute('data-category') === filter || item.getAttribute('data-dept') === filter;
          if (match) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              if (item.style.opacity === '0') item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }
  
  setupFilter('.programs__tab', '#programs-grid', '.program-card', 'data-filter');
  setupFilter('.faculty__filter', '#faculty-grid', '.flip-card', 'data-dept');

  // --- API Form Submissions ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('contact-submit');
      const formSuccess = document.getElementById('form-success');
      submitBtn.classList.add('loading');
      
      const data = {
        firstName: document.getElementById('contact-fname').value,
        lastName: document.getElementById('contact-lname').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        message: document.getElementById('contact-message').value
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
        } else {
          alert('Failed to send message. Please check input fields.');
        }
      } catch (err) {
        alert('Network error. Is the server running?');
      } finally {
        submitBtn.classList.remove('loading');
      }
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      const msgLabel = document.getElementById('newsletter-msg');
      const btn = newsletterForm.querySelector('button');
      
      btn.classList.add('loading');
      msgLabel.textContent = '';
      
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const resData = await response.json();
        if (response.ok) {
          msgLabel.style.color = '#fff';
          msgLabel.textContent = '✅ ' + resData.message;
          newsletterForm.reset();
        } else {
          msgLabel.style.color = 'var(--clr-accent-500)';
          msgLabel.textContent = '❌ ' + resData.error;
        }
      } catch (err) {
        msgLabel.style.color = 'var(--clr-accent-500)';
        msgLabel.textContent = '❌ Network error.';
      } finally {
        btn.classList.remove('loading');
      }
    });
  }

  // --- Testimonials Auto-Slider ---
  const testTrack = document.getElementById('testimonial-track');
  const testDotsContainer = document.getElementById('testimonial-dots');
  if (testTrack && testDotsContainer) {
    const cards = testTrack.querySelectorAll('.testimonial-card');
    let index = 0;
    let interval;
    
    testDotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `testimonials__dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToTestimonial(i));
      testDotsContainer.appendChild(dot);
    });
    
    const dots = testDotsContainer.querySelectorAll('.testimonials__dot');

    function goToTestimonial(i) {
      index = i;
      testTrack.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    function nextTestimonial() {
      goToTestimonial((index + 1) % cards.length);
    }

    interval = setInterval(nextTestimonial, 4500);
    testTrack.addEventListener('mouseenter', () => clearInterval(interval));
    testTrack.addEventListener('mouseleave', () => interval = setInterval(nextTestimonial, 4500));
  }
});


/* =============================================
   TRENDING 2025/2026 INTERACTION ENGINES
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // Skip all trending animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // --- 1. Enhanced Scroll Reveal with IntersectionObserver & Stagger ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve stagger containers so children can animate
        if (!entry.target.hasAttribute('data-stagger-reveal')) {
          revealObserver.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up, .reveal-fade, .reveal-zoom, .reveal-rotate, .clip-reveal, .clip-reveal-left, .clip-reveal-circle, [data-stagger-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  // Auto-tag cards in grids as reveal-up for free scroll animations
  document.querySelectorAll('.programs__grid, .faculty__grid, .clubs__grid, .facilities__grid, .stats__grid, .news__grid, .vm__grid, .student-life__grid, .recruiters-grid, .downloads__grid').forEach(grid => {
    if (!grid.hasAttribute('data-stagger-reveal')) {
      grid.setAttribute('data-stagger-reveal', '');
      revealObserver.observe(grid);
    }
  });

  // Auto-tag section titles as reveal-up
  document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-up')) {
      el.classList.add('reveal-up');
      revealObserver.observe(el);
    }
  });


  // --- 2. 3D Card Tilt on Hover ---
  document.querySelectorAll('.program-card, .stats__item, .vm-card, .news-card').forEach(card => {
    card.setAttribute('data-tilt', '');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });


  // --- 3. Magnetic Button Hover ---
  document.querySelectorAll('.btn-primary, .btn-outline, .btn-more-outline').forEach(btn => {
    btn.classList.add('magnetic-btn');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });


  // --- 4. Ripple Effect on Button Click ---
  document.querySelectorAll('.btn, .btn-primary, .btn-outline, .btn-more-outline, .faculty__filter, .programs__tab').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  // --- 5. Animated Number Counter ---
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        
        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuart(progress);
          const current = Math.round(easedProgress * target);
          el.textContent = current.toLocaleString() + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }
        
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  // Auto-detect stat numbers and attach counter
  document.querySelectorAll('.stats__number').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^([\d,]+)(.*)$/);
    if (match) {
      const num = parseInt(match[1].replace(/,/g, ''), 10);
      const suffix = match[2] || '';
      el.setAttribute('data-count', num);
      el.setAttribute('data-suffix', suffix);
      el.textContent = '0' + suffix;
      counterObserver.observe(el);
    }
  });

  // Also handle about__stat-number
  document.querySelectorAll('.about__stat-number').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^([\d,]+)(.*)$/);
    if (match) {
      const num = parseInt(match[1].replace(/,/g, ''), 10);
      const suffix = match[2] || '';
      el.setAttribute('data-count', num);
      el.setAttribute('data-suffix', suffix);
      el.textContent = '0' + suffix;
      counterObserver.observe(el);
    }
  });


  // --- 6. Text Scramble Cipher Decode on Section Titles ---
  const scrambleChars = '!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  function scrambleText(el) {
    const originalText = el.getAttribute('data-scramble') || el.textContent;
    el.setAttribute('data-scramble', originalText);
    const length = originalText.length;
    let iterations = 0;
    const maxIterations = length * 3;

    const interval = setInterval(() => {
      el.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations / 3) return char;
          if (char === ' ') return ' ';
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');
      
      iterations++;
      if (iterations > maxIterations) {
        el.textContent = originalText;
        clearInterval(interval);
      }
    }, 30);
  }

  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrambleText(entry.target);
        scrambleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Auto-attach scramble to section titles
  document.querySelectorAll('.section-title').forEach(el => {
    el.setAttribute('data-scramble', el.textContent);
    scrambleObserver.observe(el);
  });


  // --- 7. Floating Glow Orbs (Inject into DOM) ---
  for (let i = 1; i <= 3; i++) {
    const orb = document.createElement('div');
    orb.className = `glow-orb glow-orb--${i}`;
    orb.setAttribute('aria-hidden', 'true');
    document.body.appendChild(orb);
  }


  // --- 8. Smooth Parallax on Scroll for Background Elements ---
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Subtle parallax for glow orbs
        document.querySelectorAll('.glow-orb').forEach((orb, i) => {
          const speed = 0.02 + i * 0.01;
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });


  // --- 9. Page Entrance Animation ---
  document.body.classList.add('page-entrance');

});
