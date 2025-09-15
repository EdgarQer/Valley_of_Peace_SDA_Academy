const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-item a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

const header = document.querySelector('.main-nav');
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});



const slides = Array.from(document.querySelectorAll('.slide'));
const dots   = Array.from(document.querySelectorAll('.hero-dot'));
let currentImageIndex = 0;
let timer = null;
let started = false;

function setSlide(n, zoom) {
  currentImageIndex = (n + slides.length) % slides.length;

  slides.forEach(function (s, i) {
    s.classList.toggle('is-active', i === currentImageIndex);
    if (zoom && s.hasAttribute('data-zoom')) {
      s.classList.remove('zooming');
      void s.offsetWidth;
      s.classList.add('zooming');
      setTimeout(function () { s.classList.remove('zooming'); }, 2200);
    } else {
      s.classList.remove('zooming');
    }
  });

  dots.forEach(function (d, i) {
    d.classList.toggle('is-active', i === currentImageIndex);
  });
}

if (slides.length) setSlide(0, false);

dots.forEach(function (d) {
  d.addEventListener('click', function () {
    setSlide(Number(this.dataset.slide), true);
  });
});

const hero = document.querySelector('.hero-section');
const heroHeight = hero ? hero.offsetHeight : 0;

window.addEventListener('scroll', function () {
  if (!slides.length || !heroHeight) return;

  const insideHero = window.scrollY < heroHeight;

  if (insideHero && !started) {
    started = true;
    if (!timer) {
      timer = setInterval(function () {
        setSlide(currentImageIndex + 1, true);
      }, 2400);
    }
  }

  if (!insideHero && timer) {
    clearInterval(timer);
    timer = null;
    started = false;
  }
}, { passive: true });