const listaJogos      = document.getElementById('lista-jogos');
const loading         = document.getElementById('loading');
const filtroPlatforma = document.getElementById('filtro-plataforma');

let todosOsJogos = [];

inicializar();

async function inicializar() {
    await carregarPlataformas();
    await carregarJogos();
}

async function carregarPlataformas() {
    try {
        const resposta    = await fetch('/api/plataformas');
        const plataformas = await resposta.json();

        plataformas.forEach(p => {
            const option       = document.createElement('option');
            option.value       = p.nome;
            option.textContent = p.nome;
            filtroPlatforma.appendChild(option);
        });
    } catch (erro) {
        console.error('Erro ao carregar plataformas:', erro);
    }
}

async function carregarJogos() {
    try {
        const resposta = await fetch('/api/jogos');
        if (!resposta.ok) throw new Error('Erro ao buscar jogos');

        todosOsJogos = await resposta.json();
        loading.style.display = 'none';
        renderizarJogos(todosOsJogos);

    } catch (erro) {
        loading.textContent = 'Erro ao carregar jogos.';
        console.error(erro);
    }
}

filtroPlatforma.addEventListener('change', () => {
    const selecionada = filtroPlatforma.value;
    const filtrados   = selecionada
        ? todosOsJogos.filter(j => j.plataforma === selecionada)
        : todosOsJogos;
    renderizarJogos(filtrados);
});

function renderizarJogos(jogos) {
    if (jogos.length === 0) {
        listaJogos.innerHTML = '<p class="vazio">Nenhum jogo encontrado.</p>';
        return;
    }

    listaJogos.innerHTML = '';

    jogos.forEach(jogo => {
        const card = document.createElement('div');
        card.classList.add('card-jogo');
        card.innerHTML = `
            <div class="card-header">
                <span class="badge">${jogo.categoria}</span>
                <span class="nota">⭐ ${jogo.nota || '—'}</span>
            </div>
            <h3>${jogo.titulo}</h3>
            <p class="plataforma">🎮 ${jogo.plataforma}</p>
            <p class="preco">R$ ${parseFloat(jogo.preco).toFixed(2)}</p>
            <p class="ano">${jogo.ano || '—'}</p>
            <button class="btn-remover" data-id="${jogo.id}" data-titulo="${jogo.titulo}">
                Remover
            </button>
        `;
        listaJogos.appendChild(card);
    });

    document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', removerJogo);
    });
}

async function removerJogo(evento) {
    const id     = evento.target.dataset.id;
    const titulo = evento.target.dataset.titulo;

    if (!confirm(`Remover "${titulo}"?`)) return;

    try {
        const resposta = await fetch(`/api/jogos/${id}`, { method: 'DELETE' });
        const dados    = await resposta.json();

        if (!resposta.ok) { alert(dados.erro); return; }

        alert(dados.mensagem);
        await carregarJogos();

    } catch (erro) {
        alert('Erro ao remover jogo.');
        console.error(erro);
    }
}