export const initBurger = () => {
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
    const isMenuVisible = nav.classList.contains('nav--visible');
    const isClickOnBurger = burger.contains(e.target);

    // Если меню открыто и мы нажали НЕ на кнопку бургера
    if (isMenuVisible && !isClickOnBurger) {
      // 1. Проверяем, нажал ли пользователь на ссылку (чтобы закрыть после перехода)
      const isClickOnLink = e.target.closest('[data-nav-link]');

      // 2. Проверяем, нажал ли пользователь на оверлей (само тело .nav, но не список внутри него)
      // Это сработает, если список .nav__list не занимает 100% ширины .nav
      const isClickOnOverlay = e.target === nav;

      if (isClickOnLink || isClickOnOverlay) {
        closeMenu();
      }
    }
  });
};

initBurger();
