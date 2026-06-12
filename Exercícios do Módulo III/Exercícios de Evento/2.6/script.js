const campo = document.querySelector('#campo');
const lista = document.querySelector('#lista');

campo.addEventListener('keydown', (e) => {

  if (e.key === 'Enter' && campo.value.trim() !== '') {

    const li = document.createElement('li');

    li.textContent = campo.value;

    lista.appendChild(li);

    campo.value = '';
  }

});