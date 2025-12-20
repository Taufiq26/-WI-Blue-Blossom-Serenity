// GET GUEST NAME FROM URL PARAMETER
function getGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  const guestNameElement = document.getElementById('guest-name');

  if (guestName) {
    guestNameElement.textContent = decodeURIComponent(guestName);
  } else {
    guestNameElement.textContent = 'Tamu Undangan';
  }
}

// Call on page load
getGuestName();

// 1. OPENING ANIMATION & LOGIC
function openInvitation() {
  const cover = document.getElementById('opening-layer');
  const mainContent = document.getElementById('main-content');

  // Slide up cover
  cover.classList.add('closed');

  // Show main content immediately
  mainContent.style.display = 'block';

  // Optional: Play music here if browser allows
  // var audio = new Audio('music.mp3'); audio.play();

  // DO NOT unlock scroll here anymore. Scroll is unlocked by the continue button.
  // document.body.style.overflowY = 'auto'; // Removed
}

// 2. UNLOCK & SMOOTH SCROLL (Click on "Continue" button)
function continueToSite() {
  // 1. Unlock scroll
  document.body.style.overflowY = 'auto';

  // 2. Custom Slow Smooth Scroll (2000ms = 2 seconds)
  smoothScrollTo('main-header', 1500);
}

// CUSTOM SMOOTH SCROLL FUNCTION
function smoothScrollTo(targetId, duration) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function for smooth acceleration/deceleration
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// 3. COUNTDOWN TIMER
function startCountdown() {
  // Jan 31, 2026, 08:00 WIB
  const targetDate = new Date('2026-01-31T08:00:00+07:00').getTime();

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timer);
      document.querySelector('.countdown-container').innerHTML = "<h3 style='color:var(--primary-blue); font-family:var(--font-script); font-size:2rem;'>Alhamdulillah, Acara Telah Dimulai!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Safe check in case elements are missing
    if (document.getElementById('days')) {
      document.getElementById('days').textContent = days < 10 ? '0' + days : days;
      document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
      document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  }, 1000);
}

// Start countdown immediately
startCountdown();

// 2. FALLING PETALS EFFECT (Vanilla JS)
function createPetals() {
  const layer = document.getElementById('opening-layer');
  const petalCount = 15; // Number of petals

  for (let i = 0; i < petalCount; i++) {
    let petal = document.createElement('div');
    petal.classList.add('petal');

    // Randomize size, position, and animation duration
    let size = Math.random() * 10 + 10; // 10px to 20px
    let left = Math.random() * 100; // 0% to 100%
    let duration = Math.random() * 5 + 5; // 5s to 10s
    let delay = Math.random() * 5;

    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.left = left + '%';
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = delay + 's';

    layer.appendChild(petal);
  }
}

// 3. SCROLL REVEAL ANIMATION (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
  createPetals();

  const observerOptions = {
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => observer.observe(el));

  // Check RSVP status on load
  checkRSVPVisibility();
});

// 4. RSVP LOGIC
// CONFIGURATION: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWmOgAd7NmblO28vksx5EGVcG9lPGFILIZAolj8Yuyi8ckPuO_Y8sK4ZSW-Noip1Jy3w/exec';

function checkRSVPVisibility() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  const rsvpContainer = document.getElementById('rsvp-action-container');
  const confirmedMessage = document.getElementById('rsvp-confirmed-message');

  if (!guestName) {
    // No guest name? Hide button (already hidden by default style)
    return;
  }

  // Check if already confirmed locally
  const isConfirmed = localStorage.getItem('rsvp_confirmed_' + guestName);

  if (isConfirmed) {
    rsvpContainer.style.display = 'none';
    confirmedMessage.style.display = 'block';
  } else {
    rsvpContainer.style.display = 'block';
    confirmedMessage.style.display = 'none';
  }
}

function submitRSVP(status) {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');

  if (!guestName) return;

  // Determine which button was clicked based on status
  const btnId = status === 'Hadir' ? 'btn-rsvp-hadir' : 'btn-rsvp-tidak';
  const otherBtnId = status === 'Hadir' ? 'btn-rsvp-tidak' : 'btn-rsvp-hadir';

  const btn = document.getElementById(btnId);
  const otherBtn = document.getElementById(otherBtnId);

  const originalText = btn.innerHTML;

  // Show loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
  btn.disabled = true;
  otherBtn.disabled = true;

  // Prepare data
  const data = new FormData();
  data.append('kategori', 'RSVP'); // Add category
  data.append('nama', guestName);
  data.append('status', status);
  data.append('tanggal', new Date().toLocaleString());

  fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: data })
    .then(response => {
      console.log('Success!', response);
      completeRSVP(guestName);
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
      btn.innerHTML = originalText;
      btn.disabled = false;
      otherBtn.disabled = false;
    });
}

function completeRSVP(guestName) {
  // Save state locally
  localStorage.setItem('rsvp_confirmed_' + guestName, 'true');

  // Update UI
  const rsvpContainer = document.getElementById('rsvp-action-container');
  const confirmedMessage = document.getElementById('rsvp-confirmed-message');

  rsvpContainer.style.display = 'none';
  confirmedMessage.style.display = 'block';

  // Optional: Auto-scroll to message
  confirmedMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 5. WISHES LOGIC
function submitWish() {
  const nameInput = document.getElementById('wish-name');
  const messageInput = document.getElementById('wish-message');
  const btn = document.getElementById('btn-send-wish');

  const originalText = btn.innerHTML;

  if (!nameInput.value || !messageInput.value) {
    alert('Mohon isi nama dan ucapan Anda.');
    return;
  }

  // Show loading
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;

  const data = new FormData();
  data.append('kategori', 'Ucapan');
  data.append('nama', nameInput.value);
  data.append('pesan', messageInput.value);
  data.append('tanggal', new Date().toLocaleString());

  fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: data })
    .then(response => {
      alert('Terima kasih atas ucapan dan doa Anda!');
      btn.innerHTML = originalText;
      btn.disabled = false;

      // Clear form
      nameInput.value = '';
      messageInput.value = '';

      // Reload wishes to show the new one
      loadWishes();
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('Maaf, terjadi kesalahan saat mengirim ucapan.');
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
}

// FETCH & DISPLAY WISHES
function loadWishes() {
  const displayContainer = document.getElementById('wishes-display');
  if (!displayContainer) return;

  fetch(GOOGLE_SCRIPT_URL) // doGet will be called
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        displayContainer.innerHTML = '<div style="text-align:center; padding:20px; color:#999;">Belum ada ucapan. Jadilah yang pertama!</div>';
        return;
      }

      // Sort: newest first
      data.reverse();

      displayContainer.innerHTML = '';
      data.forEach(wish => {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
          <div class="wish-name"><i class="fas fa-user-circle"></i> ${wish.nama}</div>
          <div class="wish-message">"${wish.pesan}"</div>
          <div class="wish-time">${wish.tanggal}</div>
        `;
        displayContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading wishes:', error);
      displayContainer.innerHTML = '<div style="text-align:center; padding:20px; color:red;">Gagal memuat ucapan. Silakan segarkan halaman.</div>';
    });
}

// PRE-FILL WISH NAME IF AVAILABLE
function prefillWishName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  if (guestName) {
    const nameInput = document.getElementById('wish-name');
    if (nameInput) nameInput.value = guestName;
  }
}

// CALL PREFILL & LOAD WISHES ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  prefillWishName();
  loadWishes(); // Load wishes from GS
});
