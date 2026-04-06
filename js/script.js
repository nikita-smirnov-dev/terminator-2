import '../js/scroll-nav.js';
import '../js/burger.js';
import '../js/swiper-quotes.js';
import '../js/swiper-actors.js';
import '../js/tab.js';
import '../js/about-animation.js';
import '../js/player.js';

const getHeaderheight = () => {
  const heightHeader = document.querySelector('.header').offsetHeight;
  const root = document.querySelector(':root');

  root.style.setProperty('--header-height', `${heightHeader}px`);
};

getHeaderheight();
