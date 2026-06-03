const btnTema = document.querySelector('#btn-tema');

btnTema.addEventListener('click', ()  => { 

document.body.classList.toggle('dark');

const modoEscuro = document.body.classList.contains('dark');

btnTema.textContent = modoEscuro ? '☀️Modo Claro' : '🌙Modo Escuro';
});

const btnToggleInfo = document.querySelector('#btn-toggle-info');
const infoCorpo     = document.querySelector('#info-corpo');

btnToggleInfo.addEventListener('click', () =>  {
    const visivel = infoCorpo.style.display !== 'none';

    if (visivel){
        infoCorpo.style.display = 'none';
        btnToggleInfo.textContent = 'Mostrar';

    } else{
        infoCorpo.style.display = 'block';
        btnToggleInfo.textContent = 'Ocultar';
    }

    // visivel ?
    // (infoCorpo.style.display = 'none', btnToggleInfo.textContent = 'Mostrar')
    //  : (infoCorpo.style.display = 'block', btnToggleInfo.textContent = 'Ocultar');

});

const btnAumentarJs = document.querySelector('#btn-aumentar-js');
const barraJs       = document.querySelector('#barra-js');
const nivelJs       = document.querySelector('#nivel-js');

btnAumentarJs.addEventListener('click', () => {
    const nivelAtual = parseInt(nivelJs.textContent);

    if(nivelAtual >= 100){
        btnAumentarJs.textContent = 'Javascript Dominado';
        btnAumentarJs.disabled = 'true';
        return;
    }

    const novoNivel = Math.min(nivelAtual + 10, 100);

    nivelJs.textContent = novoNivel + '%';

    barraJs.style.width = novoNivel + '%';

});