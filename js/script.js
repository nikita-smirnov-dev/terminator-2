const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: true,
  speed: 1000,
  effect: 'fade',
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

const tab800 = document.getElementById('t-800');
const tab1000 = document.getElementById('t-1000');

const t800 = document.querySelector('.terminator__info--t800');
const t1000 = document.querySelector('.terminator__info--t1000');

tab800.classList.add('active');
t800.classList.add('is-active');
t1000.classList.remove('is-active');

tab800.addEventListener('click', () => {
  tab800.classList.add('active');
  tab1000.classList.remove('active');

  t800.classList.add('is-active');
  t1000.classList.remove('is-active');
});

tab1000.addEventListener('click', () => {
  tab1000.classList.add('active');
  tab800.classList.remove('active');

  t1000.classList.add('is-active');
  t800.classList.remove('is-active');
});

const aboutSection = document.querySelector('.about');

const groups = [
  document.querySelectorAll('.about-data__item'),
  document.querySelectorAll('.about-budget__item'),
  document.querySelectorAll('.about-awards__item'),
  document.querySelectorAll('.about-impact__item'),
];

const modules = [
  {
    loadEl: '.about-data__load',
    status: 'DATA STREAM: OK',
  },
  {
    loadEl: '.about-budget__load',
    status: 'FINANCE MODULE: VERIFIED',
  },
  {
    loadEl: '.about-awards__load',
    status: 'ARCHIVE ACCESS: GRANTED',
  },
  {
    loadEl: '.about-impact__load',
    status: 'IMPACT ANALYSIS: COMPLETE',
  },
];

let hasAnimated = false;
let delay = 0;

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;

        groups.forEach((group) => {
          group.forEach((item) => {
            setTimeout(() => {
              item.classList.add('is-visible');
            }, delay);
            delay += 120;
          });
          delay += 300;
        });

        modules.forEach((module, index) => {
          const el = document.querySelector(module.loadEl);

          if (!el) return;

          el.textContent = '...scanning';
          el.classList.add('is-blinking');

          setTimeout(
            () => {
              el.textContent = module.status;
              el.classList.add('is-loaded');
              el.classList.remove('is-blinking');
            },
            1200 + index * 600,
          );
        });

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

observer.observe(aboutSection);
