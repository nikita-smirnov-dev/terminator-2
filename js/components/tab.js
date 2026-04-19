const initTabs = () => {
  const container = document.querySelector('[data-terminators-container]');

  if (!container) return;

  const tabs = container.querySelectorAll('[role=tab]');
  const panels = container.querySelectorAll('[role=tabpanel]');

  if (!tabs.length || !panels.length) return;

  tabs[0].classList.add('active');
  tabs[0].setAttribute('tabindex', '0');
  panels[0].classList.add('is-active');

  const toggleTabs = (btn) => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    panels.forEach((p) => {
      p.classList.remove('is-active');
      p.setAttribute('aria-hidden', 'true');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');

    const targetId = btn.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);

    if (targetPanel) {
      targetPanel.classList.add('is-active');
      targetPanel.setAttribute('aria-hidden', 'false');
    } else {
      console.error(`Панель с id "${targetId}" не найдена!`);
    }

    btn.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => toggleTabs(tab));

    tab.addEventListener('keydown', (e) => {
      const idx = Array.from(tabs).indexOf(tab);

      let newIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = (idx + 1) % tabs.length;
          e.preventDefault();
          toggleTabs(tabs[newIndex]);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = (idx - 1 + tabs.length) % tabs.length;
          e.preventDefault();
          toggleTabs(tabs[newIndex]);
          break;
        case 'Home':
          e.preventDefault();
          toggleTabs(tabs[0]);
          break;
        case 'End':
          e.preventDefault();
          toggleTabs(tabs[tabs.length - 1]);
          break;
      }
    });
  });
};

initTabs();
