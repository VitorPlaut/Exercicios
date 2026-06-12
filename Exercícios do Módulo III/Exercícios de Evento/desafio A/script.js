const tarefa = document.querySelector('#nova-tarefa');
const lista = document.querySelector('#lista');
const contador = document.querySelector('#contador');
const btn = document.querySelector('#btn');

function adicionarNovaTarefa() {
  if (tarefa.value.trim() === '') {
    return;
  }

  const li = document.createElement('li');
  li.textContent = tarefa.value;
  lista.appendChild(li);

  tarefa.value = '';
}

btn.addEventListener('click', adicionarNovaTarefa);

tarefa.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    adicionarNovaTarefa();
  }
});