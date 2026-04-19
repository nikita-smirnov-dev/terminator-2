const initBurger = () => {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');

  if (!burger || !nav) return;

  const openMenu = () => {
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    nav.classList.add('nav--visible');
    document.body.classList.add('stop-scroll');
  };

  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    nav.classList.remove('nav--visible');
    document.body.classList.remove('stop-scroll');
  };

  const toggleMenu = () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';

    expanded ? closeMenu() : openMenu();
  };

  burger.addEventListener('click', toggleMenu);

  nav.addEventListener('click', (e) => {
    if (e.target.closest('[data-nav-link]')) {
      closeMenu();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--visible')) {
      closeMenu();
    }
  });

  window.addEventListener('click', (e) => {
    const isClickInsideNav = e.target.closest('[data-nav]');
    const isClickOnBurger = e.target.closest('[data-burger]');

    if (!isClickInsideNav && !isClickOnBurger) {
      closeMenu();
    }
  });
};

initBurger();
