// Описаний в документації

import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

let userSelectedDate = 0;

const btn = document.querySelector('button');
btn.disabled = true;

const inpt = document.querySelector('input');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btn.disabled = false;
      userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);
    } else {
      btn.disabled = true;
      window.alert('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btn.addEventListener('click', () => {
  const interval = setInterval(() => {
    const ms = userSelectedDate - Date.now();

    const time = convertMs(ms);

    daysEl.textContent = addLeadingZero(time.days);
    hoursEl.textContent = addLeadingZero(time.hours);
    minutesEl.textContent = addLeadingZero(time.minutes);
    secondsEl.textContent = addLeadingZero(time.seconds);

    if (ms <= 0) {
      clearInterval(interval);
      return;
    }

    btn.disabled = true;
    inpt.disabled = true;
    return time;
  }, 1000);
});
