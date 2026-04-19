import actors from '../../data/actors.js';

const initActorsSlider = () => {
  const swiperContainer = document.querySelector(
    '.swiper-cast .swiper-wrapper',
  );

  if (!swiperContainer) return;

  function renderActors() {
    for (let item of actors) {
      const slide = document.createElement('div');
      const defaultImg = 'img/cast/default.svg';

      slide.className = 'swiper-slide cast-card';
      slide.setAttribute('tabindex', '0');

      slide.innerHTML = `
          <picture>
            <source srcset="${item.srcset}" type="image/webp" />
            <img class="cast-card__img" src='${item.src}' alt="" aria-hidden="true" loading="lazy" />
          </picture>
          <div class="cast-card__info">
            <div class="cast-card__actor" aria-hidden="true">${item.actor}</div>
            <span class="cast-card__role" aria-hidden="true">${item.role}</span>
          </div>
          <span class="visually-hidden">Карточка актёра: ${item.actor} в роли ${item.role}</span>
      `;
      const img = slide.querySelector('img');
      const source = slide.querySelector('source');

      img.addEventListener('error', () => {
        img.src = defaultImg;
        source.srcset = defaultImg;
      });
      swiperContainer.append(slide);
    }
  }

  renderActors();

  const swiperCast = new Swiper('.swiper-cast', {
    slidesPerView: 2.5,
    spaceBetween: 16,

    breakpoints: {
      480: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },

      768: {
        slidesPerView: 4.5,
        spaceBetween: 24,
      },

      1024: {
        slidesPerView: 5.5,
        spaceBetween: 32,
      },

      1280: {
        slidesPerView: 6,
        spaceBetween: 40,
      },
    },

    a11y: {
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      notificationClass: 'swiper-notification',
      containerMessage: 'Список актеров фильма',
      itemRoleDescriptionMessage: null,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },

    scrollbar: {
      el: '.swiper-cast-scrollbar',
      draggable: true,
    },
  });
};

initActorsSlider();
