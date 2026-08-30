/**
 * GIAL — Lightweight Interactive 3D WebGL Experiences (Powered by Three.js)
 * 3D Holographic Career & Recruiter Placement Orbit Simulator (Stats) — Interactive 3D nodes, laser beams, raycasting HUD
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE === 'undefined') return;

  // ========================================================
  // 3D HOLOGRAPHIC CAREER & RECRUITER ORBIT SIMULATOR (Stats)
  // ========================================================
  const careerCanvas = document.getElementById('career-3d-canvas');
  if (careerCanvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, careerCanvas.clientWidth / careerCanvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 21);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: careerCanvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(careerCanvas.clientWidth, careerCanvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const simGroup = new THREE.Group();
    scene.add(simGroup);

    // Central GIAL Hologram Core (Quantum Icosahedron)
    const centralGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const centralMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const centralCore = new THREE.Mesh(centralGeo, centralMat);
    simGroup.add(centralCore);

    // Central Pulsing Glow Sphere
    const glowGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    simGroup.add(glowSphere);

    // Concentric Cyber Orbit Rings
    function createCyberRing(radius, color, tiltX, tiltY) {
      const geo = new THREE.TorusGeometry(radius, 0.04, 8, 80);
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = tiltX;
      mesh.rotation.y = tiltY;
      return mesh;
    }

    const ring1 = createCyberRing(6.0, 0x10b981, Math.PI / 2.6, 0);
    const ring2 = createCyberRing(8.2, 0xf59e0b, -Math.PI / 3.4, Math.PI / 6);
    const ring3 = createCyberRing(10.5, 0x38bdf8, Math.PI / 4, -Math.PI / 5);
    simGroup.add(ring1);
    simGroup.add(ring2);
    simGroup.add(ring3);

    // 10 Interactive Placement Satellites & Companies
    const partnerNodes = [
      { id: 'deloitte', name: 'Deloitte Global Services', cat: 'corp', tag: 'Big 4 Financial & Tax Consulting', desc: 'Direct corporate recruitment partner for B.Com, M.Com, BBA & BCA.', stat: '📈 120+ Placed • Average: 6.5 LPA', color: 0x34d399, icon: '🏢', orbitRad: 6.0, speed: 0.007, angle: 0 },
      { id: 'tcs', name: 'Tata Consultancy Services (TCS)', cat: 'tech', tag: 'Cloud Architecture & Enterprise AI', desc: 'Tier-1 IT campus drives for BCA and B.Sc Cyber Forensics graduates.', stat: '⚡ 180+ Placed • Average: 5.8 LPA', color: 0x38bdf8, icon: '💻', orbitRad: 8.2, speed: -0.006, angle: 1.1 },
      { id: 'federal', name: 'Federal Bank of India', cat: 'bank', tag: 'Banking Operations & Wealth Management', desc: 'Leading banking recruitment partner for Probationary Officers and Managers.', stat: '🏦 85+ Placed • Average: 6.2 LPA', color: 0xfbbf24, icon: '🏦', orbitRad: 6.0, speed: 0.007, angle: 2.2 },
      { id: 'infosys', name: 'Infosys Ltd', cat: 'tech', tag: 'Software Engineering & Microservices', desc: 'Recruiting for system engineers, cyber defense associates & analysts.', stat: '⚡ 150+ Placed • Average: 5.5 LPA', color: 0x60a5fa, icon: '💻', orbitRad: 8.2, speed: -0.006, angle: 3.3 },
      { id: 'kpmg', name: 'KPMG Global Services', cat: 'corp', tag: 'Audit, Valuation & Financial Forensics', desc: 'Corporate internships and direct placement for Accounting & Finance majors.', stat: '💼 70+ Placed • Average: 7.0 LPA', color: 0xa78bfa, icon: '📊', orbitRad: 10.5, speed: 0.005, angle: 0.5 },
      { id: 'wipro', name: 'Wipro Technologies', cat: 'tech', tag: 'Cyber Defense & Data Analytics', desc: 'Recruits specialized talent from BCA and Cyber Forensics divisions.', stat: '🛡️ 95+ Placed • Average: 5.2 LPA', color: 0x34d399, icon: '🛡️', orbitRad: 8.2, speed: -0.006, angle: 4.5 },
      { id: 'ey', name: 'Ernst & Young (EY)', cat: 'corp', tag: 'Corporate Strategy & Global Tax Auditing', desc: 'Global accounting leader offering direct graduate trainee programs.', stat: '💼 80+ Placed • Average: 6.8 LPA', color: 0xf59e0b, icon: '💼', orbitRad: 10.5, speed: 0.005, angle: 2.7 },
      { id: 'dubai', name: 'Dubai & UAE Alumni Chapter', cat: 'global', tag: 'Middle East Corporate & Logistics Hub', desc: 'Over 200+ active GIAL graduates thriving in Dubai corporate financial sectors.', stat: '🌍 210+ Alumni Active in GCC', color: 0xf43f5e, icon: '🌍', orbitRad: 10.5, speed: 0.005, angle: 4.8 },
      { id: 'london', name: 'London UK Academic Chapter', cat: 'global', tag: 'UK Higher Education & European Placements', desc: 'Alumni pursuing higher masters, Ph.D research, and global accounting.', stat: '🏛️ 90+ Alumni in UK / EU', color: 0xe879f9, icon: '🏛️', orbitRad: 6.0, speed: 0.007, angle: 4.6 },
      { id: 'singapore', name: 'Singapore Asia-Pacific Chapter', cat: 'global', tag: 'Maritime Logistics & International Trade', desc: 'Alumni working across port logistics, maritime freight, and supply chains.', stat: '🚢 65+ Alumni in Asia-Pacific', color: 0x2dd4bf, icon: '🚢', orbitRad: 8.2, speed: -0.006, angle: 5.8 }
    ];

    const nodeMeshes = [];
    const beamLines = [];

    partnerNodes.forEach(node => {
      // 3D Satellites (Octahedron)
      const satGeo = new THREE.OctahedronGeometry(0.7, 0);
      const satMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = node;
      simGroup.add(satMesh);
      nodeMeshes.push(satMesh);

      // Inner Glowing Point
      const ptGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const ptMat = new THREE.MeshBasicMaterial({ color: node.color });
      const ptMesh = new THREE.Mesh(ptGeo, ptMat);
      satMesh.add(ptMesh);

      // Dynamic Connecting Laser Line to Central Core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      simGroup.add(line);
      beamLines.push({ line, mesh: satMesh });
    });

    // 3D Ambient Dust Field
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 24;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x34d399, size: 0.2, transparent: true, opacity: 0.5 });
    simGroup.add(new THREE.Points(dustGeo, dustMat));

    // Raycaster for Hover & Selection
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2(-999, -999);
    let hoveredMesh = null;

    // HUD Elements
    const hudIcon = document.getElementById('hud-node-icon');
    const hudTag = document.getElementById('hud-node-tag');
    const hudTitle = document.getElementById('hud-node-title');
    const hudDesc = document.getElementById('hud-node-desc');
    const hudStat = document.getElementById('hud-node-stat');

    function updateHUD(node) {
      if (!node) return;
      if (hudIcon) hudIcon.textContent = node.icon;
      if (hudTag) hudTag.textContent = node.tag;
      if (hudTitle) hudTitle.textContent = node.name;
      if (hudDesc) hudDesc.textContent = node.desc;
      if (hudStat) hudStat.textContent = node.stat;
    }

    // Default HUD to Deloitte
    updateHUD(partnerNodes[0]);

    careerCanvas.addEventListener('mousemove', (e) => {
      const rect = careerCanvas.getBoundingClientRect();
      mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    careerCanvas.addEventListener('mouseleave', () => {
      mouse2D.x = -999;
      mouse2D.y = -999;
    });

    // Touch & Drag Inertial Orbit
    let isSimDragging = false;
    let prevSimX = 0, prevSimY = 0;

    careerCanvas.addEventListener('mousedown', (e) => {
      isSimDragging = true;
      prevSimX = e.clientX;
      prevSimY = e.clientY;
      careerCanvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      isSimDragging = false;
      careerCanvas.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
      if (isSimDragging) {
        const deltaX = e.clientX - prevSimX;
        const deltaY = e.clientY - prevSimY;
        simGroup.rotation.y += deltaX * 0.008;
        simGroup.rotation.x += deltaY * 0.008;
        prevSimX = e.clientX;
        prevSimY = e.clientY;
      }
    });

    // Category Filter Buttons
    let activeFilter = 'all';
    const filterButtons = document.querySelectorAll('.career-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-cat');

        // Emphasize filtered nodes & update HUD to first matching
        const firstMatch = partnerNodes.find(n => activeFilter === 'all' || n.cat === activeFilter);
        if (firstMatch) updateHUD(firstMatch);
      });
    });

    // Click on canvas to pulse
    careerCanvas.addEventListener('click', () => {
      centralCore.scale.set(1.4, 1.4, 1.4);
      glowSphere.scale.set(1.6, 1.6, 1.6);
      setTimeout(() => {
        centralCore.scale.set(1, 1, 1);
        glowSphere.scale.set(1, 1, 1);
      }, 300);
    });

    // Animation Loop
    let simVisible = true;
    const simObserver = new IntersectionObserver((entries) => {
      simVisible = entries[0].isIntersecting;
    });
    simObserver.observe(careerCanvas);

    function animateSimulator() {
      requestAnimationFrame(animateSimulator);
      if (!simVisible) return;

      if (!isSimDragging) {
        simGroup.rotation.y += 0.0025;
      }

      centralCore.rotation.x += 0.008;
      centralCore.rotation.y += 0.012;
      glowSphere.rotation.y -= 0.005;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.005;
      ring3.rotation.z += 0.003;

      // Update Satellites & Laser Beams
      nodeMeshes.forEach((mesh, idx) => {
        const data = mesh.userData;
        data.angle += data.speed;
        
        // Orbital trajectory with subtle vertical sine wave
        const x = Math.cos(data.angle) * data.orbitRad;
        const z = Math.sin(data.angle) * data.orbitRad;
        const y = Math.sin(data.angle * 2 + idx) * 1.8;

        mesh.position.set(x, y, z);
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.03;

        // Apply filter dimming
        const matchesFilter = activeFilter === 'all' || data.cat === activeFilter;
        mesh.visible = true;
        mesh.material.opacity = matchesFilter ? 1 : 0.2;

        // Update Laser Beam endpoints
        const beam = beamLines[idx];
        if (beam) {
          const posAttr = beam.line.geometry.attributes.position;
          posAttr.setXYZ(0, 0, 0, 0); // Core
          posAttr.setXYZ(1, x, y, z); // Satellite
          posAttr.needsUpdate = true;
          beam.line.material.opacity = matchesFilter ? 0.35 : 0.08;
        }
      });

      // Raycast Hover Detection
      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        if (hoveredMesh !== hitMesh) {
          if (hoveredMesh) hoveredMesh.scale.set(1, 1, 1);
          hoveredMesh = hitMesh;
          hoveredMesh.scale.set(1.5, 1.5, 1.5);
          updateHUD(hoveredMesh.userData);
        }
      } else {
        if (hoveredMesh) {
          hoveredMesh.scale.set(1, 1, 1);
          hoveredMesh = null;
        }
      }

      renderer.render(scene, camera);
    }
    animateSimulator();

    // Responsive Canvas Resize
    window.addEventListener('resize', () => {
      if (!careerCanvas) return;
      camera.aspect = careerCanvas.clientWidth / careerCanvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(careerCanvas.clientWidth, careerCanvas.clientHeight);
    });
  }
});
