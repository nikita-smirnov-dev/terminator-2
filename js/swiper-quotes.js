import quotes from '../data/quotes.js';

export const initQuotesSlider = () => {
  const swiperContainer = document.querySelector(
    '.swiper-hero .swiper-wrapper',
  );

  if (!swiperContainer) return;

  function renderSliderQuotes() {
    for (let item of quotes) {
      const slide = document.createElement('div');

      slide.className = 'swiper-slide-hero swiper-slide ';
      slide.style = `background-image: url(${item.src})`;

      slide.innerHTML = `
      <img src="${item.src}" alt="${item.title}">
      <p class='swiper-text'>${item.text}</p>
      `;
      swiperContainer.append(slide);
    }
  }

  renderSliderQuotes();

  const swiper = new Swiper('.swiper-hero', {
    slidesPerView: 1,
    loop: true,
    speed: 2500,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesProgress: true,
  });
};

initQuotesSlider();
