import actors from '../data/actors.js';

export const initActorsSlider = () => {
  const swiperContainer = document.querySelector(
    '.swiper-cast .swiper-wrapper',
  );

  if (!swiperContainer) return;

  function renderActors() {
    for (let item of actors) {
      const slide = document.createElement('div');
      const picture = document.createElement('picture');
      const source = document.createElement('source');
      const img = document.createElement('img');
      const actorInfo = document.createElement('div');
      const actorText = document.createElement('p');
      const roleText = document.createElement('span');
      const srOnly = document.createElement('span');
      const defaultImg = 'img/cast/default.svg';

      slide.className = 'swiper-cast-slide swiper-slide ';
      slide.setAttribute('tabindex', '0');

      source.srcset = item.srcset;
      source.type = item.type;

      srOnly.classList.add('visually-hidden');
      srOnly.textContent = `Карточка актёра: ${item.actor} в роли ${item.role}`;

      img.onerror = () => {
        img.src = defaultImg;
        source.srcset = defaultImg;
      };

      img.src = item.src;
      img.alt = '';
      img.loading = 'lazy';
      img.setAttribute('aria-hidden', 'true');

      actorText.textContent = item.actor;
      roleText.textContent = item.role;
      actorText.setAttribute('aria-hidden', 'true');
      roleText.setAttribute('aria-hidden', 'true');

      img.className = 'swiper-cast-img';
      actorInfo.className = 'swiper-cast-info';
      actorText.className = 'swiper-cast-actor';
      roleText.className = 'swiper-cast-role';

      actorInfo.append(actorText, roleText);
      picture.append(source, img);
      slide.append(picture, actorInfo, srOnly);
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
