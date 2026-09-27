/* =========================================================
   A LITTLE SUNFLOWER GARDEN FOR YOU 🌻
   Semua bagian yang bisa kamu edit sudah ditandai // EDIT HERE
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     0. HELPER: membuat bunga matahari (dipakai di beberapa tempat)
     --------------------------------------------------------- */
  function buildFlowerInto(container, petalCount = 8) {
    const petalsWrap = document.createElement('div');
    petalsWrap.className = 'petals';
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      const angle = (360 / petalCount) * i;
      petal.style.setProperty('--angle', angle + 'deg');
      petal.style.setProperty('--i', i);
      petalsWrap.appendChild(petal);
    }
    const center = document.createElement('div');
    center.className = 'flower-center';
    container.appendChild(petalsWrap);
    container.appendChild(center);
  }

  /* ---------------------------------------------------------
     1. LANDING PAGE — kelopak bunga tunas utama
     --------------------------------------------------------- */
  const heroPetals = document.getElementById('heroPetals');
  if (heroPetals) {
    const petalCount = 10;
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      const angle = (360 / petalCount) * i;
      petal.style.setProperty('--angle', angle + 'deg');
      petal.style.setProperty('--i', i);
      heroPetals.appendChild(petal);
    }
  }

  // Tombol "Masuk ke taman" -> scroll halus ke section garden
  const enterBtn = document.getElementById('enterGarden');
  const gardenSection = document.getElementById('garden');
  if (enterBtn && gardenSection) {
    enterBtn.addEventListener('click', () => {
      gardenSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     2. TAMAN BUNGA MATAHARI INTERAKTIF
     --------------------------------------------------------- */

  // EDIT HERE: ganti / tambah pesan sesukamu di sini
  const gardenMessages = [
    "Semoga hari kamu selalu secerah ini 🌻",
    "Jangan lupa tersenyum hari ini.",
    "Kamu punya tempat spesial di hati aku.",
    "Kalau hari kamu sedang mendung, semoga ini bisa jadi sedikit cahaya.",
    "Satu bunga untuk satu senyuman."
  ];

  const FLOWER_COUNT = 6; // EDIT HERE: jumlah bunga di taman

  const gardenField = document.getElementById('gardenField');
  const messageOverlay = document.getElementById('messageOverlay');
  const messageText = document.getElementById('messageText');
  const closeMessage = document.getElementById('closeMessage');

  if (gardenField) {
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const flower = document.createElement('div');
      flower.className = 'mini-flower';
      // delay animasi mengambang biar tiap bunga tidak serempak
      flower.style.animationDelay = (i * 0.3) + 's';
      buildFlowerInto(flower, 8);

      flower.addEventListener('click', () => {
        const randomMsg = gardenMessages[Math.floor(Math.random() * gardenMessages.length)];
        showMessage(randomMsg);
      });

      gardenField.appendChild(flower);
    }
  }

  function showMessage(msg) {
    if (!messageOverlay || !messageText) return;
    messageText.textContent = msg;
    messageOverlay.classList.add('show');
  }
  if (closeMessage) {
    closeMessage.addEventListener('click', () => {
      messageOverlay.classList.remove('show');
    });
  }
  if (messageOverlay) {
    messageOverlay.addEventListener('click', (e) => {
      if (e.target === messageOverlay) messageOverlay.classList.remove('show');
    });
  }

  /* ---------------------------------------------------------
     3. REVEAL ON SCROLL (surat kecil, timeline, tombol surprise)
     --------------------------------------------------------- */
  const letterCard = document.querySelector('.letter-card');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const surpriseHint = document.querySelector('.surprise-hint');
  const surpriseBtnEl = document.querySelector('.btn-surprise');

  const revealTargets = [letterCard, ...timelineItems, surpriseHint, surpriseBtnEl].filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------------------------------------------------------
     4. FLOATING PARTICLES (cahaya/debu lembut di background)
     --------------------------------------------------------- */
  const particlesWrap = document.getElementById('particles');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnParticle() {
    if (!particlesWrap || reduceMotion) return;
    const p = document.createElement('div');
    p.className = 'particle';
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 6;
    const size = 3 + Math.random() * 5;
    p.style.left = left + 'vw';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = duration + 's';
    particlesWrap.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
  }

  if (!reduceMotion) {
    setInterval(spawnParticle, 900);
  }

  /* ---------------------------------------------------------
     5. SURPRISE SECTION
     --------------------------------------------------------- */
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseFinal = document.getElementById('surpriseFinal');
  const starsWrap = document.getElementById('stars');
  const finalGarden = document.getElementById('finalGarden');
  const restartBtn = document.getElementById('restartBtn');

  let surpriseOpened = false;

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      if (surpriseOpened) return;
      surpriseOpened = true;

      surpriseFinal.classList.add('active');
      surpriseFinal.scrollIntoView({ behavior: 'smooth' });

      buildStars();
      buildFinalGarden();
      startPetalFall();
    });
  }

  function buildStars() {
    if (!starsWrap) return;
    const STAR_COUNT = 40; // EDIT HERE: jumlah bintang di langit malam
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 70 + '%';
      star.style.animationDelay = (Math.random() * 2) + 's';
      starsWrap.appendChild(star);
    }
  }

  function buildFinalGarden() {
    if (!finalGarden) return;
    const COUNT = 7; // EDIT HERE: jumlah bunga di kebun malam
    for (let i = 0; i < COUNT; i++) {
      const flower = document.createElement('div');
      flower.className = 'mini-flower';
      flower.style.animationDelay = (i * 0.25) + 's';
      buildFlowerInto(flower, 8);
      finalGarden.appendChild(flower);
    }
  }

  let petalIntervalId = null;
  function startPetalFall() {
    if (reduceMotion) return;
    let count = 0;
    petalIntervalId = setInterval(() => {
      spawnFallingPetal();
      count++;
      // Batasi durasi hujan kelopak biar tidak terlalu ramai / berat
      if (count > 60) {
        clearInterval(petalIntervalId);
      }
    }, 350);
  }

  function spawnFallingPetal() {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    petal.style.left = Math.random() * 100 + 'vw';
    const duration = 4 + Math.random() * 3;
    petal.style.animationDuration = duration + 's';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  /* ---------------------------------------------------------
     6. MUSIK BACKGROUND (tidak autoplay, hanya lewat tombol)
     --------------------------------------------------------- */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
      if (!isPlaying) {
        bgMusic.play().then(() => {
          isPlaying = true;
          musicToggle.textContent = '🔊';
        }).catch(() => {
          // File musik belum ada / gagal diputar — biarkan tenang, tidak error ke user
          musicToggle.textContent = '🔇';
          console.log('Musik belum bisa diputar. Pastikan assets/music.mp3 sudah ada.');
        });
      } else {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.textContent = '🔇';
      }
    });
  }

});
