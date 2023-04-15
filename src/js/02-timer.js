import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const output = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    }
    selectedDates[0] > new Date() && startBtn.removeAttribute('disabled');
    const date = convertMs(selectedDates[0] - new Date());
    updateTimer(date);
  },
};

const timerId = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

startBtn.addEventListener('click', () => {
  const targetDate = new Date(input.value);
  startBtn.setAttribute('disabled', 'disabled');

  timerId.days = setInterval(() => {
    const date = convertMs(targetDate - new Date());
    updateTimer(date);
  }, 1000);

  timerId.hours = setInterval(() => {
    const date = convertMs(targetDate - new Date());
    updateTimer(date);
  }, 1000);

  timerId.minutes = setInterval(() => {
    const date = convertMs(targetDate - new Date());
    updateTimer(date);
  }, 1000);

  timerId.seconds = setInterval(() => {
    const date = convertMs(targetDate - new Date());
    updateTimer(date);
  }, 1000);
});

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  }
  return value;
}

function updateTimer(date) {
  output.days.textContent = addLeadingZero(date.days);
  output.hours.textContent = addLeadingZero(date.hours);
  output.minutes.textContent = addLeadingZero(date.minutes);
  output.seconds.textContent = addLeadingZero(date.seconds);

  if (
    date.days === 0 &&
    date.hours === 0 &&
    date.minutes === 0 &&
    date.seconds === 0
  ) {
    clearInterval(timerId.days);
    clearInterval(timerId.hours);
    clearInterval(timerId.minutes);
    clearInterval(timerId.seconds);
    window.alert('Time is up!');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(input, options);
