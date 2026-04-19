const getHeaderheight = () => {
  const heightHeader = document.querySelector('.header').offsetHeight;
  const root = document.querySelector(':root');

  root.style.setProperty('--header-height', `${heightHeader}px`);
};

getHeaderheight();
