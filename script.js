/* ============================================================
   PARAM CREATION — script.js
   Features: Preloader, Navbar, Particles, AOS, Gallery Filter,
             Admin (5-click logo), Upload/Delete, LocalStorage
   ============================================================ */

'use strict';

/* ─── ADMIN CREDENTIALS (change here) ─── */
const ADMIN_ID   = 'paramcreation';
const ADMIN_PASS = 'param@2024';

/* ─── DOM READY ─── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initParticles();
  initAOS();
  initGalleryFilter();
  initAdminAccess();
  initAdminPanel();
  loadAdminPhotos();
});

/* ════════════════════════════════
   1. PRELOADER
   ════════════════════════════════ */
function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      el.classList.add('hidden');
      setTimeout(() => el.remove(), 700);
    }, 1800);
  });
}

/* ════════════════════════════════
   2. NAVBAR (scroll + hamburger)
   ════════════════════════════════ */
function initNavbar() {
  const nav  = document.getElementById('navbar');
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  ham.addEventListener('click', () => {
    menu.classList.toggle('open');
    ham.classList.toggle('active');
    // Animate hamburger to X
    const spans = ham.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      ham.classList.remove('active');
      ham.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

/* ════════════════════════════════
   3. HERO PARTICLES
   ════════════════════════════════ */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      --dur:   ${4 + Math.random() * 6}s;
      --delay: ${Math.random() * 6}s;
      width:  ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      opacity: ${0.2 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
}

/* ════════════════════════════════
   4. AOS (Animate On Scroll)
   ════════════════════════════════ */
function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ════════════════════════════════
   5. GALLERY FILTER
   ════════════════════════════════ */
function initGalleryFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;
        if (show) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.5s ease';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ════════════════════════════════
   6. ADMIN — 5-CLICK LOGO TRIGGER
   ════════════════════════════════ */
function initAdminAccess() {
  const logo  = document.getElementById('navLogo');
  const modal = document.getElementById('adminModal');
  const close = document.getElementById('modalClose');
  const loginBtn = document.getElementById('loginBtn');
  const errEl = document.getElementById('loginError');
  let clicks = 0, timer;

  logo.addEventListener('click', () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 2000); // reset if slow

    if (clicks >= 5) {
      clicks = 0;
      clearTimeout(timer);
      modal.style.display = 'flex';
      document.getElementById('adminUser').focus();
    }
  });

  close.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

  loginBtn.addEventListener('click', attemptLogin);
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && modal.style.display === 'flex') attemptLogin();
  });

  function attemptLogin() {
    const u = document.getElementById('adminUser').value.trim();
    const p = document.getElementById('adminPass').value.trim();
    if (u === ADMIN_ID && p === ADMIN_PASS) {
      closeModal(modal);
      document.getElementById('adminUser').value = '';
      document.getElementById('adminPass').value = '';
      errEl.style.display = 'none';
      openAdminPanel();
    } else {
      errEl.style.display = 'block';
      document.getElementById('adminPass').value = '';
      shake(document.querySelector('.modal-box'));
    }
  }
}

function closeModal(modal) {
  modal.style.display = 'none';
}
function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
}

