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
