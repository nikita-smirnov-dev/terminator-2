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
    speed: 1000,
    effect: 'fade',
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
};

initQuotesSlider();
