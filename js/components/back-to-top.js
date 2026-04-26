const initBackToTop = () => {
  const btn = document.querySelector('[data-backtotop]');

  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('back-to-top--visible', window.scrollY > 300);
    },
    { passive: true },
  );

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

initBackToTop();
