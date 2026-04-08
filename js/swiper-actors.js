import actors from '../data/actors.js';

export const initActorsSlider = () => {
  const swiperContainer = document.querySelector(
    '.swiper-cast .swiper-wrapper',
  );

  if (!swiperContainer) return;

  function renderActors() {
    for (let item of actors) {
      const slide = document.createElement('div');
      const img = document.createElement('img');
      const actorInfo = document.createElement('div');
      const actorText = document.createElement('p');
      const roleText = document.createElement('span');
      const srOnly = document.createElement('span');

      slide.className = 'swiper-cast-slide swiper-slide ';
      slide.setAttribute('tabindex', '0');

      srOnly.classList.add('visually-hidden');
      srOnly.textContent = `Карточка актёра: ${item.actor} в роли ${item.role}`;

      img.addEventListener('error', function () {
        this.src = 'img/cast/default.svg';
      });

      img.src = item.src;
      img.alt = '';
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
      slide.append(img, actorInfo, srOnly);
      swiperContainer.append(slide);
    }
  }

  renderActors();

  const swiperCast = new Swiper('.swiper-cast', {
    slidesPerView: 1.5,
    slidesPerGroup: 1,
    spaceBetween: 20,

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
    breakpoints: {
      374: {
        slidesPerView: 'auto',
        spaceBetween: 32,
      },
    },
  });
};

initActorsSlider();
