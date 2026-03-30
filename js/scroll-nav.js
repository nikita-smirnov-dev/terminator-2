export const initScrollNav = () => {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach((link) => {
    if (!smoothLinks) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();

      const id = link.getAttribute('href');

      if (id === '#') return;

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};

initScrollNav();
