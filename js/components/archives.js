import archives from '../../data/archives.js';

const initArchives = () => {
  const container = document.querySelector('[data-archives]');

  if (!container) return;

  function renderCard() {
    const defaultSrc = 'img/archives/default-photo.jpg';
    const defaultSrcset = 'img/archives/default-photo.webp';

    const cardHTML = archives
      .map(
        (item, index) => `
      <div class="archives__card" tabindex="0" 
       role="button"
       aria-expanded="false" 
       aria-controls="archive-text-${index}">
      <div class="archives__img-box">
        <picture>
          <source srcset="${item.srcset}" type="image/webp" />
          <img class="archives__img" src="${item.src}" alt="${item.title}" loading="lazy"/>
        </picture>
        </div>
        <div class="archives__content">
          <h3 class="archives__subtitle">${item.title}</h3>
          <p class="archives__text" id="archive-text-${index}">
            ${item.text}
          </p>
        </div>
      </div>
      `,
      )
      .join('');

    container.innerHTML = cardHTML;

    container.addEventListener(
      'error',
      (event) => {
        if (event.target.tagName !== 'IMG') return;

        const img = event.target;

        if (img.dataset.errorHandled) return;
        img.dataset.errorHandled = 'true';

        const picture = img.closest('picture');

        if (picture) {
          const source = picture.querySelector('source');
          if (source) {
            source.srcset = defaultSrcset;
          }
        }

        img.src = defaultSrc;
      },
      true,
    );

    container.addEventListener(
      'mouseenter',
      (event) => {
        const card = event.target.closest('.archives__card');
        if (card) card.setAttribute('aria-expanded', 'true');
      },
      true,
    );

    container.addEventListener(
      'mouseleave',
      (event) => {
        const card = event.target.closest('.archives__card');
        if (card) card.setAttribute('aria-expanded', 'false');
      },
      true,
    );

    container.addEventListener(
      'focusin',
      (event) => {
        const card = event.target.closest('.archives__card');
        if (card) card.setAttribute('aria-expanded', 'true');
      },
      true,
    );

    container.addEventListener(
      'focusout',
      (event) => {
        const card = event.target.closest('.archives__card');
        if (card) card.setAttribute('aria-expanded', 'false');
      },
      true,
    );
  }
  renderCard();
};

initArchives();
