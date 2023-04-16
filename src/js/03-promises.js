import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

const showPromise = (amount, step, time, current = 1) => {
  if (current > amount) return;
  createPromise(current, time)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
  time += step;
  setTimeout(() => showPromise(amount, step, time, current + 1), step);
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay;
  const step = event.currentTarget.elements.step;
  const amount = event.currentTarget.elements.amount;
  setTimeout(
    () => showPromise(+amount.value, +step.value, +delay.value),
    +delay.value
  );
});
