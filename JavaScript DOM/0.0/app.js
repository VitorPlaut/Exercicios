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

const btnEditarNome     = document.querySelector('#btn-editar-nome');
const formEdicao        = document.querySelector('#form-edicao');
const inputNome         = document.querySelector('#input-nome');
const inputProfissao    = document.querySelector('#input-profissao');
const nomeUsuario       = document.querySelector('#nome-usuario');
const profissaoUsuario  = document.querySelector('#profissao-usuario');

btnEditarNome.addEventListener('click', ()  => {
    formEdicao.style.display = 'block';

    inputNome.value = nomeUsuario.textContent;
    inputProfissao.value = profissaoUsuario.textContent;
});

const btnSalvar    = document.querySelector('#btn-salvar');
const btnCancelar  = document.querySelector('#btn-cancelar');

btnSalvar.addEventListener('click', () => {
const novoNome       = inputNome.value.trim();
const novaProfissão  = inputProfissao.value.trim();

if(novoNome === ''){
    alert('Tongão! o nome não pode estar vazio! Boca berta, tchó!');
    return;
}

nomeUsuario.textContent = novoNome;
profissaoUsuario.textContent = novaProfissão || 'Sem profissão';

formEdicao.style.display = 'none';
});

btnCancelar.addEventListener('click', () => {
    formEdicao.style.display = 'none';
});

/* trocar Foto de perfil */

const btnTrocaFoto = document.querySelector('#btn-trocar-foto');
const fotoOpcoes   = document.querySelector('#foto-opcoes');
const fotoPerfil   = document.querySelector('#foto-perfil');

btnTrocaFoto.addEventListener('click', () => {
if(fotoOpcoes.style.display === 'block') {
    fotoOpcoes.style.display = 'none';

}   else {
    fotoOpcoes.style.display = 'block';
    formEdicao.style.display = 'none';

}

});

const todasFotos = document.querySelectorAll('.foto-opcao');

todasFotos.forEach(opcao => {
    opcao.addEventListener('click', () => {
        // <img dat-seed="felix"> -> opcao.dataset.seed === "felix"
        
        
        const seed = opcao.dataset.seed;

        fotoPerfil.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`; 

        todasFotos.forEach(f => f.classList.remove('selecionada'));
        opcao.classList.add('selecionada');

        fotoOpcoes.style.display = 'none';

        console.log('Avatar trocado para:', seed);
    });
});