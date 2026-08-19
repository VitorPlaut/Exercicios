const formulario = document.getElementById("formulario");
const categoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");

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

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const categoria_id = categoria.value;

    const resposta = await fetch("/api/pratos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome: nome,
            descricao: descricao,
            preco: Number(preco),
            categoria_id: Number(categoria_id)
        })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {

        mensagem.textContent = "Prato cadastrado com sucesso!";

        formulario.reset();

    } else {

        mensagem.textContent = resultado.erro;
    }
});

carregarCategorias();