// Shake keyframe injected once
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`;
document.head.appendChild(shakeStyle);

/* ════════════════════════════════
   7. ADMIN PANEL
   ════════════════════════════════ */
const STORAGE_KEY = 'pc_admin_photos'; // localStorage key

function openAdminPanel() {
  const panel = document.getElementById('adminPanel');
  panel.style.display = 'flex';
  loadExistingThumbs();
}

function initAdminPanel() {
  const panel    = document.getElementById('adminPanel');
  const close    = document.getElementById('adminPanelClose');
  const fileInp  = document.getElementById('adminFileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const prevGrid = document.getElementById('adminPreviewGrid');

  close.addEventListener('click', () => closeModal(panel));
  panel.addEventListener('click', e => { if (e.target === panel) closeModal(panel); });

  let pendingFiles = []; // store File objects before upload

  fileInp.addEventListener('change', () => {
    pendingFiles = Array.from(fileInp.files);
    prevGrid.innerHTML = '';
    pendingFiles.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = e => {
        const thumb = makeThumb(e.target.result, idx, true);
        thumb.querySelector('.admin-thumb-del').addEventListener('click', () => {
          pendingFiles.splice(idx, 1);
          thumb.remove();
        });
        prevGrid.appendChild(thumb);
      };
      reader.readAsDataURL(file);
    });
  });

  uploadBtn.addEventListener('click', () => {
    if (!pendingFiles.length) { alert('Please select photos first.'); return; }
    const cat = document.getElementById('adminCategory').value;
    const existing = getSavedPhotos();

    pendingFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        existing.push({ src: ev.target.result, category: cat, id: Date.now() + Math.random() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        renderAdminPhoto({ src: ev.target.result, category: cat, id: Date.now() });
        addGalleryItem(ev.target.result, cat);
      };
      reader.readAsDataURL(file);
    });

    pendingFiles = [];
    fileInp.value = '';
    prevGrid.innerHTML = '';
    setTimeout(loadExistingThumbs, 300);
  });
}

function getSavedPhotos() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function loadAdminPhotos() {
  getSavedPhotos().forEach(p => addGalleryItem(p.src, p.category, p.id));
}

function addGalleryItem(src, category, id) {
  const container = document.getElementById('adminGalleryItems') || document.getElementById('galleryGrid');
  const div = document.createElement('div');
  div.className = 'gallery-item';
  div.dataset.category = category;
  if (id) div.dataset.adminId = id;
  div.innerHTML = `
    <img src="${src}" alt="Gallery Photo" loading="lazy"/>
    <div class="gallery-hover">
      <p class="gallery-msg">✨ For more details</p>
      <a class="gallery-wa-btn" href="https://wa.me/919875291200?text=Hi%20Param%20Creation!%20I%20saw%20your%20collection%20and%20want%20to%20know%20more." target="_blank">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp Us
      </a>
    </div>
  `;
  document.getElementById('adminGalleryItems').appendChild(div);
  // Animate in
  div.style.opacity = '0';
  setTimeout(() => { div.style.transition = 'opacity 0.5s'; div.style.opacity = '1'; }, 50);
}

function loadExistingThumbs() {
  const grid = document.getElementById('adminExistingGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const photos = getSavedPhotos();
  if (!photos.length) { grid.innerHTML = '<p style="color:#a0806060;font-size:.85rem">No uploaded photos yet.</p>'; return; }
  photos.forEach((p, idx) => {
    const thumb = makeThumb(p.src, idx, false);
    thumb.querySelector('.admin-thumb-del').addEventListener('click', () => {
      deleteAdminPhoto(p.id);
      thumb.remove();
      // Remove from gallery
      document.querySelectorAll(`[data-admin-id="${p.id}"]`).forEach(el => el.remove());
    });
    grid.appendChild(thumb);
  });
}

function deleteAdminPhoto(id) {
  const photos = getSavedPhotos().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

function renderAdminPhoto(p) {
  const grid = document.getElementById('adminExistingGrid');
  if (!grid) return;
  const thumb = makeThumb(p.src, p.id, false);
  thumb.querySelector('.admin-thumb-del').addEventListener('click', () => {
    deleteAdminPhoto(p.id);
    thumb.remove();
    document.querySelectorAll(`[data-admin-id="${p.id}"]`).forEach(el => el.remove());
  });
  grid.appendChild(thumb);
}

function makeThumb(src, id, isPreview) {
  const div = document.createElement('div');
  div.className = 'admin-thumb';
  div.innerHTML = `
    <img src="${src}" alt="thumb"/>
    <div class="admin-thumb-del" title="${isPreview ? 'Remove' : 'Delete'}">✕</div>
  `;
  return div;
}

/* ════════════════════════════════
   8. SMOOTH ACTIVE NAV HIGHLIGHT
   ════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold-mid)' : '';
  });
}, { passive: true });
