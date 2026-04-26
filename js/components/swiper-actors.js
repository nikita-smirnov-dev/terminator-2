import actors from '../../data/actors.js';

const initActorsSlider = () => {
  const swiperContainer = document.querySelector('.cast__wrapper');

  if (!swiperContainer) return;

  function renderActors() {
    for (let item of actors) {
      const slide = document.createElement('div');
      const defaultImg = 'img/cast/default.svg';

      slide.className = 'swiper-slide cast-card';

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
    slidesPerView: 'auto',
    spaceBetween: 30,
    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 80,
    touchRatio: 5,
    resistanceRatio: 0.1,

    breakpoints: {
      320: { spaceBetween: 16 },
      768: { spaceBetween: 30 },
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },

    a11y: {
      enabled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      notificationClass: 'swiper-notification',
      containerMessage:
        'Список актеров фильма. Используйте стрелки для прокрутки',
      itemRoleDescriptionMessage: null,
    },
  });
};

initActorsSlider();
