const form = document.querySelector('#form');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (
    nome.value.trim() === '' ||
    email.value.trim() === '' ||
    !email.value.includes('@')
  ) {
    feedback.textContent = 'Preencha os campos corretamente!';
    feedback.style.color = 'red';
  } else {
    feedback.textContent = 'Formulário enviado com sucesso!';
    feedback.style.color = 'green';
  }
});