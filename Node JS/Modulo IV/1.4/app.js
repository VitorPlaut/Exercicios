import pg from "pg";
import promptSync from "prompt-sync";

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "banco_teste" // Troque para escola_db se o exercício pedir
});

async function lancarNota() {

    try {

        await client.connect();

        const listarAlunos = await client.query(
            "SELECT id, nome, nota FROM alunos"
        );

        console.log("\n=== LISTA DE ALUNOS ===");

        listarAlunos.rows.forEach(aluno => {
            console.log(
                `ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`
            );
        });

        const id = Number(prompt("\nDigite o ID do aluno: "));

        if (Number.isNaN(id) || id <= 0) {
            console.log("ID inválido.");
            return;
        }

        const nota = Number(prompt("Digite a nova nota: "));

        if (Number.isNaN(nota) || nota < 0 || nota > 10) {
            console.log("Nota inválida.");
            return;
        }

        const atualizarDados = await client.query(
            "UPDATE alunos SET nota = $1 WHERE id = $2 RETURNING *",
            [nota, id]
        );

        if (atualizarDados.rowCount === 0) {
            console.log("Aluno não encontrado.");
            return;
        }

        console.log("\n=== DADOS ATUALIZADOS ===");
        console.log(atualizarDados.rows[0]);

        if (nota >= 7) {
            console.log("Situação: Aprovado ✅");
        } else if (nota >= 5) {
            console.log("Situação: Recuperação ⚠️");
        } else {
            console.log("Situação: Reprovado ❌");
        }

    } catch (erro) {

        console.log("Erro:", erro.message);

    } finally {

        await client.end();

    }
}

lancarNota();