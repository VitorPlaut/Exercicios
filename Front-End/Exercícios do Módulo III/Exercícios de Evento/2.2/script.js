let contador = 0;
const valor = document.querySelector('#valor');

document.querySelector('#btn-inc').addEventListener('click', () => {
    valor.textContent = ++contador;
  });

  document.querySelector('#btn-dec').addEventListener('click', () => {
    if (contador > 0) valor.textContent = --contador;
  });