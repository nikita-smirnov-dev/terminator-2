import quotes from '../../data/quotes.js';

const initQuotesSlider = () => {
  const swiperContainer = document.querySelector(
    '.hero__content .hero__wrapper',
  );

  if (!swiperContainer) return;

  function renderSliderQuotes() {
    for (let item of quotes) {
      const slide = document.createElement('div');

      slide.className = 'swiper-slide hero__card';

      slide.innerHTML = `
      <div class='hero__bg-wrapper'>
          <picture>
         <source srcset='${item.srcset}' type='image/webp'>
          <img src='${item.src}' alt='' aria-hidden='true'>
         </picture>
         </div>
      <picture>
        <source srcset='${item.srcset}' type='image/webp'>
        <img src='${item.src}' alt='${item.title}'>
      </picture>
      <p class='hero__text'>${item.text}</p>
      `;
      swiperContainer.append(slide);
    }
  }

  renderSliderQuotes();

  const swiper = new Swiper('.hero__content', {
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
