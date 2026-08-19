const pratos = document.getElementById("pratos");
const categoria = document.getElementById("categoria");

async function carregarCategorias() {
    const resposta = await fetch("/api/categorias");

    const categorias = await resposta.json();

    categorias.forEach(categoriaItem => {
        const option = document.createElement("option");

        option.value = categoriaItem.id;
        option.textContent = categoriaItem.nome;

        categoria.appendChild(option);
    });
}

async function carregarPratos() {

    let url = "/api/pratos";

    if (categoria.value) {
        url = `/api/pratos?categoria=${categoria.value}`;
    }

    const resposta = await fetch(url);

    const lista = await resposta.json();

    pratos.innerHTML = "";

    lista.forEach(prato => {

        const card = document.createElement("div");

        card.className = "card";

        let status;

        if (prato.disponivel) {
            status = `<p class="disponivel">Disponível</p>`;
        } else {
            status = `<p class="indisponivel">Indisponível</p>`;
        }

        card.innerHTML = `
            <h2>${prato.nome}</h2>

            <p>${prato.descricao}</p>

            <p>
                <strong>Categoria:</strong>
                ${prato.categoria}
            </p>

            <p>
                <strong>Preço:</strong>
                R$ ${Number(prato.preco).toFixed(2)}
            </p>

            ${status}

            <button onclick="removerPrato(${prato.id})">
                Remover
            </button>
        `;

        pratos.appendChild(card);
    });
}

async function removerPrato(id) {

    const confirmou = confirm("Deseja remover este prato?");

    if (!confirmou) {
        return;
    }

    const resposta = await fetch(`/api/pratos/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        alert("Prato removido!");

        carregarPratos();
    } else {
        alert("Erro ao remover prato.");
    }
}

categoria.addEventListener("change", carregarPratos);

carregarCategorias();
carregarPratos();