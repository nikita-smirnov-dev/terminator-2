export const initAboutAnimation = () => {
  const aboutSection = document.querySelector('[data-about-section]');

  const groups = [
    aboutSection.querySelectorAll('.about-data__item'),
    aboutSection.querySelectorAll('.about-budget__item'),
    aboutSection.querySelectorAll('.about-awards__item'),
    aboutSection.querySelectorAll('.about-impact__item'),
  ];

  const modules = [
    {
      loadEl: '.about-data__load',
      status: 'DATA STREAM: OK',
    },
    {
      loadEl: '.about-budget__load',
      status: 'FINANCE MODULE: VERIFIED',
    },
    {
      loadEl: '.about-awards__load',
      status: 'ARCHIVE ACCESS: GRANTED',
    },
    {
      loadEl: '.about-impact__load',
      status: 'IMPACT ANALYSIS: COMPLETE',
    },
  ];

  let hasAnimated = false;
  let delay = 0;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          groups.forEach((group) => {
            group.forEach((item) => {
              setTimeout(() => {
                item.classList.add('is-visible');
              }, delay);
              delay += 120;
            });
            delay += 300;
          });

          modules.forEach((module, index) => {
            const el = document.querySelector(module.loadEl);

            if (!el) return;

            el.textContent = '...scanning';
            el.classList.add('is-blinking');

            setTimeout(
              () => {
                el.textContent = module.status;
                el.classList.add('is-loaded');
                el.classList.remove('is-blinking');
              },
              1200 + index * 600,
            );
          });

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(aboutSection);
};

initAboutAnimation();
