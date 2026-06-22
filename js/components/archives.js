import archives from '../../data/archives.js';

const initArchives = () => {
  const container = document.querySelector('[data-archives]');

  if (!container) return;

  function renderCard() {
    const cardHTML = archives
      .map(
        (item) => `
      <div class="archives__card">
      <div class="archives__img-box">
        <picture>
          <source srcset="${item.srcset}" type="image/webp" />
          <img class="archives__img" src="${item.src}" alt="${item.title}"/>
        </picture>
        </div>
        <div class="archives__content">
          <h3 class="archives__subtitle">${item.title}</h3>
          <p class="archives__text">
            ${item.text}
          </p>
        </div>
      </div>
      `,
      )
      .join('');
    container.innerHTML = cardHTML;
  }
  renderCard();
};

initArchives();
