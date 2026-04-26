const initBanner = () => {
  const timerElement = document.querySelector('[data-countdown]');

  const targetDate = new Date('July 3, 2026 00:00:00').getTime();

  const declension = (value, words) => {
    const num = Math.abs(value) % 100;
    const num1 = num % 10;
    if (num > 10 && num < 20) return words[2];
    if (num1 > 1 && num1 < 5) return words[1];
    if (num1 === 1) return words[0];
    return words[2];
  };

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      timerElement.textContent = `"Terminator 2:
                Judgment Day": 35 ЛЕТ ЛЕГЕНДЕ!`;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (timerElement) {
      const d = declension(days, ['день', 'дня', 'дней']);
      const h = declension(hours, ['час', 'часа', 'часов']);
      const m = declension(minutes, ['минута', 'минуты', 'минут']);
      const s = declension(seconds, ['секунда', 'секунды', 'секунд']);

      timerElement.textContent = `${days} ${d} ${hours.toString().padStart(2, '0')} ${h} ${minutes.toString().padStart(2, '0')} ${m} ${seconds.toString().padStart(2, '0')} ${s}`;
    }
  };

  setInterval(updateTimer, 1000);
  updateTimer();
};

initBanner();
