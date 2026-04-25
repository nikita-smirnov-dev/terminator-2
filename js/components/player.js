const initPlayer = () => {
  const playBtn = document.querySelectorAll('.soundtrack__btn');

  if (!playBtn.length) return;

  function formatTime(time = 0) {
    if (!Number.isFinite(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  playBtn.forEach((item) => {
    const currentItem = item.closest('.soundtrack__player');
    const currentAudio = currentItem.querySelector('.soundtrack__song');
    const progressContainer = currentItem.querySelector(
      '.soundtrack__progress',
    );
    const progress = currentItem.querySelector('.soundtrack__progress-bar');
    const timeline = currentItem.querySelector('.soundtrack__timeline');
    const volumeContainer = currentItem.querySelector('.soundtrack__volume');
    const volumeBtn = currentItem.querySelector('.soundtrack__volume-btn');
    const volumeInput = currentItem.querySelector('.soundtrack__volume-input');

    currentAudio.volume = 0.5;
    volumeInput.value = 0.5;

    currentAudio.addEventListener('loadedmetadata', () => {
      if (currentAudio.duration) {
        timeline.textContent = formatTime(currentAudio.duration);
      } else {
        timeline.textContent = '0:00';
      }
    });

    currentAudio.addEventListener('timeupdate', () => {
      if (!currentAudio.duration) return;

      const progressPercent =
        (currentAudio.currentTime / currentAudio.duration) * 100;
      progressContainer.setAttribute(
        'aria-valuenow',
        Math.round(progressPercent),
      );

      progress.style.width = `${progressPercent}%`;

      timeline.textContent = formatTime(currentAudio.currentTime);
    });

    progressContainer.addEventListener('keydown', (e) => {
      if (!currentAudio.duration) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          currentAudio.currentTime = currentAudio.currentTime + 5;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          currentAudio.currentTime = currentAudio.currentTime - 5;
          break;
      }
    });

    progressContainer.addEventListener('click', (e) => {
      if (!currentAudio.duration) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const duration = currentAudio.duration;

      currentAudio.currentTime = (clickX / width) * duration;
    });

    let lastVolume = 0.5;

    volumeBtn.addEventListener('click', () => {
      if (currentAudio.volume > 0) {
        lastVolume = currentAudio.volume;
        currentAudio.volume = 0;
        volumeInput.value = 0;
        volumeBtn.classList.add('is-volume');
        volumeBtn.setAttribute('aria-label', 'Включить звук');
      } else {
        currentAudio.volume = lastVolume > 0 ? lastVolume : 0.5;
        volumeInput.value = currentAudio.volume;
        volumeBtn.classList.remove('is-volume');
        volumeBtn.setAttribute('aria-label', 'Выключить звук');
      }
    });

    volumeInput.addEventListener('input', () => {
      const value = volumeInput.value;
      currentAudio.volume = value;

      volumeInput.setAttribute('aria-valuenow', Math.round(value * 100));

      if (value == 0) {
        volumeBtn.classList.add('is-volume');
      } else {
        volumeBtn.classList.remove('is-volume');
      }
    });

    volumeBtn.addEventListener('focus', () => {
      volumeBtn.setAttribute('aria-expanded', 'true');
    });

    volumeInput.addEventListener('focus', () => {
      volumeBtn.setAttribute('aria-expanded', 'true');
    });

    volumeContainer.addEventListener('focusout', (e) => {
      if (!volumeContainer.contains(e.relatedTarget)) {
        volumeBtn.setAttribute('aria-expanded', 'false');
      }
    });

    item.addEventListener('click', () => {
      if (currentItem.classList.contains('is-playing')) {
        currentItem.classList.remove('is-playing');
        currentAudio.pause();
        item.setAttribute('aria-label', 'Воспроизвести саундтрек');
      } else {
        document.querySelectorAll('.soundtrack__player').forEach((el) => {
          if (el === currentItem) return;

          el.classList.remove('is-playing');

          const audio = el.querySelector('.soundtrack__song');
          const btn = el.querySelector('.soundtrack__btn');
          const progress = el.querySelector('.soundtrack__progress-bar');
          const timeline = el.querySelector('.soundtrack__timeline');

          if (audio) audio.pause();
          audio.currentTime = 0;
          btn.setAttribute('aria-label', 'Воспроизвести саундтрек');
        });
        currentItem.classList.add('is-playing');
        currentAudio.play();
        item.setAttribute('aria-label', 'Поставить на паузу');
      }
    });

    currentAudio.addEventListener('ended', () => {
      currentItem.classList.remove('is-playing');
      item.setAttribute('aria-label', 'Воспроизвести саундтрек');
      progress.style.width = '0%';
      timeline.textContent = formatTime(currentAudio.duration);
    });
  });
};

initPlayer();
