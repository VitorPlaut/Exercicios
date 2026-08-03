import pg from "pg";
import promptSync from "prompt-sync";

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "banco_teste"
});

async function removerAluno() {

    try {

        await client.connect();

        const listarAlunos = await client.query(
            "SELECT id, nome, nota FROM alunos"
        );

        console.log("===== LISTA DE ALUNOS =====");

        listarAlunos.rows.forEach(aluno => {
            console.log(
                `ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`
            );
        });

        const id = Number(prompt("\nDigite o ID do aluno que deseja remover: "));

        if (Number.isNaN(id) || id <= 0) {
            console.log("ID inválido.");
            return;
        }

        const aluno = await client.query(
            "SELECT * FROM alunos WHERE id = $1",
            [id]
        );

        if (aluno.rowCount === 0) {
            console.log("Aluno não encontrado.");
            return;
        }

        console.log("\n===== ALUNO ENCONTRADO =====");
        console.log(aluno.rows[0]);

        const resposta = prompt( `Deseja remover ${aluno.rows[0].nome}? (s/n): `);

        const resposta = prompt("Deseja remover o aluno? (s/n): ");

        if (resposta === "s" || resposta === "S") {
            console.log("Removendo...");
        } else {
            console.log("Operação cancelada.");
        }

        await client.query(
            "DELETE FROM alunos WHERE id = $1",
            [id]
        );

        console.log(`${aluno.rows[0].nome} removido com sucesso!`);

    } catch (erro) {

        console.log("Erro:", erro.message);

    } finally {

        await client.end();

    }
}

removerAluno();