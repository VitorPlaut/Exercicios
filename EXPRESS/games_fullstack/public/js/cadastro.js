const form             = document.getElementById('form-cadastro');
const mensagem         = document.getElementById('mensagem');
const selectPlataforma = document.getElementById('plataforma');
const selectCategoria  = document.getElementById('categoria');

inicializar();

async function inicializar() {
    await Promise.all([carregarPlataformas(), carregarCategorias()]);
}

async function carregarPlataformas() {
    try {
        const resposta    = await fetch('/api/plataformas');
        const plataformas = await resposta.json();

        selectPlataforma.innerHTML = '<option value="">Selecione...</option>';
        plataformas.forEach(p => {
            const option       = document.createElement('option');
            option.value       = p.id;
            option.textContent = `${p.nome} (${p.empresa})`;
            selectPlataforma.appendChild(option);
        });
    } catch (erro) {
        console.error('Erro ao carregar plataformas:', erro);
    }
}

async function carregarCategorias() {
    try {
        const resposta   = await fetch('/api/categorias');
        const categorias = await resposta.json();

        selectCategoria.innerHTML = '<option value="">Selecione...</option>';
        categorias.forEach(c => {
            const option       = document.createElement('option');
            option.value       = c.id;
            option.textContent = c.nome;
            selectCategoria.appendChild(option);
        });
    } catch (erro) {
        console.error('Erro ao carregar categorias:', erro);
    }
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const jogo = {
        titulo:        document.getElementById('titulo').value.trim(),
        preco:         document.getElementById('preco').value,
        nota:          document.getElementById('nota').value  || null,
        ano:           document.getElementById('ano').value   || null,
        plataforma_id: selectPlataforma.value,
        categoria_id:  selectCategoria.value
    };

    try {
        const resposta = await fetch('/api/jogos', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(jogo)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            exibirMensagem(dados.erro, 'erro');
            return;
        }

        exibirMensagem(`"${dados.titulo}" adicionado com sucesso!`, 'sucesso');
        form.reset();
        await inicializar();

    } catch (erro) {
        exibirMensagem('Erro ao cadastrar jogo.', 'erro');
        console.error(erro);
    }
});

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className   = tipo;
}