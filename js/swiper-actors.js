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

      slide.className = 'swiper-cast-slide swiper-slide ';

      img.addEventListener('error', function () {
        this.src = 'img/cast/default.svg';
      });

      img.src = item.src;
      img.alt = item.actor;

      actorText.textContent = item.actor;
      roleText.textContent = item.role;

      img.className = 'swiper-cast-img';
      actorInfo.className = 'swiper-cast-info';
      actorText.className = 'swiper-cast-actor';
      roleText.className = 'swiper-cast-role';

      actorInfo.append(actorText, roleText);
      slide.append(img, actorInfo);
      swiperContainer.append(slide);
    }
  }

  renderActors();

  const swiperCast = new Swiper('.swiper-cast', {
    slidesPerView: 'auto',
    spaceBetween: 32,

    scrollbar: {
      el: '.swiper-cast-scrollbar',
      draggable: true,
    },
  });
};

initActorsSlider();
