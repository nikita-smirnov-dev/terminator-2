export const initTabs = () => {
  const tabsTerminators = document.querySelector('[data-terminators-tabs]');

  if (!tabsTerminators) return;

  const tab800 = tabsTerminators.querySelector('[data-tab-t-800]');
  const tab1000 = tabsTerminators.querySelector('[data-tab-t-1000]');

  const t800 = tabsTerminators.querySelector('[data-t-800]');
  const t1000 = tabsTerminators.querySelector('[data-t-1000]');

  if (!tab800 || !tab1000 || !t800 || !t1000) return;

  tab800.classList.add('active');
  t800.classList.add('is-active');
  t1000.classList.remove('is-active');

  tab800.addEventListener('click', () => {
    tab800.classList.add('active');
    tab1000.classList.remove('active');

    t800.classList.add('is-active');
    t1000.classList.remove('is-active');
  });

  tab1000.addEventListener('click', () => {
    tab1000.classList.add('active');
    tab800.classList.remove('active');

    t1000.classList.add('is-active');
    t800.classList.remove('is-active');
  });
};

initTabs();
