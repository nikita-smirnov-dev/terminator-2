const swiper = new Swiper('.swiper-hero', {
  slidesPerView: 1,
  loop: true,
  speed: 1000,
  effect: 'fade',
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

const tab800 = document.getElementById('t-800');
const tab1000 = document.getElementById('t-1000');

const t800 = document.querySelector('.terminator__info--t800');
const t1000 = document.querySelector('.terminator__info--t1000');

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

const aboutSection = document.querySelector('.about');

const groups = [
  document.querySelectorAll('.about-data__item'),
  document.querySelectorAll('.about-budget__item'),
  document.querySelectorAll('.about-awards__item'),
  document.querySelectorAll('.about-impact__item'),
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

const playBtn = document.querySelectorAll('.soundtrack__btn');

function formatTime(time = 0) {
  if (!Number.isFinite(time)) return '0:00';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

playBtn.forEach((item) => {
  const currentItem = item.closest('.soundtrack__player');
  const currentAudio = currentItem.querySelector('.soundtrack__song');
  const progressContainer = currentItem.querySelector('.soundtrack__progress');
  const progress = currentItem.querySelector('.soundtrack__progress-bar');
  const timeline = currentItem.querySelector('.soundtrack__timeline');

  currentAudio.addEventListener('loadedmetadata', () => {
    if (currentAudio.duration) {
      timeline.textContent = formatTime(currentAudio.duration);
    } else {
      timeline.textContent = '0:00';
    }
  });

  currentAudio.addEventListener('timeupdate', () => {
    const progressPercent =
      (currentAudio.currentTime / currentAudio.duration) * 100;

    progress.style.width = `${progressPercent}%`;

    timeline.textContent = formatTime(currentAudio.currentTime);
  });

  progressContainer.addEventListener('click', (e) => {
    if (!currentAudio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = currentAudio.duration;

    currentAudio.currentTime = (clickX / width) * duration;
  });

  item.addEventListener('click', () => {
    if (currentItem.classList.contains('is-playnig')) {
      currentItem.classList.remove('is-playnig');
      currentAudio.pause();
    } else {
      document.querySelectorAll('.soundtrack__player').forEach((el) => {
        if (el === currentItem) return;

        el.classList.remove('is-playnig');

        const audio = el.querySelector('.soundtrack__song');
        const progress = el.querySelector('.soundtrack__progress-bar');
        const timeline = el.querySelector('.soundtrack__timeline');

        if (audio) audio.pause();
        if (progress) progress.style.width = '0%';
        timeline.textContent = formatTime(audio.duration);
      });
      currentItem.classList.add('is-playnig');
      currentAudio.play();
    }
  });

  currentAudio.addEventListener('ended', () => {
    currentItem.classList.remove('is-playnig');
    progress.style.width = '0%';
    timeline.textContent = formatTime(currentAudio.duration);
  });
});

const actors = [
  {
    src: 'img/cast/Arnold_Schwarzenegger.jpg',
    actor: 'Арнольд Шварценеггер',
    role: 'терминатор Т-800',
  },
  {
    src: 'img/cast/Linda_Hamilton.jpg',
    actor: 'Линда Хэмилтон',
    role: 'Сара Коннор',
  },
  {
    src: 'img/cast/Edward_Furlong.jpg',
    actor: 'Эдвард Ферлонг',
    role: 'Джон Коннор',
  },
  {
    src: 'img/cast/Robert_Patrick.jpg',
    actor: 'Роберт Патрик',
    role: 'терминатор Т-1000',
  },
  {
    src: 'img/cast/Earl_Boen.jpg',
    actor: 'Эрл Боэн',
    role: 'Доктор Зильберман',
  },
  {
    src: 'img/cast/Joe_Morton.jpg',
    actor: 'Джо Мортон',
    role: 'Майлз Дайсон',
  },
  {
    src: 'img/cast/Lesly_Hamilton.jpg',
    actor: 'Лесли Хэмилтон',
    role: 'Twin Sarah',
  },
  {
    src: 'img/cast/Alexander_Berkeley.jpg',
    actor: 'Ксандер Беркли',
    role: 'Тодд Войт',
  },
  {
    src: 'img/cast/Jenette_Goldstein.jpg',
    actor: 'Дженетт Голдстин',
    role: 'Джанель Войт',
  },
  {
    src: 'img/cast/Daniel_Cooksey.jpg',
    actor: 'Дэнни Кукси',
    role: 'Тим',
  },
  {
    src: 'img/cast/Dan_Stanton.jpg',
    actor: 'Дэн Стэнтон',
    role: 'Lewis as T-1000',
  },
  {
    src: 'img/cast/Don_Stanton.jpg',
    actor: 'Don Stanton ',
    role: 'Lewis as T-1000',
  },
  {
    src: 'img/cast/Sharon_Merkerson.jpg',
    actor: 'С. Ипейта Меркерсон',
    role: 'Тарисса Дайсон',
  },
];

const swiperContainer = document.querySelector('.swiper-cast .swiper-wrapper');

function renderActors() {
  for (let item of actors) {
    const slide = document.createElement('div');
    const img = document.createElement('img');
    const actorText = document.createElement('p');
    const roleText = document.createElement('span');

    slide.className = 'swiper-cast-slide swiper-slide ';

    img.src = item.src;
    img.alt = item.actor;

    actorText.textContent = item.actor;
    roleText.textContent = item.role;

    slide.append(img, actorText, roleText);
    swiperContainer.append(slide);
  }
}

renderActors();

const swiperCast = new Swiper('.swiper-cast', {
  slidesPerView: 'auto',
  spaceBetween: 32,
});
