const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');
let clicado = false;

btn.addEventListener('click', () => {
    clicado = !clicado;
    msg.textContent = clicado ? '✅ Clicado!' : '↩️ Clique novamente';

});