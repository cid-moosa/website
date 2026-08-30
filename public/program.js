// Dynamic Program Details Page Controller with Tabs Navigation & Animated Faculty Modal
function resolveProgramKey(rawId) {
  if (!rawId) return 'cyber';
  const clean = rawId.toLowerCase().trim().replace(/_/g, '-');
  
  if (window.GIAL_PROGRAMS && window.GIAL_PROGRAMS[clean]) {
    return clean;
  }
  
  const map = {
    'bba': 'bba',
    'management': 'bba',
    'mba': 'bba',
    'bba-management': 'bba',
    'bca': 'bca',
    'bca-software': 'bca',
    'bca-data-analytics': 'bca',
    'computer': 'bca',
    'computer-science': 'bca',
    'cs': 'bca',
    'cyber': 'cyber',
    'cyber-forensics': 'cyber',
    'bsc-cyber': 'cyber',
    'bsc-cyber-forensics': 'cyber',
    'cybersecurity': 'cyber',
    'psychology': 'psychology',
    'psych': 'psychology',
    'bsc-psychology': 'psychology',
    'bsc-psych': 'psychology',
    'bcom-acc': 'bcom-acc',
    'bcom-accounting': 'bcom-acc',
    'accounting': 'bcom-acc',
    'acc': 'bcom-acc',
    'bcom-fin': 'bcom-fin',
    'bcom-finance': 'bcom-fin',
    'bcom-taxation': 'bcom-fin',
    'finance': 'bcom-fin',
    'taxation': 'bcom-fin',
    'commerce': 'bcom-fin',
    'bcom': 'bcom-fin',
    'bcom-log': 'bcom-log',
    'bcom-logistics': 'bcom-log',
    'logistics': 'bcom-log',
    'supply-chain': 'bcom-log',
    'msw': 'msw',
    'social-work': 'msw',
    'master-of-social-work': 'msw',
    'mcom-fin': 'mcom-fin',
    'mcom-finance': 'mcom-fin',
    'mcom-taxation': 'mcom-fin',
    'mcom': 'mcom-fin',
    'mcom-mkt': 'mcom-mkt',
    'mcom-marketing': 'mcom-mkt',
    'mcom-international-business': 'mcom-mkt',
    'ib': 'mcom-mkt'
  };
  
  if (map[clean] && window.GIAL_PROGRAMS && window.GIAL_PROGRAMS[map[clean]]) {
    return map[clean];
  }
  
  if (window.GIAL_PROGRAMS) {
    for (const key of Object.keys(window.GIAL_PROGRAMS)) {
      if (clean.includes(key) || key.includes(clean)) {
        return key;
      }
    }
  }
  
  return 'cyber';
}

function initProgramPage() {
  const params = new URLSearchParams(window.location.search);
  const rawId = params.get('id');
  const programId = resolveProgramKey(rawId);

  if (!window.GIAL_PROGRAMS || !window.GIAL_PROGRAMS[programId]) {
    console.error('GIAL_PROGRAMS database not loaded or program not found.');
    return;
  }

  const data = window.GIAL_PROGRAMS[programId];

  // 1. Populate Meta & Titles
  document.title = `${data.title} — Girideepam Institute of Advanced Learning`;
  const crumbEl = document.getElementById('prog-breadcrumb');
  if (crumbEl) crumbEl.textContent = data.title;

  // 2. Header & Hero Details
  const titleEl = document.getElementById('prog-title');
  if (titleEl) titleEl.textContent = data.title;

  const deptEl = document.getElementById('prog-dept');
  if (deptEl) deptEl.textContent = data.dept;

  const durEl = document.getElementById('prog-duration');
  if (durEl) durEl.textContent = data.duration || '3 Years (6 Semesters)';

  const affEl = document.getElementById('prog-affiliation');
  if (affEl) affEl.textContent = 'MG University CBCS';

  const badgeEl = document.getElementById('prog-badge');
  if (badgeEl) {
    badgeEl.textContent = data.duration && data.duration.includes('2 Years') ? 'Postgraduate Degree' : 'Undergraduate Degree';
  }

  const tagEl = document.getElementById('prog-tagline');
  if (tagEl) {
    tagEl.textContent = data.overview ? (data.overview.split('.')[0] + '.') : 'Excellence in Academic Education & Professional Practice.';
  }

  // 3. Overview & Objectives (PEOs)
  const overviewEl = document.getElementById('prog-overview');
  if (overviewEl) {
    overviewEl.textContent = data.overview || 'Comprehensive degree program affiliated with Mahatma Gandhi University.';
  }

  const eligDetailEl = document.getElementById('prog-eligibility');
  if (eligDetailEl) {
    eligDetailEl.textContent = data.eligibility || '+2 Higher Secondary or equivalent with 45% aggregate.';
  }

  const objList = document.getElementById('prog-objectives');
  if (objList) {
    if (Array.isArray(data.objectives) && data.objectives.length > 0) {
      objList.innerHTML = data.objectives.map((obj, idx) => `
        <div class="feature-box" style="background: rgba(2, 18, 12, 0.65); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; padding: 1.25rem;">
          <h3 class="feature-box__title" style="color: var(--clr-accent-400); font-size: 1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>🎯</span> Objective ${idx + 1}
          </h3>
          <p class="feature-box__desc" style="color: var(--clr-text-secondary); font-size: 0.9rem; line-height: 1.6;">${obj}</p>
        </div>
      `).join('');
    } else {
      objList.innerHTML = `
        <div class="feature-box" style="background: rgba(2, 18, 12, 0.65); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; padding: 1.25rem;">
          <h3 class="feature-box__title" style="color: var(--clr-accent-400); font-size: 1rem; margin-bottom: 0.5rem;">🎯 Academic Rigor</h3>
          <p class="feature-box__desc" style="color: var(--clr-text-secondary); font-size: 0.9rem; line-height: 1.6;">Deliver high-caliber academic foundation and specialized domain proficiency.</p>
        </div>
      `;
    }
  }

  // 4. 3D Concept Thumbnail with Domain HUD
  const thumbWrap = document.getElementById('prog-thumb-wrap');
  if (thumbWrap) {
    let imgFile = 'bba.jpg';
    if (programId.includes('bca')) imgFile = 'bca.jpg';
    else if (programId.includes('cyber')) imgFile = 'cyber.jpg';
    else if (programId.includes('psych')) imgFile = 'psychology.jpg';
    else if (programId.includes('log')) imgFile = 'logistics.jpg';
    else if (programId.includes('msw')) imgFile = 'msw.jpg';
    else if (programId.includes('com') || programId.includes('acc') || programId.includes('fin')) imgFile = 'commerce.jpg';

    thumbWrap.innerHTML = `
      <div style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: inherit;">
        <span class="hud-corner hud-corner--tl"></span>
        <span class="hud-corner hud-corner--tr"></span>
        <span class="hud-corner hud-corner--bl"></span>
        <span class="hud-corner hud-corner--br"></span>
        <div class="program-card__scanline" style="opacity: 1; animation: scanBeam 2.5s infinite linear;"></div>
        <img 
          src="images/programs/${imgFile}" 
          alt="${data.title} Concept Render" 
          class="prog-hero__thumb"
          onerror="this.src='images/campus-hero.jpg'"
        >
      </div>
    `;
  }

  // 5. Curriculum & Syllabus (Semester-by-Semester Grid)
  const currContainer = document.getElementById('prog-curriculum-grid');
  if (currContainer) {
    if (Array.isArray(data.curriculum) && data.curriculum.length > 0) {
      currContainer.innerHTML = data.curriculum.map(sem => `
        <div class="sem-card">
          <div class="sem-card__header">
            <span class="sem-card__title">${sem.sem}</span>
            <span style="font-size:0.75rem; color:var(--clr-accent-400); font-weight:700;">MG University CBCS</span>
          </div>
          <ul class="sem-card__list">
            ${sem.subjects.map(sub => `<li class="sem-card__item">${sub}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    } else {
      currContainer.innerHTML = '<p style="color: var(--clr-text-muted);">Curriculum framework structured according to MG University regulations.</p>';
    }
  }

  // 6. Faculty Directory with Official Photos, Designations & Interactive Modal
  const facContainer = document.getElementById('prog-faculty-list');
  const facModalOverlay = document.getElementById('faculty-profile-modal');
  const facModalCard = document.getElementById('faculty-modal-card');
  const facModalClose = document.getElementById('faculty-modal-close');

  // Live Cyber / Monospace Cipher Scramble Text Decryptor
  function scrambleDecrypt(element, targetText, durationMs = 380) {
    if (!element || !targetText) return;
    const cipherChars = '01X9#$<>[]⚡🛡️%&*+-=ABCDEFﾊﾐﾋｰｳｼ';
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const resolvedLen = Math.floor(targetText.length * progress);
      
      let scrambled = targetText.slice(0, resolvedLen);
      for (let i = resolvedLen; i < targetText.length; i++) {
        if (targetText[i] === ' ') {
          scrambled += ' ';
        } else {
          scrambled += cipherChars.charAt(Math.floor(Math.random() * cipherChars.length));
        }
      }
      
      element.textContent = scrambled;
      
      if (progress >= 1) {
        clearInterval(interval);
        element.textContent = targetText;
      }
    }, 32);
  }

  function openFacultyModal(f, deptName) {
    if (!facModalOverlay) return;

    // Apply Specific Program Theme & HUD Telemetry to Modal Card
    let themeClass = 'modal--theme-cyber';
    let hudTag = '[ CYBER_FORENSICS // ENCRYPTED DOSSIER #0x4F7A ]';
    let hudStatus = '● BIO_VERIFIED [L5]';
    let avatarBadge = '⚡ AGENT ID: VERIFIED';
    let bioTitle = 'Declassified Operational Dossier';
    let callText = 'Direct Comms';
    let emailText = 'Transmit Dispatch';

    if (programId.includes('psych')) {
      themeClass = 'modal--theme-psychology';
      hudTag = '[ COGNITIVE_NEUROSCIENCE // RESEARCH DOSSIER ]';
      hudStatus = '● SYNAPSE_LINK [ACTIVE]';
      avatarBadge = '🧠 NEURAL RESEARCH ID';
      bioTitle = 'Academic Research Profile';
      callText = 'Contact Faculty';
      emailText = 'Send Academic Email';
    } else if (programId.includes('bca')) {
      themeClass = 'modal--theme-bca';
      hudTag = '[ KERNEL_DEV & CS // ARCHITECTURE DOSSIER ]';
      hudStatus = '● COMPILER_OK [STABLE]';
      avatarBadge = '💻 ARCHITECT ID: 0x88';
      bioTitle = 'Software & Lab Research Profile';
      callText = 'Direct Line';
      emailText = 'Send Code Query';
    } else if (programId.includes('log')) {
      themeClass = 'modal--theme-logistics';
      hudTag = '[ GLOBAL_SUPPLY_CHAIN // MARITIME LOGISTICS ]';
      hudStatus = '● ROUTE_LOCKED [TRANSIT]';
      avatarBadge = '⚓ LOGISTICS CHIEF';
      bioTitle = 'Trade & Industry Profile';
      callText = 'Call Logistics Office';
      emailText = 'Send Supply Query';
    } else if (programId.includes('bba')) {
      themeClass = 'modal--theme-bba';
      hudTag = '[ EXECUTIVE_MANAGEMENT // CORPORATE GOVERNANCE ]';
      hudStatus = '● STRATEGIC_ADVISOR [EXECUTIVE]';
      avatarBadge = '📈 STRATEGIC CHIEF';
      bioTitle = 'Corporate Leadership Profile';
      callText = 'Direct Line';
      emailText = 'Send Executive Mail';
    } else if (programId.includes('com') || programId.includes('fin') || programId.includes('tax')) {
      themeClass = 'modal--theme-commerce';
      hudTag = '[ FINANCIAL_FORENSICS // AUDIT & TAXATION ]';
      hudStatus = '● LEDGER_BALANCED [VERIFIED]';
      avatarBadge = '₹ FISCAL AUDITOR';
      bioTitle = 'Financial & Taxation Profile';
      callText = 'Call Finance Dept';
      emailText = 'Send Tax Query';
    } else if (programId.includes('msw')) {
      themeClass = 'modal--theme-msw';
      hudTag = '[ SOCIAL_WORK & COMMUNITY DEVELOPMENT ]';
      hudStatus = '● HUMANITARIAN_MISSION [ACTIVE]';
      avatarBadge = '🤝 FIELD DIRECTOR';
      bioTitle = 'Social Impact & Field Profile';
      callText = 'Contact Coordinator';
      emailText = 'Send Outreach Mail';
    }

    if (facModalCard) {
      facModalCard.className = `faculty-modal ${themeClass}`;
    }

    const bioTitleEl = document.getElementById('modal-bio-title-text');
    if (bioTitleEl) bioTitleEl.textContent = bioTitle;

    const callBtnText = document.getElementById('modal-call-btn-text');
    if (callBtnText) callBtnText.textContent = callText;

    const emailBtnText = document.getElementById('modal-email-btn-text');
    if (emailBtnText) emailBtnText.textContent = emailText;

    const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=10b981&color=fff&size=200`;
    const imgSrc = f.image && f.image.trim() !== '' ? f.image : fallbackImg;

    const imgEl = document.getElementById('modal-fac-img');
    if (imgEl) {
      imgEl.src = imgSrc;
      imgEl.onerror = () => { imgEl.src = fallbackImg; };
    }

    const nameEl = document.getElementById('modal-fac-name');
    if (nameEl) {
      scrambleDecrypt(nameEl, f.name, 360);
    }

    const desigEl = document.getElementById('modal-fac-designation');
    if (desigEl) {
      scrambleDecrypt(desigEl, f.designation || 'Assistant Professor', 320);
    }

    const deptModalEl = document.getElementById('modal-fac-dept');
    if (deptModalEl) deptModalEl.textContent = deptName || data.dept;

    const eduEl = document.getElementById('modal-fac-edu');
    if (eduEl) eduEl.textContent = f.education || 'Master Degree / UGC-NET';

    const areaEl = document.getElementById('modal-fac-area');
    if (areaEl) areaEl.textContent = f.area || 'Academic Teaching & Research';

    const phoneEl = document.getElementById('modal-fac-phone');
    const contactVal = f.contact && f.contact.trim() !== '' ? f.contact : '+91 7592802949 / 0481 2574255';
    if (phoneEl) phoneEl.textContent = contactVal;

    const emailEl = document.getElementById('modal-fac-email');
    if (emailEl) emailEl.textContent = f.email || 'girideepamcollege@gmail.com';
    const emailBtn = document.getElementById('modal-fac-email-btn');
    if (emailBtn) emailBtn.href = `mailto:${f.email || 'girideepamcollege@gmail.com'}`;

    const bioSec = document.getElementById('modal-fac-bio-sec');
    const bioText = document.getElementById('modal-fac-bio');
    if (bioSec && bioText) {
      bioSec.style.display = 'block';
      bioText.textContent = (f.bio && f.bio.trim() !== '') ? f.bio : `${f.name} is a distinguished faculty member in the ${deptName || data.dept} at Girideepam Institute of Advanced Learning.`;
    }

    const callBtn = document.getElementById('modal-fac-call-btn');
    if (callBtn) {
      const cleanPhone = (f.contact && f.contact.match(/\d+/g)) ? f.contact.replace(/[^\d+]/g, '') : '+917592802949';
      callBtn.href = `tel:${cleanPhone}`;
    }

    facModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFacultyModal() {
    if (!facModalOverlay) return;
    facModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (facContainer) {
    if (Array.isArray(data.faculties) && data.faculties.length > 0) {
      facContainer.innerHTML = data.faculties.map((f, idx) => {
        const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=10b981&color=fff&size=200`;
        const imgSrc = f.image && f.image.trim() !== '' ? f.image : fallbackImg;
        const designationText = f.designation || 'Assistant Professor';
        return `
          <div class="faculty-card-v2" data-fac-index="${idx}" style="cursor: pointer;" title="Click to view full faculty profile">
            <div class="faculty-card-v2__avatar-wrap">
              <img 
                src="${imgSrc}" 
                alt="${f.name}" 
                class="faculty-card-v2__avatar" 
                onerror="this.onerror=null;this.src='${fallbackImg}';"
              >
            </div>
            <h3 class="faculty-card-v2__name">${f.name}</h3>
            <p class="faculty-card-v2__role" style="color: var(--clr-accent-400); font-weight: 700;">${designationText}</p>
            <p style="font-size: 0.8rem; color: var(--clr-text-secondary); margin-bottom: 0.75rem;">${f.education || ''}</p>
            <div style="margin-top: auto; display: flex; gap: 0.5rem; justify-content: center; align-items: center;">
              <span style="font-size: 0.8rem; background: rgba(52, 211, 153, 0.18); color: #34d399; font-weight: 700; padding: 4px 12px; border-radius: 12px; border: 1px solid rgba(52, 211, 153, 0.35); transition: all 0.2s;">View Profile ↗</span>
            </div>
          </div>
        `;
      }).join('');

      // Attach Click Handlers to Open Profile Modal
      const facCards = facContainer.querySelectorAll('.faculty-card-v2');
      facCards.forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.getAttribute('data-fac-index'));
          const f = data.faculties[idx];
          if (f) openFacultyModal(f, data.dept);
        });
      });
    } else {
      facContainer.innerHTML = '<p style="color:var(--clr-text-muted);">Faculty details available via department office.</p>';
    }
  }

  // Modal Close Events
  if (facModalClose) {
    facModalClose.addEventListener('click', closeFacultyModal);
  }
  if (facModalOverlay) {
    facModalOverlay.addEventListener('click', (e) => {
      if (e.target === facModalOverlay) closeFacultyModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeFacultyModal();
  });

  // 7. Specialized Labs & Infrastructure
  const labsContainer = document.getElementById('prog-labs');
  if (labsContainer) {
    if (Array.isArray(data.labs) && data.labs.length > 0) {
      labsContainer.innerHTML = data.labs.map(lab => `
        <div class="feature-box" style="background: rgba(2, 18, 12, 0.65); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; padding: 1.5rem;">
          <h3 class="feature-box__title" style="color: #fff; font-size: 1.1rem; margin-bottom: 0.5rem;">🔬 ${lab.name}</h3>
          <p class="feature-box__desc" style="color: var(--clr-text-secondary); line-height: 1.6;">${lab.desc}</p>
        </div>
      `).join('');
    } else {
      labsContainer.innerHTML = `
        <div class="feature-box" style="background: rgba(2, 18, 12, 0.65); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; padding: 1.5rem;">
          <h3 class="feature-box__title" style="color: #fff; font-size: 1.1rem; margin-bottom: 0.5rem;">🔬 Academic Facilities</h3>
          <p class="feature-box__desc" style="color: var(--clr-text-secondary); line-height: 1.6;">Dedicated academic resource centers and computing infrastructure.</p>
        </div>
      `;
    }
  }

  // 8. Career Prospects & Industry Roles
  const careerContainer = document.getElementById('prog-careers');
  if (careerContainer) {
    if (Array.isArray(data.careers) && data.careers.length > 0) {
      careerContainer.innerHTML = data.careers.map(car => `
        <div class="feature-box" style="background: rgba(2, 18, 12, 0.65); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; padding: 1.5rem;">
          <h3 class="feature-box__title" style="color: var(--clr-accent-400); font-size: 1.1rem; margin-bottom: 0.5rem;">💼 ${car.role}</h3>
          <p class="feature-box__desc" style="color: var(--clr-text-secondary); line-height: 1.6;">${car.desc}</p>
        </div>
      `).join('');
    } else {
      careerContainer.innerHTML = `
        <div class="feature-box" style="background: rgba(2, 18, 12, 0.65); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; padding: 1.5rem;">
          <h3 class="feature-box__title" style="color: var(--clr-accent-400); font-size: 1.1rem; margin-bottom: 0.5rem;">💼 Professional Pathways</h3>
          <p class="feature-box__desc" style="color: var(--clr-text-secondary); line-height: 1.6;">Extensive career placement and higher study opportunities across corporate and research domains.</p>
        </div>
      `;
    }
  }

  // 9. Sticky Tabs In-Page Navigation & Smooth Scroll
  const navBtns = document.querySelectorAll('.prog-nav__btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-target');
      const targetSection = document.querySelector(targetSelector);
      if (targetSection) {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const headerOffset = 135;
        const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Spy for Sticky Tabs
  const trackedSections = [
    document.querySelector('#overview-section'),
    document.querySelector('#curriculum-section'),
    document.querySelector('#faculty-section'),
    document.querySelector('#infrastructure-section'),
    document.querySelector('#career-section'),
    document.querySelector('#apply-section')
  ].filter(Boolean);

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 160;
    let activeId = '';
    trackedSections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        activeId = '#' + sec.id;
      }
    });
    if (activeId) {
      navBtns.forEach(b => {
        if (b.getAttribute('data-target') === activeId) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    }
  }, { passive: true });

  // 10. Direct Fast-Track Application Form Submit
  const applyForm = document.getElementById('prog-apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successEl = document.getElementById('prog-form-success');
      if (successEl) successEl.style.display = 'block';
      applyForm.style.display = 'none';
    });
  }

  // 11. Explore Other Offerings Grid
  const otherGrid = document.getElementById('other-programs-grid');
  if (otherGrid && window.GIAL_PROGRAMS) {
    const canonicalKeys = ['bba', 'bca', 'cyber', 'psychology', 'bcom-fin', 'bcom-log', 'msw'];
    const otherKeys = canonicalKeys.filter(k => k !== programId).slice(0, 6);
    otherGrid.innerHTML = otherKeys.map(k => {
      const p = window.GIAL_PROGRAMS[k];
      if (!p) return '';
      let pImg = 'bba.jpg';
      if (k.includes('bca')) pImg = 'bca.jpg';
      else if (k.includes('cyber')) pImg = 'cyber.jpg';
      else if (k.includes('psych')) pImg = 'psychology.jpg';
      else if (k.includes('log')) pImg = 'logistics.jpg';
      else if (k.includes('msw')) pImg = 'msw.jpg';
      else if (k.includes('com') || k.includes('acc') || k.includes('fin')) pImg = 'commerce.jpg';

      return `
        <a href="program.html?id=${k}" class="program-card" style="text-decoration: none;">
          <div class="program-card__thumb-wrap" style="height: 160px; overflow: hidden; border-radius: 12px 12px 0 0; position: relative;">
            <img src="images/programs/${pImg}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='images/campus-hero.jpg'">
          </div>
          <div class="program-card__body" style="padding: 1.25rem;">
            <span class="badge" style="font-size: 0.75rem; color: var(--clr-accent-400); margin-bottom: 0.5rem; display: inline-block;">${p.duration || '3 Years'}</span>
            <h3 class="program-card__title" style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem;">${p.shortTitle || p.title}</h3>
            <p class="program-card__desc" style="font-size: 0.85rem; color: var(--clr-text-secondary); line-height: 1.5; margin-bottom: 1rem;">${p.dept}</p>
            <span class="program-card__link" style="color: var(--clr-accent-400); font-weight: 700; font-size: 0.85rem;">Explore Curriculum →</span>
          </div>
        </a>
      `;
    }).join('');
  }

  // 12. Dynamic Theme Classes
  document.body.classList.remove('theme-cyber', 'theme-psychology', 'theme-bca', 'theme-logistics', 'theme-msw', 'theme-bba', 'theme-commerce');
  if (programId.includes('cyber')) {
    document.body.classList.add('theme-cyber');
  } else if (programId.includes('psychology') || programId.includes('psych')) {
    document.body.classList.add('theme-psychology');
  } else if (programId.includes('bca')) {
    document.body.classList.add('theme-bca');
  } else if (programId.includes('logistics') || programId.includes('log') || programId.includes('ib')) {
    document.body.classList.add('theme-logistics');
  } else if (programId.includes('msw') || programId.includes('social')) {
    document.body.classList.add('theme-msw');
  } else if (programId.includes('bba') || programId.includes('management') || programId.includes('mba')) {
    document.body.classList.add('theme-bba');
  } else if (programId.includes('com') || programId.includes('finance') || programId.includes('taxation') || programId.includes('acc')) {
    document.body.classList.add('theme-commerce');
  }

  // 13. Interactive Background Animation Engines (CMatrix for Cyber, Domain Constellations for Others)
  const canvas = document.getElementById('global-particle-canvas') || document.getElementById('particle-canvas');
  if (canvas && canvas.getContext && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = -999, mouseY = -999;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouseX = -999;
      mouseY = -999;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (programId.includes('cyber')) initCMatrix();
    });

    // ==========================================
    // A. AUTHENTIC CLASSIC ASCII CMATRIX RAIN ENGINE
    // ==========================================
    if (programId.includes('cyber')) {
      // Authentic Half-width Katakana + Classic ASCII + Cyber Numerics
      const matrixChars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF:・."=*+-<>¦|_';

      const charSize = 16;
      let cols = Math.floor(width / charSize);
      let rows = Math.floor(height / charSize) + 2;

      // Stream column state objects
      let streams = [];

      function createStream(xIndex) {
        const trailLen = Math.floor(Math.random() * 16) + 12; // 12 to 28 characters long
        const speed = Math.random() * 0.35 + 0.22; // Steady, calm classic Matrix pace
        const headY = Math.random() * -rows; // Random start row above viewport
        const chars = [];
        for (let r = 0; r < rows + 35; r++) {
          chars[r] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        }
        return {
          col: xIndex,
          headY: headY,
          speed: speed,
          trailLen: trailLen,
          chars: chars
        };
      }

      function initCMatrix() {
        cols = Math.floor(width / charSize);
        rows = Math.floor(height / charSize) + 2;
        streams = [];
        for (let i = 0; i < cols; i++) {
          streams.push(createStream(i));
        }
      }
      initCMatrix();

      function renderCMatrix() {
        // Clear canvas with deep dark cyber glass tint
        ctx.clearRect(0, 0, width, height);

        ctx.font = 'bold 15px "Courier New", Consolas, monospace';
        ctx.textAlign = 'center';

        const horizonRadius = 260; // Broad gravitational curvature event horizon

        for (let i = 0; i < streams.length; i++) {
          const s = streams[i];
          s.headY += s.speed;

          const headInt = Math.floor(s.headY);
          const colX = s.col * charSize + (charSize / 2);

          // Periodically mutate characters in column for classic terminal flicker
          if (Math.random() > 0.65) {
            const mutIdx = Math.floor(Math.random() * (s.chars.length));
            s.chars[mutIdx] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
          }

          const isColumnNearMouse = (mouseX > 0 && mouseY > 0 && Math.abs(colX - mouseX) < 65);

          // Draw the vertical column of ASCII characters
          for (let k = 0; k < s.trailLen; k++) {
            const charRow = headInt - k;
            if (charRow < 0 || charRow >= rows) continue;

            const char = s.chars[charRow % s.chars.length] || '0';
            const basePosY = charRow * charSize;

            let renderX = colX;
            let renderY = basePosY;
            let isSwallowed = false;
            let isBeingAbsorbed = false;

            // Gravitational Spacetime Curvature: Streams bend and curve gracefully into the black hole
            if (mouseX > 0 && mouseY > 0) {
              const dx = mouseX - colX;
              const dy = mouseY - basePosY;
              const dist = Math.hypot(dx, dy);

              if (dist < horizonRadius) {
                // Smooth non-linear gravitational curvature pull
                const curveFactor = Math.pow((horizonRadius - dist) / horizonRadius, 1.55);
                const pullX = (dx / (dist + 8)) * curveFactor * 95;
                const pullY = (dy / (dist + 8)) * curveFactor * 45;

                renderX += pullX;
                renderY += pullY;

                // Check distance from current curved coordinate to mouse center
                const curvedDist = Math.hypot(mouseX - renderX, mouseY - renderY);

                if (curvedDist <= 16 || (basePosY >= mouseY - 4 && Math.abs(renderX - mouseX) < 20)) {
                  // Sucked into black hole singularity and disappears
                  isSwallowed = true;
                } else if (dist < 130) {
                  // Ionization glow as streams curve and funnel into the center
                  isBeingAbsorbed = true;
                }
              }
            }

            // If swallowed by the black hole, DO NOT render — vanishes into singularity
            if (isSwallowed) continue;

            // Classic Matrix Color Gradients & Glowing Head Shading
            if (isBeingAbsorbed) {
              // Glowing white-green ionization along the curvature trajectory
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#00ff66';
              ctx.shadowBlur = 14;
              ctx.fillText(char, renderX, renderY);
              ctx.shadowBlur = 0;
            } else if (k === 0) {
              // Leading Stream Character (White Phosphor Glow)
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#00ff66';
              ctx.shadowBlur = 10;
              ctx.fillText(char, renderX, renderY);
              ctx.shadowBlur = 0;
            } else if (k === 1) {
              // First trailing glyph (Bright lime white-green)
              ctx.fillStyle = '#a7f3d0';
              ctx.fillText(char, renderX, renderY);
            } else if (k < 5) {
              // High-energy vibrant Matrix Green
              ctx.fillStyle = '#00ff66';
              ctx.fillText(char, renderX, renderY);
            } else if (k < Math.floor(s.trailLen * 0.65)) {
              // Core Terminal Green
              ctx.fillStyle = '#10b981';
              ctx.fillText(char, renderX, renderY);
            } else {
              // Deep Phosphor Fade Trail
              const alpha = Math.max(0.12, (s.trailLen - k) / (s.trailLen * 0.35));
              ctx.fillStyle = `rgba(5, 150, 105, ${alpha.toFixed(2)})`;
              ctx.fillText(char, renderX, renderY);
            }
          }

          // Reset stream when trail completely leaves bottom or finishes getting swallowed by the mouse
          if (isColumnNearMouse && (s.headY - s.trailLen) * charSize > mouseY) {
            streams[i] = createStream(i);
          } else if ((s.headY - s.trailLen) > rows) {
            streams[i] = createStream(i);
          }
        }

        requestAnimationFrame(renderCMatrix);
      }

      renderCMatrix();

    } else {
      // ==========================================
      // B. DOMAIN CONSTELLATION ENGINES (OTHER PROGRAMS)
      // ==========================================
      let primaryColor = '#10b981';
      let secondaryColor = '#f59e0b';
      let lineColor = 'hsla(155, 75%, 60%, ';
      let specialGlyphs = [];

      if (programId.includes('psychology') || programId.includes('psych')) {
        primaryColor = '#c084fc';
        secondaryColor = '#e879f9';
        lineColor = 'hsla(275, 90%, 75%, ';
        specialGlyphs = ['Ψ', '🧠', 'α', 'β', 'θ', 'λ', '∞'];
      } else if (programId.includes('bca')) {
        primaryColor = '#38bdf8';
        secondaryColor = '#00f2fe';
        lineColor = 'hsla(199, 95%, 60%, ';
        specialGlyphs = ['</>', 'AI', '&&', '=>', '01', '{}', 'SQL'];
      } else if (programId.includes('logistics') || programId.includes('log') || programId.includes('ib')) {
        primaryColor = '#14b8a6';
        secondaryColor = '#5eead4';
        lineColor = 'hsla(173, 80%, 55%, ';
        specialGlyphs = ['⚓', '✈️', '🚢', '📦', '⇄', '🌐'];
      } else if (programId.includes('bba') || programId.includes('management') || programId.includes('mba')) {
        primaryColor = '#fbbf24';
        secondaryColor = '#60a5fa';
        lineColor = 'hsla(45, 95%, 58%, ';
        specialGlyphs = ['📈', '▲', 'KPI', 'ROI', '💼', '%'];
      } else if (programId.includes('com') || programId.includes('finance') || programId.includes('taxation') || programId.includes('acc')) {
        primaryColor = '#10b981';
        secondaryColor = '#fbbf24';
        lineColor = 'hsla(155, 80%, 55%, ';
        specialGlyphs = ['₹', '$', '€', '∑', '%', '∆', '✓'];
      } else if (programId.includes('msw') || programId.includes('social')) {
        primaryColor = '#fb7185';
        secondaryColor = '#f59e0b';
        lineColor = 'hsla(350, 90%, 70%, ';
        specialGlyphs = ['🤝', '♥', '★', '⚖', '🌱', '👥'];
      }

      const particleCount = Math.min(115, Math.max(65, Math.floor((width * height) / 10500)));
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        const hasGlyph = specialGlyphs.length > 0 && Math.random() > 0.65;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          size: Math.random() * 2.6 + 1.2,
          color: Math.random() > 0.35 ? primaryColor : secondaryColor,
          glyph: hasGlyph ? specialGlyphs[Math.floor(Math.random() * specialGlyphs.length)] : null,
          pulse: Math.random() * Math.PI * 2
        });
      }

      function renderProgramConstellation() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.035;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse repulsion & interactive energy connector
          if (mouseX > 0 && mouseY > 0) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 190) {
              const force = (190 - dist) / 190;
              p.x -= (dx / dist) * force * 3;
              p.y -= (dy / dist) * force * 3;

              // Connecting laser line to mouse
              ctx.beginPath();
              ctx.strokeStyle = `${lineColor}${(1 - dist / 190) * 0.6})`;
              ctx.lineWidth = 1.3;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.stroke();
            }
          }

          // Draw particle or glyph
          if (p.glyph) {
            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fillText(p.glyph, p.x - 6, p.y + 4);
            ctx.shadowBlur = 0;
          } else {
            const currentSize = p.size + Math.sin(p.pulse) * 0.6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(1, currentSize), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.42;
              ctx.beginPath();
              ctx.strokeStyle = `${lineColor}${alpha})`;
              ctx.lineWidth = 0.85;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(renderProgramConstellation);
      }

      renderProgramConstellation();
    }
  }
}

// Robust execution across all browser states
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgramPage);
} else {
  initProgramPage();
}
